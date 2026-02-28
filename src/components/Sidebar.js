import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import "../features/Sidebar.scss";
import AddIcon from "@mui/icons-material/Add";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import SidebarChannel from "./SidebarChannel.js";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import CallIcon from "@mui/icons-material/Call";
import Avatar from "@mui/material/Avatar";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import SettingsIcon from "@mui/icons-material/Settings";
import { useSelector } from "react-redux";
import { selectUser, userSlice } from "../features/userSlice.js";
import db, { auth } from "../firebase.js";
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";

function Sidebar() {
  const user = useSelector(selectUser);
  const [channels, SetChannels] = useState([]);
  const [expanded, SetExpanded] = useState(true);

  useEffect(() => {
    const channelsCollection = collection(db, "channels");

    const unsubscribe = onSnapshot(channelsCollection, (snapshot) => {
      const channelsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        channel: doc.data(),
      }));
      SetChannels(channelsData);
    });

    return () => unsubscribe();
  }, []);

  const HandleAddChannel = () => {
    const channelName = prompt("Enter channel name");

    if (channelName) {
      try {
        addDoc(collection(db, "channels"), {
          channelName: channelName,
          timestamp: serverTimestamp(),
        });
      } catch (error) {
        console.error("Error adding channel: ", error);
        alert("Error creating channel");
      }
    }
  };

  const getActualPhotoUrl = (photoUrl) => {
    if (!photoUrl) return null;
    if (photoUrl.includes("graph.facebook.com")) {
      const match = photoUrl.match(/facebook\.com\/(\d+)\/picture/);
      if (match && match[1]) {
        const facebookId = match[1];
        return `https://graph.facebook.com/${facebookId}/picture?type=large&width=200&height=200`;
      }
    }
    return photoUrl;
  };

  return (
    <div className={`sidebar ${expanded ? "sidebar--expanded" : "sidebar--collapsed"}`}>
      <div className="sidebar__top">
        {expanded && <h3>Inicio</h3>}
        <a 
          onClick={() => SetExpanded((curr) => !curr)} 
          className='sidebar__icons'>
          {expanded ? <ArrowForwardIcon/> : <ArrowBackIcon/>}
        </a>
      </div>
      {expanded && (
        <>
        <div className="sidebar__channels">
          <div className="sidebar__channels__header">
            <div className="sidebar__header">
              <h4>Canales</h4>
            </div>
            <a>
            {/* añadir canales */}
            <AddIcon onClick={HandleAddChannel} className="sidebar__icons" />
            </a>
          </div>
          <div className="sidebar__channels_list">
            {channels.map(({ id, channel }) => {
              return <SidebarChannel id={id} channelName={channel.channelName} />;
            })}
          </div>
        </div>
        <div className="sidebar__voice">
          <SignalCellularAltIcon
            className="sidebar__voiceicon"
            fontSize="large"
          />
          <div className="sidebar__voiceInfo">
            <h3>Voz conectada</h3>
            <p>Stream</p>
          </div>
          <div className="sidebar__voiceIcons">
            <ul>
              <li>
                <InfoOutlineIcon />
              </li>
              <li>
                <CallIcon />
              </li>
            </ul>
          </div>
        </div>
        </>
      )}
      <div className="sidebar__profile">
        <Avatar
          src={getActualPhotoUrl(user.photo)}
        />
        {expanded && (
        <div className="sidebar__profile__info">
          <h3>{user.displayName}</h3>
          <p>{"#" + user.uid.substring(0, 8).toUpperCase()}</p>
        </div>
        )}
        <div className="sidebar__profile__icons">
            {expanded && (
          <ul>
            <li>
              <KeyboardVoiceIcon />
            </li>
            <li>
              <HeadphonesIcon />
            </li>
            <li>
              <p onClick={() => auth.signOut()}
                  style={{cursor: "pointer", fontSize: "16px"}}
                >Desloguearse
              </p>
            </li>
          </ul>
            )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
