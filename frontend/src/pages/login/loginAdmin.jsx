import axios from "axios"
import { useState } from "react";
import { GiPig } from "react-icons/gi";
import { Button } from "@mui/material";
import './login.css'

const loginAdmin = () => {
    const [adminEmail, setAdminEmail] = useState('');
    const [adminPassword, setAdminPassword] = useState('');

    const handleLogin = async () => {
        axios.post("http://localhost:5000/admin/login", {
            email: adminEmail,
            password: adminPassword,
        }).then((response) => {
            if (response.data.status === 'ok') {
                const { token } = response.data;
                console.log('Token:', token);
                localStorage.setItem('AdminToken', response.data.token)
                localStorage.setItem('adminEmail', adminEmail)
                window.location = "/admin/home"
                window.alert('Login successful!');
            } else {
                // Handle failed login (e.g., display error message)
                console.log('Login failed:', response.data.message);
                window.alert('Login failed. Please check your email and password.');
            }
        }).catch((error) => {
            console.error(error);
            window.alert('An error occurred. Please try again later.');
        });
    }

    return(
        <div className='bg-container'>
            <div className='login-container'>
                <div style={{marginBottom: "10px"}} className="logo">
                    <GiPig style={{ color: '#074cb3', fontSize: '12rem', paddingRight: '3px' }} />
                    <p> PorkChain</p>
                </div>
                <h3 style={{marginTop: "10px", marginBottom: "15px"}}>Admin Login</h3>
                <form style={{width: "100%", marginLeft: "120px"}}>
                    <div className='form-group'>
                        <input type="email" placeholder="Email" value={adminEmail} required onChange={(e) => setAdminEmail(e.target.value)} />
                    </div>
                    <div className='form-group'>
                        <input type="password" placeholder="Password" value={adminPassword} required onChange={(e) => setAdminPassword(e.target.value)} />
                    </div>
                    <Button sx={{marginLeft: "100px", marginTop: "10px"}} variant="contained" type='button' onClick={handleLogin}>Login</Button>
                </form>
                <Button sx={{marginTop: "20px"}} variant="text" type='button' href="/">for user</Button>
            </div>
        </div>
    );
}

export default loginAdmin