import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../features/Sidebar.scss";
import AddIcon from '@mui/icons-material/Add';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import SidebarChannel from './SidebarChannel.js'
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import CallIcon from '@mui/icons-material/Call';
import Avatar from '@mui/material/Avatar';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import SettingsIcon from '@mui/icons-material/Settings';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h3>Titulo Top</h3>
        <ExpandMoreIcon />
      </div>
      <div className="sidebar__channels">
        <div className="sidebar__channels__header">
            <div className="sidebar__header">
                <ExpandMoreIcon />
                <h4>Canales</h4>
            </div>
            <AddIcon className="sidebar__addChannel"/>
        </div>
        <div className="sidebar__channels_list">
            <SidebarChannel/>
            <SidebarChannel/>
            <SidebarChannel/>
            <SidebarChannel/>
        </div>
      </div>
      <div className="sidebar__voice">
        <SignalCellularAltIcon 
        className="sidebar__voiceicon"
        fontSize="large"
        />
        <div className="sidebar__voiceInfo">
          <h3>Voz conectada</h3>
          <p>Stream</p>
        </div>
          <div className="sidebar__voiceIcons">
            <ul>
              <li>
                <InfoOutlineIcon/>
              </li>
              <li>
                <CallIcon/>
              </li>
            </ul>

          </div>
      </div>
      <div className="sidebar__profile">
          <Avatar/>
          <div className="sidebar__profile__info">
            <h3>Avatar Nombre</h3>
            <p>#Avatar_tag_ID</p>
          </div>
          <div className="sidebar__profile__icons">
            <ul>
              <li>
                <KeyboardVoiceIcon/>
              </li>
              <li>
                <HeadphonesIcon/>
              </li>
              <li>
                <SettingsIcon/>
              </li>
            </ul>
          </div>
      </div>
    </div>
  );
}

export default Sidebar;
