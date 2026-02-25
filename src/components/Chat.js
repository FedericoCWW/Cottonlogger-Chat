import React, { useEffect, useState } from "react";
import "../features/Chat.scss";
import ChatHeader from "./ChatHeader.js";
import Message from "./Message.js";
import { Input } from "@base-ui-components/react/input";
import { Button } from "@base-ui-components/react/button";
import EmojiSelector from "./EmojiSelector.js";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import GifBoxIcon from "@mui/icons-material/GifBox";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { useSelector } from "react-redux";
import { selectChannelID, selectChannelName } from "../features/appSlice.js";
import { selectUser } from "../features/userSlice.js";
import db from "../firebase.js";

import {
  query,
  orderBy,
  onSnapshot,
  collection,
  doc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

function Chat() {
  const fullState = useSelector((state) => state);

  const channelId = useSelector((state) => state.app?.channelId);
  const channelName = useSelector((state) => state.app?.channelName);
  const user = useSelector(selectUser);
  const [input, setInput] = useState("");
  const [msgs, SetMsgs] = useState([]);
  const [showEmojis, setShowEmojis] = useState(false);

  useEffect(() => {
    if (!channelId) {
      SetMsgs([]);
      return;
    }
    try {
      const messagesRef = collection(db, "channels", channelId, "messages");
      const q = query(messagesRef, orderBy("timestamp", "desc"));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const messages = snapshot.docs.map((doc) => ({
            id: doc.id, // Include document ID for React keys
            ...doc.data(),
          }));
          SetMsgs(messages);
        },
        (error) => {
          console.error("Error listening to messages:", error);
        },
      );
      return () => {
        unsubscribe();
      };
    } catch (error) {
      console.error("Error setting up messages listener:", error);
    }
  }, [channelId]);
  const sendMsgs = (e) => {
    e.preventDefault();
    try {
      const mesgRef = collection(db, "channels", channelId, "messages");
      addDoc(mesgRef, {
        message: input,
        user: user,
        timestamp: serverTimestamp(),
      });
      setInput("");
    } catch (err) {
      console.error("Error al mandar el mensaje:", err);
    }
  };
  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />
      <div className="chat__msgs">
        {msgs.map((msg) => (
          <Message
            message={msg.message}
            user={msg.user}
            timestamp={msg.timestamp}
          />
        ))}
      </div>
      <div className="chat__input">
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
          <button
            onClick={sendMsgs}
            className="chat__submitBtn"
            disabled={!channelName}
          >
            Submit
          </button>
        </form>
        <div className="chat__inputIcons">
          <div className="emoji__wrapper">
          <GifBoxIcon fontSize="large" />
            <InsertEmoticonIcon
              fontSize="large"
              onClick={() => setShowEmojis(!showEmojis)}
            />
            {showEmojis && (
              <EmojiSelector
                onSelect={(emoji) => setInput((prev) => prev + emoji)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
