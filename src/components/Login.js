import React from "react";
import "../features/Login.scss";
import { auth, provider } from "../firebase.js";
import { signInWithPopup } from "firebase/auth";
import { Button } from "@base-ui-components/react/button";

function Login() {
  const signIn = (e) => {
    //google login...
    signInWithPopup(auth, provider).catch((error) => alert(error.message));
  };

  return (
    <div className="login-container">
      <div className="login">
        <h1>CottonLogger</h1>
        <div class="input-group">
          <label for="email">EMAIL</label>
          <input type="email" id="email" placeholder="your@email.com"></input>
        </div>

        <div class="input-group">
          <label for="password">PASSWORD</label>
          <input type="password" id="password" placeholder="••••••••"></input>
        </div>

        <Button onClick={signIn}>SIGN IN</Button>
        <div class="divider">OR</div>

        <div class="social-login">
          <div class="social-btn">G</div>
          <div class="social-btn">F</div>
          <div class="social-btn">X</div>
        </div>

        <div class="footer">
          Don't have an account? <a href="#">Sign up</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
