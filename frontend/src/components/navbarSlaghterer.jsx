import { Link } from "react-router-dom";
import { GiPig } from "react-icons/gi";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from "@mui/material";
import axios from "axios";

function navbarSlaghterer() {
  const handleLogout = async () => {
    try {
        await axios.post('http://localhost:5000/logout');
        localStorage.removeItem('token');
        window.location.href = '/';
    } catch (error) {
        console.error('Logout error:', error);
    }
};
    return (
        <div className="navbar">
    
          <div className="logo">
            <GiPig style={{ color: '#074cb3', fontSize: '2rem', paddingRight: '3px' }} />
            <p> PorkChain</p>
          </div>
          <div className="item">
            <ul className="item-1">
              <li>
                <Link to="/slaughtererDash">Slaughterer</Link>
              </li>
            </ul>
            <ul className="item-2">
              <li>
               <Link to="/slaughtererProduct">view product</Link>  
              </li>
              <li>
              <Link to="/slaughtererAddShip">shipment information </Link>
              </li>
              <li>
              <Button onClick={handleLogout} sx={{padding:'0 10px' }} variant="outlined">Logout</Button>
              </li>
              <li>
              <Link to="/farmerDashPig"> <AccountCircleIcon  /></Link>
              </li>
            </ul>
          </div>
    
        </div>
    
  )
}

export default navbarSlaghterer