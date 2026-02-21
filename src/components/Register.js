import React, { useState } from "react";
import "../features/Login.scss";
import { auth, db } from "../firebase.js";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase.js";
import { Button } from "@base-ui-components/react/button";
import mainLogo from "../logo.png";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [preview, SetPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const img_handle = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return alert("Falta imagen de perfil");
    } else {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        SetPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = async () => {
    if (!email || !username || !password) {
      return alert("Por favor completá todos los campos");
    }
    setLoading(true);
    try {
      // 1. Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Subir avatar a Storage (si hay uno)
      let photoURL = "";
      if (avatarFile) {
        try {
          const storageRef = ref(storage, `avatars/${user.uid}`);
          await uploadBytes(storageRef, avatarFile);
          photoURL = await getDownloadURL(storageRef);
        } catch (storageError) {
          console.warn("No se pudo subir el avatar, continuando sin foto:", storageError.message);
        }
      }

      // 3. Actualizar displayName en Auth
      await updateProfile(user, { displayName: username, photoURL });

      // 4. Guardar usuario en colección "users" de Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email,
        displayName,
        photo,
        createdAt: new Date(),
      });

      navigate("/");
    } catch (error) {
      alert("Error al registrarse: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="login-container">
      <div className="login">
        <img src={mainLogo} alt="logo" />
        <div className="input-group">
          <label htmlFor="email">EMAIL</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="username">USUARIO</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="password">PASSWORD</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
                    fontSize: 21,
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

        <Button onClick={handleRegister} disabled={loading}>
          {loading ? "REGISTRANDO..." : "REGISTRARSE"}
        </Button>

        <div className="footer">
          ¿Tiene una cuenta? <Link to="/login">Loguéese </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;