import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

const Message = ({message}) => {

  const{currentUser} = useContext(AuthContext)
  const{data} = useContext(ChatContext)
  console.log(message.img)
  return (
    
    
    <div className={`message ${message.senderId === currentUser.uid && "owner"}`}>
        <div className='dpandtime'>
            <img className='profimg' src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
            <h5 style={{fontSize:"small"}}>Just Now</h5>
        </div>
        <div className="indmsg">
           {message.text && <p>{message.text}</p>}
            {message.img && <img className='msgimg' src={message.img} alt="" />}
        </div>
        
    
   
        </div>

    
    
  )
}

export default Message