import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react'
import { db, storage } from '../firebase';
import {v4 as uuid} from 'uuid'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Input = () => {
  const{currentUser} = useContext(AuthContext)
  const{data} = useContext(ChatContext)

  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const handleSend = async () => {
    if(img){
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        (error) => {
         
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db,"chats",data.chatId),{
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img : downloadURL,
              })
            })
          });
        }
      );

    }else{
      await updateDoc(doc(db,"chats",data.chatId),{
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        })
      })
    }
    await updateDoc(doc(db, "userChats", currentUser.uid),{
      [data.chatId+".lastMessage"]:{
        text
      },
      [data.chatId + ".date"]: serverTimestamp(),
    })
    await updateDoc(doc(db, "userChats", data.user.uid),{
      [data.chatId+".lastMessage"]:{
        text
      },
      [data.chatId + ".date"]: serverTimestamp(),
    })
    setText("");
    setImg(null)
    
  }
  
  return (
    <div className='input'>
        <input value={text} onChange={(e)=>setText(e.target.value)} placeholder='Type Here ...' type="text" />
        <div className="sendicons">
            <img  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Ic_attach_file_48px.svg/1200px-Ic_attach_file_48px.svg.png" alt="" />
            <input onChange={(e)=>setImg(e.target.files[0])} style={{display:'none'}} id='sendphoto' type="file" />
            <label htmlFor='sendphoto'><img src="https://icons.veryicon.com/png/o/miscellaneous/1em/add-image.png" alt="" /></label>
            <img src="https://www.svgrepo.com/download/15468/send.svg" onClick={handleSend} alt="" />
        </div>

    </div>
  )
}

export default Input