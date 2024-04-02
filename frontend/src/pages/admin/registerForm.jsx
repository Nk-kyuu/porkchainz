import { useState } from 'react';
import axios from 'axios';
//require('dotenv').config()
//const API_URL = process.env.REACT_APP_API_URL

const RegisterForm = () => {
    const [adminEmail, setAdminEmail] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [user, setUser] = useState({
        email: '',
        password: '',
        role: '',
        userInfo: {
            farmerFirstName: '',
            farmerLastName: '',
            farmName: '',
            farmLocation: '',
            farmerPhone: '',
            slaughtererFirstName: '',
            slaughtererLastName: '',
            slaughterName: '',
            slaughterLocation: '',
            slaughtererPhone: '',
            retailerFirstName: '',
            retailerLastName: '',
            retailName: '',
            retailLocation: '',
            retailerPhone: ''
        }
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser({
            ...user,
            [name]: value
        });
    };
    

    const handleRoleSelect = (event) => {
        const role = event.target.value;
        setSelectedRole(role);
        setUser({
            ...user,
            role: role,
            userInfo: {} // Reset user info when role changes
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            //const response = await axios.post(`JSON.stringify(import.meta.env.VITE_APP_API_URL)/register`
            const response = await axios.post('http://localhost:5000/register'
            , {
                adminEmail,
                userData: [user]
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Register User</h2>
            <form onSubmit={handleSubmit}>
            <div>
                    <label htmlFor="adminEmail">Email:</label>
                    <input type="email" id="adminEmail" name="adminEmail" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} required />

                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={user.email} onChange={handleInputChange} required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={user.password} onChange={handleInputChange} required />
                </div>
                <div>
                    <label htmlFor="role">Select Role:</label>
                    <select id="role" name="role" value={selectedRole} onChange={handleRoleSelect} required>
                        <option value="">Select Role</option>
                        <option value="farmer">Farmer</option>
                        <option value="slaughterer">Slaughterer</option>
                        <option value="retailer">Retailer</option>
                    </select>
                </div>
                {selectedRole && (
                    <div>
                        <h3>User Info</h3>

                        {/* Render additional fields based on selected role */}
                        {selectedRole === 'farmer' && (
                            <div>
                                <div>
                                <label htmlFor="farmerFirstName">First Name: </label>
                                    <input type="text" id="farmerFirstName" name="userInfo.farmerFirstName" value={user.userInfo.farmerFirstName} onChange={handleInputChange} required />
                                </div>
                                <div>
                                    <label htmlFor="farmerLastName">Last Name: </label>
                                    <input type="text" id="farmerLastName" name="userInfo.farmerLastName" value={user.userInfo.farmerLastName} onChange={handleInputChange} required />
                                </div>
                                <div>
                                    <label htmlFor="farmName">Company Name: </label>
                                    <input type="text" id="farmName" name="userInfo.farmName" value={user.userInfo.farmName} onChange={handleInputChange} required />
                                </div>
                                <div>
                                    <label htmlFor="farmLocation">Location: </label>
                                    <input type="text" id="farmLocation" name="userInfo.farmLocation" value={user.userInfo.farmLocation} onChange={handleInputChange} required />
                                </div>
                                <div>
                                    <label htmlFor="farmerPhone">Phone No: </label>
                                    <input type="text" id="farmerPhone" name="userInfo.farmerPhone" value={user.userInfo.farmerPhone} onChange={handleInputChange} required />
                                </div>
                            </div>
                        )}
                        {selectedRole === 'slaughterer' && (
                            <div>
                                <div>
                                <label htmlFor="slaughtererFirstName">First Name: </label>
                                    <input type="text" id="slaughtererFirstName" name="userInfo.slaughtererFirstName" value={user.userInfo.slaughtererFirstName} onChange={handleInputChange} required />
                                </div>
                                <div>
                                    <label htmlFor="slaughtererLastName">Last Name: </label>
                                    <input type="text" id="slaughtererLastName" name="userInfo.slaughtererLastName" value={user.userInfo.slaughtererLastName} onChange={handleInputChange} required />
                                </div>
                                <div>
                                    <label htmlFor="slaughterName">Company Name: </label>
                                    <input type="text" id="slaughterName" name="userInfo.slaughterName" value={user.userInfo.slaughterName} onChange={handleInputChange} required />
                                </div>
                                <div>
                                    <label htmlFor="slaughterLocation">Location: </label>
                                    <input type="text" id="slaughterLocation" name="userInfo.slaughterLocation" value={user.userInfo.slaughterLocation} onChange={handleInputChange} required />
                                </div>
                                <div>
                                    <label htmlFor="slaughtererPhone">Phone No: </label>
                                    <input type="text" id="slaughtererPhone" name="userInfo.slaughtererPhone" value={user.userInfo.slaughtererPhone} onChange={handleInputChange} required />
                                </div>
                            </div>
                        )}
                        {selectedRole === 'retailer' && (
                            <div>
                                <div>
                                <label htmlFor="retailerFirstName">First Name: </label>
                                    <input type="text" id="retailerFirstName" name="userInfo.retailerFirstName" value={user.userInfo.retailerFirstName} onChange={handleInputChange} required />
                                </div>
                                <div>
                                    <label htmlFor="retailerLastName">Last Name: </label>
                                    <input type="text" id="retailerLastName" name="userInfo.retailerLastName" value={user.userInfo.retailerLastName} onChange={handleInputChange} required />
                                </div>
                                <div>
                                    <label htmlFor="retailName">Company Name: </label>
                                    <input type="text" id="retailName" name="userInfo.retailName" value={user.userInfo.retailName} onChange={handleInputChange} required />
                                </div>
                                <div>
                                    <label htmlFor="retailLocation">Location: </label>
                                    <input type="text" id="retailLocation" name="userInfo.retailLocation" value={user.userInfo.retailLocation} onChange={handleInputChange} required />
                                </div>
                                <div>
                                    <label htmlFor="retailerPhone">Phone No: </label>
                                    <input type="text" id="retailerPhone" name="userInfo.retailerPhone" value={user.userInfo.retailerPhone} onChange={handleInputChange} required />
                                </div>
                            </div>
                        )}
                    </div>
                )}
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;
