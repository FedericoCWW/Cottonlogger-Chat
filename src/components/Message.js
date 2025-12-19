import React from 'react'
import "../features/Message.scss";
import Avatar from '@mui/material/Avatar';


function Message({message, user, timestamp}) {
  return (
    <div className='msg'>
        <Avatar src={user.photo}/>
        <div className="msg__info">
            <h4>{user.displayName}<span className='msg__timestamp'>{timestamp}</span></h4>
            <p>Este es un mensaje!!</p>
        </div>
    </div>
  )
}

export default Message