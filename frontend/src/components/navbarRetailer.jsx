import "../components/navbarFarmer.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";
import { GiPig } from "react-icons/gi";
import { Button } from "@mui/material";

function navbarRetailer() {
    return (
        <div className="navbar">
    
          <div className="logo">
            <GiPig style={{ color: '#074cb3', fontSize: '2rem', paddingRight: '3px' }} />
            <p> PorkChain</p>
          </div>
          <div className="item">
            <ul className="item-1">
              <li>
                <Link to="/retailerDash">Retailer</Link>
              </li>
            </ul>
            <ul className="item-2">
              <li>
              <Button href="/logout" sx={{padding:'0 10px' }} variant="outlined">Logout</Button>
              </li>
              <li>
              <Link to="/farmerDashPig"> <AccountCircleIcon  /></Link>
              </li>
            </ul>
          </div>
    
        </div>
    
      )
}

export default navbarRetailer