import React, { useState } from 'react'
import RonChat from './RonChat.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
const Login = () => {
  const navigate = useNavigate()
  const [err, setErr] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target[0].value
    const password = event.target[1].value
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/")
    } catch (error) {
      setErr(true);
    }
  
  }
  return (
    <div className="login-page">
  <div className="form">
    
    <form onSubmit={handleSubmit} className="login-form">
    <img className='ronchat' src={RonChat} alt="" />
      <input type="text" placeholder="username"/>
      <input type="password" placeholder="password"/>
      <button>login</button>
      {err && <p style={{color:"red"}}>Invalid details</p>}
      <p className="message">Not registered? <Link to={"/register"}>Register</Link></p>
    </form>
  </div>
</div>
  )
}

export default Login