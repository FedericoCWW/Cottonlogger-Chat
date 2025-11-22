import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../features/Sidebar.scss'

function Sidebar() {
  return (
    <div className='sidebar'>
        <div className="sidebar__top">
            <h3>Titulo Top</h3>
            <ExpandMoreIcon/>
        </div>
    </div>

  )
}

export default Sidebar