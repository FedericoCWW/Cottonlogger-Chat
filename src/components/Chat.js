import React, { useEffect, useState } from "react";
import "../features/Chat.scss";
import ChatHeader from "./ChatHeader.js";
import Message from "./Message.js";
import { Input } from "@base-ui-components/react/input";
import { Button } from "@base-ui-components/react/button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import GifBoxIcon from "@mui/icons-material/GifBox";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { useSelector } from "react-redux";
import { selectChannelID, selectChannelName } from "../features/appSlice.js";
import { selectUser } from "../features/userSlice.js";
import db from "../firebase.js";
import { Timestamp } from "firebase/firestore";
import firebase from "firebase/compat/app";

function Chat() {
  const fullState = useSelector((state) => state);
  console.log("Full Redux State:", fullState);

  const channelId = useSelector((state) => state.app?.channelId);
  const channelName = useSelector((state) => state.app?.channelName);
  const user = useSelector((state) => state.app?.user);
  const [input, setInput] = useState("");
  const [msgs, SetMsgs] = useState([]);

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("message")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          SetMsgs(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, []);

  const sendMsgs = (e) => {
    e.preventDefault();
    db.collection("channels").doc(channelId).collection("messages").add(
      {
        message: input,
        user: user,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      },
      [channelId]
    );
    setInput("");
  };
  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />
      <div className="chat__msgs">
        {msgs.map((msg) => (
          <Message 
          message={msg.message}
          user={msg.user}
          timestamp={msg.timestamp} />
        ))}
      </div>
      <div onSubmit={sendMsgs} className="chat__input">
        <AddCircleIcon fontSize="large" />
        <form action="">
          <Input
            slotProps={{ input: { className: "chat__inputComp" } }}
            aria-label="Demo input"
            placeholder="Tipea algo..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={!channelName}
          />
          <Button className="chat__submitBtn" disabled={!channelName}>
            Submit
          </Button>
        </form>
        <div className="chat__inputIcons">
          <GifBoxIcon fontSize="large" />
          <InsertEmoticonIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
}

export default Chat;
