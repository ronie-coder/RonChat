import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'

const Home = () => {
  return (
    <div className="homeContainer">
    <div className="mainContainer">
        <Sidebar></Sidebar>
        <Chat></Chat>
    </div>
    </div>
  )
}

export default Home