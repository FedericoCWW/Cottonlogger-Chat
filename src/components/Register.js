import React, { useState } from "react";
import "../features/Login.scss";
import { auth, provider } from "../firebase.js";
import { Button } from "@base-ui-components/react/button";
import mainLogo from "../logo.png";
import { Link } from "react-router-dom";

function Register() {
  const [preview, SetPreview] = useState(null);

  const img_handle = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return alert("Falta imagen de perfil");
    } else {
      const reader = new FileReader();
      reader.onloadend = () => {
        SetPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="login-container">
      <div className="login">
        <img src={mainLogo} alt="logo" />
        <div class="input-group">
          <label for="email">EMAIL</label>
          <input type="email" id="email"></input>
        </div>
        <div class="input-group">
          <label for="username">USUARIO</label>
          <input type="username" id="username"></input>
        </div>
        <div class="input-group">
          <label for="password">PASSWORD</label>
          <input type="password" id="password"></input>
        </div>
        <div className="input-group">
          <label htmlFor="avatar">FOTO DE PERFIL</label>
          <div
            className="avatar-upload"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <label htmlFor="avatar" className="avatar-preview">
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  style={{
                    width: 64,
                    height: 64,
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                <div className="register_avatar">+ Foto</div>
              )}
            </label>
            <input
              type="file"
              id="avatar"
              accept="image/*"
              onChange={img_handle}
              style={{ display: "none" }}
            />
          </div>
        </div>

        <Button>REGISTRARSE</Button>

        <div class="footer">
          ¿Tiene una cuenta? <Link to="/login">Loguéese </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
