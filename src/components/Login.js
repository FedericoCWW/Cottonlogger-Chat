import React from "react";
import "../features/Login.scss";

function Login() {
  const signIn = (e) => {
    //google login...

  };

  return (
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

        <button type="submit">SIGN IN</button>

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
  );
}

export default Login;
