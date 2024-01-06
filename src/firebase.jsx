// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5Az57lwgPPzoR0NTzhOqUMxn3WO0RjUI",
  authDomain: "groupchatapp-daa38.firebaseapp.com",
  projectId: "groupchatapp-daa38",
  storageBucket: "groupchatapp-daa38.appspot.com",
  messagingSenderId: "509290053471",
  appId: "1:509290053471:web:751a9feb095a404e4ac0ea"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);