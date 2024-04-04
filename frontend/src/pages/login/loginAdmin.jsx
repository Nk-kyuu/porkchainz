import axios from "axios"
import { useState } from "react";
import { GiPig } from "react-icons/gi";

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
            } else {
                // Handle failed login (e.g., display error message)
                console.log('Login failed:', response.data.message);
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    return(
        <div className='bg-container'>
            <div className='login-container'>
                <div className="logo">
                    <GiPig style={{ color: '#074cb3', fontSize: '12rem', paddingRight: '3px' }} />
                    <p> PorkChain</p>
                </div>
                <form>
                    <div className='form-group'>
                        <input type="email" placeholder="Email" value={adminEmail} required onChange={(e) => setAdminEmail(e.target.value)} />
                    </div>
                    <div className='form-group'>
                        <input type="password" placeholder="Password" value={adminPassword} required onChange={(e) => setAdminPassword(e.target.value)} />
                    </div>
                    <button type='button' onClick={handleLogin}>Login</button>
                </form>
            </div>
        </div>
    );
}

export default loginAdmin