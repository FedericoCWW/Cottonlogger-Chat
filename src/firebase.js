import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAuzowirIn2V_1VWDLYxQ-zFQxYffhDs_k",
  authDomain: "discord-clone-fede.firebaseapp.com",
  projectId: "discord-clone-fede",
  storageBucket: "discord-clone-fede.firebasestorage.app",
  messagingSenderId: "164439115724",
  appId: "1:164439115724:web:7f2d5d33011e838e557f69"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;