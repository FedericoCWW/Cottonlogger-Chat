import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Login from './components/Login';
import {useDispatch, useSelector} from "react-redux";
import { useEffect } from 'react';
import {auth, provider} from './firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import {login, logout, selectUser} from './features/userSlice';
function App() {
  const dispatch = useDispatch(); //This hook returns a reference to the dispatch function from the Redux store. You may use it to dispatch actions as needed
  const user = useSelector(selectUser)

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      console.log("Usuario: ", authUser)
      if (authUser) {
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: auth.displayName
        }))
        //se logea el usuario
      }
      else{
        //se deslogea el usuario
      }
    })
  }, [])
  return (
    <div className="app">
      {user ? (
        <>
        <Sidebar/>
        <Chat/>
        </>
      ) : (      
        <Login/>
      )}
    </div>
  );
}

export default App;
