import React, { useContext } from "react";
import RonChat from "../pages/RonChat.jpg";
import {signOut} from 'firebase/auth'
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const Navbar = () => {
  const{currentUser} = useContext(AuthContext)
  const navigate = useNavigate();
  const handleLogOut =async () => {
    try {
      await signOut(auth);
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
    
  }
  return (
    <div className="navbar">
      <h4>RonChat</h4>
      <div className="navright">
      <h5>{currentUser.displayName}</h5>
      <img
        src={currentUser.photoURL}
        alt=""
      />
      <button onClick={handleLogOut}>LogOut</button>
      </div>
    </div>
  );
};

export default Navbar;
