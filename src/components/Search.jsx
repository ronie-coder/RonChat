import React, { useContext, useState } from 'react'
import { collection, query, where, getDocs, setDoc, serverTimestamp } from "firebase/firestore";
import {db} from '../firebase'
import {AuthContext} from '../context/AuthContext'
import { doc, getDoc, updateDoc } from "firebase/firestore";
const Search = () => {
  const[username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const[err, setErr] = useState(false);
  const {currentUser} = useContext(AuthContext)

  const handleSearch =async () => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("displayName", "==", username));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
        console.log(user)
      });
    } catch (error) {
      setErr(true);
    }
  }
  const handleKeyDown = (event) =>{
      
    if(event.key === "Enter"){

     
        handleSearch();
      
    }

  }

  
  const handleSelect = async () => {
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    try {
     
      
        const docRef = doc(db, "chats", combinedId);
      const docSnap = await getDoc(docRef); 
      if(!docSnap.exists()){
        await setDoc(doc(db, "chats", combinedId), {
          messages : []
        });
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId+".userInfo"] : {
            uid:user.uid,
            displayName:user.displayName,
            photoURL:user.photoURL
          },
          [combinedId+".date"] : serverTimestamp()
         
          });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId+".userInfo"] : {
            uid:currentUser.uid,
            displayName:currentUser.displayName,
            photoURL:currentUser.photoURL
          },
          [combinedId+".date"] : serverTimestamp()
         
          });
      }
     
        
      
      
    } catch (error) {
    setErr(true)
    console.log(error)
    }
    setUser(null)
    setUsername("")
  }

  
  return (
    
    <div  className='search'>
        <input onKeyDown={handleKeyDown} value={username} onChange={(e)=>{setUsername(e.target.value)}}  placeholder='Find a user...' type="text" />
        {err && <span>Invalid user</span>}
        {user &&  <div style={{borderBottom:"1px solid black", backgroundColor:"lightblue"}} onClick={handleSelect} className='chats'>
        <img src={user.photoURL} alt="" />
        <div className='chatsContent'><h4 style={{fontWeight:700}}>{user.displayName}</h4>
        
        </div>
    </div>}
       
    </div>
  )
}

export default Search