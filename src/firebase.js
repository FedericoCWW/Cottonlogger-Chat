import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuzowirIn2V_1VWDLYxQ-zFQxYffhDs_k",
  authDomain: "discord-clone-fede.firebaseapp.com",
  projectId: "discord-clone-fede",
  storageBucket: "discord-clone-fede.firebasestorage.app",
  messagingSenderId: "164439115724",
  appId: "1:164439115724:web:7f2d5d33011e838e557f69"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;