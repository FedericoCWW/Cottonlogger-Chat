import React from "react";
import "../features/ChatHeader.scss";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

function ChatHeader({ channelName }) {
  return (
    <div className="ChatHeader">
      <div className="chatHeader__left">
        <h3>
          <span className="chatHeader__hash">#</span>
          {channelName}
        </h3>
      </div>
      <div className="chatHeader__right">
        <NotificationsIcon />
        <EditLocationAltIcon />
        <PeopleAltIcon/>

        <div className="chatHeader__search">
            <input placeholder="Search" type="text" />
            <SearchIcon/>
        </div>
        <SendIcon/>
        <HelpOutlineIcon/>
      </div>
    </div>
  );
}

export default ChatHeader;
