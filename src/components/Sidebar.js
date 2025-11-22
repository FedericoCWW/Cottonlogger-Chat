import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../features/Sidebar.scss";
import AddIcon from '@mui/icons-material/Add';
import SidebarChannel from './SidebarChannel.js'

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
    </div>
  );
}

export default Sidebar;
