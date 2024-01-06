import React, { useState } from "react";
import RonChat from "./RonChat.jpg";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const displayName = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    const file = event.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        (error) => {
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              uid: res.user.uid,
              displayName: displayName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName: displayName,
              email: email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
          });
        }
      );

      navigate("/login");
    } catch (error) {
      setErr(true);
      console.log(error);
    }
  };

  return (
    <div className="login-page">
      <div className="form">
        <form onSubmit={handleSubmit} className="login-form">
          <img className="ronchat" src={RonChat} alt="" />
          <input type="text" placeholder="username" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <div className="avatardiv">
            <input style={{ display: "none" }} type="file" id="avatar" />
            <label htmlFor="avatar">
              <img
                className="avatarimg"
                src="https://icons.veryicon.com/png/o/miscellaneous/1em/add-image.png"
                alt=""
              />
            </label>
            <h5>Add an avatar</h5>
          </div>

          <button>SignUp</button>

          {err && <p>Something went wrong</p>}
          <p className="message">
            Already a member? <Link to={"/login"}>LogIn</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
