import React from "react";
import "../features/Login.scss";
import { auth, provider } from "../firebase.js";
import { signInWithPopup } from "firebase/auth";
import { Button } from "@base-ui-components/react/button";
import mainLogo from'../logo.png';

function Login() {
  const signIn = (e) => {
    //google login...
    signInWithPopup(auth, provider).catch((error) => alert(error.message));
  };

  return (
    <div className="login-container">
      <div className="login">
        <img  src={mainLogo} alt="logo"/>
        <div class="input-group">
          <label for="email">EMAIL</label>
          <input type="email" id="email"></input>
        </div>
        <div class="input-group">
          <label for="password">PASSWORD</label>
          <input type="password" id="password"></input>
        </div>

        <Button onClick={signIn}>LOGUEARSE</Button>
        <div class="divider">O BIEN</div>

        <div class="social-login">
          <div class="social-btn">G</div>
          <div class="social-btn">F</div>
          <div class="social-btn">X</div>
        </div>

        <div class="footer">
          ¿No tenes una cuenta? <a href="#">Registrarse</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
