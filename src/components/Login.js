import React from "react";
import "../features/Login.scss";
import { auth, provider } from "../firebase.js";
import {
  signInWithPopup,
  FacebookAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";
import { Button } from "@base-ui-components/react/button";
import mainLogo from "../logo.png";
import { Link } from 'react-router-dom';

function Login() {
  const signInGoogle = (e) => {
    //google login...
    signInWithPopup(auth, provider).catch((error) => alert(error.message));
  };

  const facebookProvider = new FacebookAuthProvider();
  facebookProvider.addScope("public_profile");

  const signInFacebook = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        console.log("Usuario de Facebook:", result.user);
      })
      .catch((error) => {
        console.error("Error Facebook completo:", error);

        if (error.code === "auth/account-exists-with-different-credential") {
          alert(
            "Ya existe una cuenta con este email usando otro método de inicio."
          );
        } else if (error.code === "auth/popup-blocked") {
          alert("Por favor, permite ventanas emergentes para este sitio.");
        } else if (error.code === "auth/popup-closed-by-user") {
        } else {
          alert(`Error Facebook: ${error.message}`);
        }
      });
  };

  const twitterProvider = new TwitterAuthProvider();
  const signInTwitter = () => {
    signInWithPopup(auth, twitterProvider)
      .then((result) => {
        const credential = TwitterAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const secret = credential.secret;
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <div className="login-container">
      <div className="login">
        <img src={mainLogo} alt="logo" />
        <div class="input-group">
          <label for="username">CORREO ELECTORNICO</label>
          <input type="username" id="username"></input>
        </div>
        <div class="input-group">
          <label for="password">CONTRASEÑA</label>
          <input type="password" id="password"></input>
        </div>

        <Button>LOGUEARSE</Button>
        <div class="divider">O BIEN</div>

        <div class="social-login">
          <div onClick={signInGoogle} class="social-btn" translate="no">G</div>
          <div onClick={signInFacebook} class="social-btn" translate="no">F</div>
          <div onClick={signInTwitter} class="social-btn" translate="no">X</div>
        </div>

        <div class="footer">
          ¿No tenes una cuenta? <Link to="/register">Registrarse</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
