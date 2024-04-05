import { useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbarAdmin';
import { Button } from '@mui/material';

const AdminForm = () => {
    const [adminData, setAdminData] = useState({
        adminName: '',
        adminEmail: '',
        adminPhone: '',
        adminPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdminData({ ...adminData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/admin/register', adminData);
            if (response.data.status === 'ok') {
                alert('Admin registered successfully!');
                window.location = '/admin/home'
            } else {
                // Handle failed login (e.g., display error message)
                console.log('Registration failed:', response.data.message);
            }


        } catch (error) {
            console.error('Error adding admin:', error);
            alert('Failed to add admin. Please try again.');
        }
    };

    const inputStyle = {
        width: "200%", 
        padding: "10px", 
        margin: "8px 0", 
        borderRadius: "8px", 
        border: "1px solid #ccc"
    }

    return (
        <div className='container'>
            <div className='Navbar'>
                <Navbar />
            </div>
            <div className='content' style={{ backgroundColor: "white", paddingBottom: "6vh", width: "60%", marginLeft: "20%", borderRadius: "15px" }}>
                <h3 style={{marginTop: "30px"}}>Add Admin</h3>
                <div className='form-group' style={{ marginTop: "10px", marginRight: "20%"}}>
                    <form onSubmit={handleSubmit}>
                        <div style={{marginBottom: "8px"}}>
                            <label htmlFor='adminName'>Name:</label><br/>
                            <input style={inputStyle} type="text" name="adminName" placeholder="Name" onChange={handleChange} />
                        </div>
                        <div style={{marginBottom: "8px"}}>
                            <label htmlFor='adminEmail'>Email:</label><br/>
                            <input style={inputStyle} type="email" name="adminEmail" placeholder="Email" onChange={handleChange} />
                        </div>
                        <div style={{marginBottom: "8px"}}>
                            <label htmlFor='adminPhone'>Phone no:</label><br/>
                            <input style={inputStyle} type="tel" name="adminPhone" placeholder="Phone" onChange={handleChange} />
                        </div>
                        <div style={{marginBottom: "8px"}}>
                            <label htmlFor='adminPassword'>Password:</label><br/>
                            <input style={inputStyle} type="password" name="adminPassword" placeholder="Password" onChange={handleChange} />
                        </div>
                        <div style={{marginLeft: "40%"}}>
                            <Button sx={{marginTop: "20px"}} type="submit">Add</Button>
                        </div>
                        
                    </form>
                </div>

            </div>
        </div>

    );
};

export default AdminForm;
