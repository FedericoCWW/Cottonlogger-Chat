import "./App.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import Login from "./components/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { auth, provider } from "./firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { login, logout, selectUser } from "./features/userSlice";
function App() {
  const dispatch = useDispatch(); //This hook returns a reference to the dispatch function from the Redux store. You may use it to dispatch actions as needed
  const user = useSelector(selectUser);

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        //se logea el usuario
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        //se deslogea el usuario
        dispatch(logout());
      }
    });
  }, [dispatch]);
  return (
    <div className="app">
      {user ? (
        <>
          <Sidebar />
          <Chat />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
