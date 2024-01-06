import React, { useContext, useEffect, useState } from 'react'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Chats = () => {
  const{currentUser} = useContext(AuthContext)
  const{dispatch} = useContext(ChatContext)
  const [chats, setChats] = useState([]);
  useEffect(()=>{
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data())
        
    });
    return () =>{
      unsub();
    }
    }
    currentUser.uid && getChats();
  },[currentUser.uid])
  const handleSelect = (u) => {
    dispatch({type:"CHANGE_USER", payload:u})
  }
  return (
    <div className="search">
      {Object.entries(chats)?.sort((a,b)=>b[1].date-a[1].date).map((chat)=>(
        <div key={chat[0]} className='chats' onClick={()=>handleSelect(chat[1].userInfo)}>
        <img src={chat[1].userInfo.photoURL} alt="" />
        <div className='chatsContent'><h4 style={{fontWeight:700}}>{chat[1].userInfo.displayName}</h4>
        <h5>{chat[1].lastMessage?.text}</h5>
        </div>
    </div>
      ))}
    
    </div>
    
  )
}

export default Chats