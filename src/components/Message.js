import React from 'react'
import "../features/Message.scss";
import Avatar from '@mui/material/Avatar';


function Message({message, user, timestamp}) {
  let timestamp_Conv = timestamp ? timestamp.toDate().toUTCString() : '';
  return (
    <div className='msg'>
        <Avatar src={user.photo}/>
        <div className="msg__info">
            <h4>{user.displayName}<span className='msg__timestamp'>{timestamp_Conv.slice(4,-3)}</span></h4>
            <p>{message}</p>
            {console.log(timestamp_Conv)}
        </div>
    </div>
  )
}

export default Message