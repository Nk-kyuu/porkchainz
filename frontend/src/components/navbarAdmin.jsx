import "../components/navbarFarmer.css";
import { Link } from "react-router-dom";
import { GiPig } from "react-icons/gi";
import { Button } from "@mui/material";
import axios from "axios";

function navbarAdmin() {
    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/logout');
            localStorage.removeItem('AdminToken');
            window.location.href = '/admin';
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
                        <Link to="/admin/home">Admin</Link>
                    </li>
                </ul>
                <ul className="item-2">
                    <li>
                        <Link to="/admin/addadmin">Add admin</Link>
                    </li>
                    <li>
                        <Button onClick={handleLogout} sx={{ padding: '0 10px' }} variant="outlined">Logout</Button>
                    </li>
                </ul>
            </div>

        </div>

    )
}

export default navbarAdmin;