import React from 'react'
import "../features/Message.scss";
import Avatar from '@mui/material/Avatar';


function Message() {
  return (
    <div className='msg'>
        <Avatar/>
        <div className="msg__info">
            <h4>USer<span className='msg__timestamp'>Timestamp</span></h4>
            <p>Este es un mensaje!!</p>
        </div>
    </div>
  )
}

export default Message