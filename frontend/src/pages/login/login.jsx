import './login.css';
import { useState } from 'react';
import axios from 'axios';
import { GiPig } from "react-icons/gi";
import { Button } from '@mui/material';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('farmer'); // Default role

    const handleLogin = async () => {
        axios.post("http://localhost:5000/login", {
            email: email,
            password: password,
            role: role,
        }).then((response) => {
            if (response.data.status === 'ok') {
                const { token, userID } = response.data;
                console.log('Token:', token);
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('email', email)
                localStorage.setItem('userID', userID)
                window.alert('Login successful!');
                connectMetamask();
                redirectToHomePage();
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

    const connectMetamask = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    const response = await axios.post('http://localhost:5000/login/metamask', { address: accounts[0] });
                    if (response.data.status === 'ok' && response.data.token) {
                        const { token } = response.data;
                        localStorage.setItem('MetamaskToken', token);
                        console.log('Metamask Token:', token);
                        redirectToHomePage(); // Move redirectToHomePage here
                    } else {
                        console.log('Invalid response:', response.data);
                        // Handle invalid response
                    }
                } else {
                    console.log('No Metamask accounts found.');
                    // Handle case where no Metamask account is available
                }
            } catch (error) {
                console.error('Error connecting to Metamask:', error);
                // Handle error connecting to Metamask
            }
        } else {
            alert('Metamask extension not detected');
            // Handle case where Metamask extension is not detected
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

    return (
        <div className='bg-container'>
            <div className='login-container'>
                <div className="logo">
                    <GiPig style={{ color: '#074cb3', fontSize: '12rem', paddingRight: '3px' }} />
                    <p> PorkChain</p>
                </div>
                <h3>User Login</h3>
                <form className='login-form'>
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
                    <Button sx={{marginLeft: "100px"}} variant='contained' type='button' onClick={handleLogin}>Login</Button>
                    
                </form>
                <Button sx={{marginTop: "15px"}} variant='text' type='button' href='/admin'>For admin</Button>
            </div>
        </div>
    );
};

export default Login;
