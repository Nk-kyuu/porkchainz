import './login.css';
import { useState } from 'react';
import axios from 'axios';

// import logo from "../../assets/porkchainLogo.png"

import { GiPig } from "react-icons/gi";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('farmer'); // Default role

    const handleLogin = async () => {
        axios.post("http://localhost:5000/login", {
            email: email,
            password: password,
            role: role
        }).then((response) => {
            if (response.data.status === 'ok') {
                const { token } = response.data;
                console.log('Token:', token);
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('email', email)
                connectMetamask();
            } else {
                // Handle failed login (e.g., display error message)
                console.log('Login failed:', response.data.message);
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    const connectMetamask = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                // Get the current Metamask account address
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                // Make request to backend with the address
                const response = await axios.post('http://localhost:5000/login/metamask', { address: accounts[0] });
                if (response.data.status === 'ok') {
                    const { token } = response.data;
                    console.log('Metamask Token:', token);
                    redirectToHomePage();
                } else {
                    // Handle failed Metamask connection (e.g., display error message)
                    console.log('Metamask connection failed:', response.data.message);
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            alert('Metamask extension not detected');
        }
    };


    const redirectToHomePage = () => {
        switch (role) {
            case 'farmer':
                window.location.href = '/farmerDashPig';
                break;
            case 'slaughterer':
                window.location.href = '/slaughtererDash';
                break;
            case 'retailer':
                window.location.href = '/retailerDash';
                break;
            default:
                break;
        }
    };

    // const handleLogout = async () => {
    //     try {
    //         await axios.post('http://localhost:5000/logout');
    //         localStorage.removeItem('token');
    //         window.location.href = '/';
    //     } catch (error) {
    //         console.error('Logout error:', error);
    //     }
    // };

    return (
        <div className='container'>
            <div className='login-container'>
                <div className="logo">
                    <GiPig style={{ color: '#074cb3', fontSize: '12rem', paddingRight: '3px' }} />
                    <p> PorkChain</p>
                </div>
                <form onSubmit={handleLogin}>
                    <div className='form-group'>
                        <input type="email" placeholder="Email" value={email} required onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='form-group'>
                        <input type="password" placeholder="Password" value={password} required onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='form-group'>
                        <select value={role} required onChange={(e) => setRole(e.target.value)}>
                            <option value="farmer">Farmer</option>
                            <option value="slaughterer">Slaughterer</option>
                            <option value="retailer">Retailer</option>
                        </select>
                    </div>
                    <button type='submit'>Login</button>
                    {/* <button onClick={handleLogout}>Logout</button> */}
                </form>

            </div>
        </div>
    );
};

export default Login;