import "./App.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Register from "./components/Register"; // Asegúrate de que la ruta sea correcta
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { auth } from "./firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { login, logout, selectUser } from "./features/userSlice";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Ruta pública - Login */}
          <Route 
            path="/login" 
            element={user ? <Navigate to="/" /> : <Login />} 
          />
          
          {/* Ruta pública - Registro */}
          <Route 
            path="/register" 
            element={user ? <Navigate to="/" /> : <Register />} 
          />
          
          {/* Ruta protegida - App principal */}
          <Route 
            path="/*" 
            element={
              user ? (
                <>
                  <Sidebar />
                  <Chat />
                </>
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          
          {/* Redirección por defecto */}
          <Route 
            path="/" 
            element={
              user ? (
                <>
                  <Sidebar />
                  <Chat />
                </>
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;