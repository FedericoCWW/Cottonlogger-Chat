import React from "react";
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

function Chat() {
  const fullState = useSelector((state) => state);
  console.log("Full Redux State:", fullState);

  const channelId = useSelector(selectChannelID);
  const channelName = useSelector(selectChannelName);
  const user = useSelector(selectUser);

  console.log("Channel ID:", channelId);
  console.log("Channel Name:", channelName);
  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />
      <div className="chat__msgs">
        <Message />
        <Message />
        <Message />
      </div>
      <div className="chat__input">
        <AddCircleIcon fontSize="large" />
        <form action="">
          <Input
            slotProps={{ input: { className: "chat__inputComp" } }}
            aria-label="Demo input"
            placeholder="Tipea algo..."
          />
          <Button className="chat__submitBtn">Submit</Button>
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
