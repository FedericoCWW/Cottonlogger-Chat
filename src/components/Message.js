import React from "react";
import "../features/Message.scss";
import Avatar from "@mui/material/Avatar";

function Message({ message, isGif, user, timestamp }) {
  let timestamp_Conv = timestamp ? timestamp.toDate().toUTCString() : "";

  const isGifMessage = isGif || message?.includes("giphy.com");

  return (
    <div className="msg">
      <Avatar src={user.photo} />
      <div className="msg__info">
        <h4>
          {user.displayName}
          <span className="msg__timestamp">{timestamp_Conv.slice(4, -3)}</span>
        </h4>
        {isGifMessage ? (
          <img
            src={message}
            alt="gif"
            style={{ maxWidth: "250px", borderRadius: "8px", marginTop: "4px" }}
          />
        ) : (
          <p>{message}</p>
        )}
      </div>
    </div>
  );
}

export default Message;
