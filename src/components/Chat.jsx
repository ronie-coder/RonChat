import React, { useContext } from 'react'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../context/ChatContext'

const Chat = () => {
  const{data} = useContext(ChatContext)
  return (
    <div className='chat'>
        <div className='infobar'>
            <h3>{data.user?.displayName}</h3>
            <div className='topicons'>
                <img src="https://static.thenounproject.com/png/5094085-200.png" alt="" />
                <img src="https://www.svgrepo.com/show/111201/phone-call.svg" alt="" />
                <img src="https://cdn.iconscout.com/icon/free/png-256/free-menu-199-458540.png" alt="" />
            </div>
        </div>
        <Messages></Messages>
        <Input></Input>
    </div>
  )
}

export default Chat