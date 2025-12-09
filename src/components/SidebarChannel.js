import React from 'react'
import '../features/SidebarChannel.scss'
import {setChannelInfo} from '../features/appSlice.js'
import db from "../firebase.js";
import { useDispatch } from 'react-redux';


function SidebarChannel({id, channelName}) {
  const dispatch = useDispatch();


  return (
    <div className='sidebarChannel' onClick={ () => dispatch(setChannelInfo({
      channelId: id,
      channelName: channelName,
    }))}>
        <h4><span className='sidebarChannel__hash'>#</span>{channelName}</h4>
    </div>
  )
}

export default SidebarChannel