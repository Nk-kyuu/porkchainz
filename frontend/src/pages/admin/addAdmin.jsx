// AdminForm.js
import { useState } from 'react';
import axios from 'axios';

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
                alert('Admin added successfully!');
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

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="adminName" placeholder="Name" onChange={handleChange} />
            <input type="email" name="adminEmail" placeholder="Email" onChange={handleChange} />
            <input type="tel" name="adminPhone" placeholder="Phone" onChange={handleChange} />
            <input type="password" name="adminPassword" placeholder="Password" onChange={handleChange} />
            <button type="submit">Add Admin</button>
        </form>
    );
};

export default AdminForm;
