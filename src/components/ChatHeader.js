import React, { useState, useRef } from "react";
import "../features/ChatHeader.scss";
import SettingsIcon from '@mui/icons-material/Settings';
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from "@mui/material/Avatar";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser } from "../features/userSlice.js";
import { auth, storage } from "../firebase.js";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import db from "../firebase.js";

function ChatHeader({ channelName }) {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState(user?.displayName || "");
  const [avatarFile, setAvatarFile] = useState(null);
  const [preview, setPreview] = useState(user?.photo || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");
    try {
      let photoURL = user.photo;
      if (avatarFile) {
        try {
          const storageRef = ref(storage, `avatars/${auth.currentUser.uid}`);
          await uploadBytes(storageRef, avatarFile);
          photoURL = await getDownloadURL(storageRef);
        } catch (err) {
          console.error("Storage error, using preview:", err);
          photoURL = preview;
        }
      }
      await updateProfile(auth.currentUser, {
        displayName: newName,
        photoURL: photoURL,
      });
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, {
        displayName: newName,
        photo: photoURL,
      });
      dispatch(setUser({
        ...user,
        displayName: newName,
        photo: photoURL,
      }));

      setShowModal(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Error al actualizar el perfil.");
    }
    setLoading(false);
  };

  return (
    <div className="ChatHeader">
      <div className="chatHeader__left">
        <h3>
          <span className="chatHeader__hash">#</span>
          {channelName}
        </h3>
      </div>
      <div className="chatHeader__right">
        <SettingsIcon onClick={() => setShowModal(true)} style={{ cursor: "pointer" }} />
        <EditLocationAltIcon />
        <PeopleAltIcon />
        <SearchIcon />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal__overlay" onClick={() => setShowModal(false)}>
          <div className="modal__content" onClick={(e) => e.stopPropagation()}>

            <div className="modal__header">
              <h3>Editar Perfil</h3>
              <CloseIcon onClick={() => setShowModal(false)} style={{ cursor: "pointer" }} />
            </div>

            <div className="modal__avatar">
              <Avatar src={preview} sx={{ width: 80, height: 80 }} />
              <button onClick={() => fileRef.current.click()} className="modal__avatarBtn">
                Cambiar foto
              </button>
              <input
                type="file"
                accept="image/"
                ref={fileRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>

            <div className="modal__field">
              <label>Nombre de usuario</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Nuevo nombre..."
              />
            </div>

            {error && <p className="modal__error">{error}</p>}

            <div className="modal__actions">
              <button onClick={() => setShowModal(false)} className="modal__cancelBtn">
                Cancelar
              </button>
              <button onClick={handleSave} className="modal__saveBtn" disabled={loading}>
                {loading ? "Guardando..." : "Guardar"}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default ChatHeader;