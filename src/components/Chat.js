import React from "react";
import "../features/Chat.scss";
import ChatHeader from "./ChatHeader.js";
import { Input } from "@base-ui-components/react/input";
import { Button } from '@base-ui-components/react/button';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function Chat() {
  return (
    <div className="chat">
      <ChatHeader />
      <div className="chat__msgs"></div>
      <div className="chat__input">
        <form action="">
            <AddCircleIcon/>
            <Input
                slotProps={{ input: { className: "CustomInputIntroduction" } }}
                aria-label="Demo input"
                placeholder="Type something…"
            />
            <Button className="chat__submitBtn">Submit</Button>
        </form>
        <div className="chat__inputIcons">
            
        </div>
      </div>
    </div>
  );
}

export default Chat;
