import { useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbarAdmin';
import { Button } from '@mui/material';

const RegisterForm = () => {
    const adminEmail = localStorage.getItem("adminEmail")
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

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleEmailChange = (event) => {
        setUser(prevUser => ({
            ...prevUser,
            email: event.target.value
        }));
    };

    const handlePasswordChange = (event) => {
        setUser(prevUser => ({
            ...prevUser,
            password: event.target.value
        }));
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        // If the field name starts with "userInfo.", remove that prefix
        const fieldName = name.startsWith('userInfo.') ? name.substring(9) : name;
        setUser(prevUser => ({
            ...prevUser,
            userInfo: {
                ...prevUser.userInfo,
                [fieldName]: value
            }
        }));
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
            // Log the data before submitting the form
            console.log("Form data:", {adminEmail, user, selectedRole});

            const response = await axios.post('http://localhost:5000/register', {adminEmail, user});
            if (response.data.status === 'ok'){
                alert('User registered successfully');
                window.location = '/admin/home'
            }
            else {
                // Handle failed login (e.g., display error message)
                console.log('Registration failed:', response.data.message);
            }
            // setSuccessMessage(response.data.message);
            // setErrorMessage('');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setErrorMessage(error.response.data.error);
            } else {
                setErrorMessage('An error occurred while registering the user.');
            }
            setSuccessMessage('');
        }
    };

    const inputStyle = {
        width: "200%",
        padding: "8px",
        margin: "8px 0",
        borderRadius: "8px",
        border: "1px solid #ccc"
    }

    return (
        <div className='container'>
            <div className='Navbar'>
                <Navbar />
            </div>
            <div className='content' style={{ backgroundColor: "white", paddingBottom: "4vh", width: "80%", marginLeft: "10%", borderRadius: "15px"}}>
                <h2>Register User</h2>
                <div style={{ marginRight: "12%" }}>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="role">Select Role:</label><br />
                            <select style={inputStyle} id="role" name="role" value={selectedRole} onChange={handleRoleSelect} required>
                                <option value="">Select Role</option>
                                <option value="farmer">Farmer</option>
                                <option value="slaughterer">Slaughterer</option>
                                <option value="retailer">Retailer</option>
                            </select>
                        </div>
                        {selectedRole && (
                            <>

                                <div>
                                    <label htmlFor="email">Email:</label><br />
                                    <input style={inputStyle} type="email" id="email" name="email" value={user.email} onChange={handleEmailChange} required />
                                </div>
                                <div>
                                    <label htmlFor="password">Password:</label><br />
                                    <input style={inputStyle} type="password" id="password" name="password" value={user.password} onChange={handlePasswordChange} required />
                                </div>
                                <div>
                                    <h3 style={{marginRight: "60%"}}>UserInfo</h3>
                                    {/* Render additional fields based on selected role */}
                                    {selectedRole === 'farmer' && (
                                        <>
                                            <div>
                                                <label htmlFor="farmerFirstName">First Name: </label><br />
                                                <input style={inputStyle} type="text" id="farmerFirstName" name="userInfo.farmerFirstName" value={user.userInfo.farmerFirstName} onChange={handleInputChange} required />
                                            </div>
                                            <div>
                                                <label htmlFor="farmerLastName">Last Name: </label><br />
                                                <input style={inputStyle} type="text" id="farmerLastName" name="userInfo.farmerLastName" value={user.userInfo.farmerLastName} onChange={handleInputChange} required />
                                            </div>
                                            <div>
                                                <label htmlFor="farmName">Company Name: </label><br />
                                                <input style={inputStyle} type="text" id="farmName" name="userInfo.farmName" value={user.userInfo.farmName} onChange={handleInputChange} required />
                                            </div>
                                            <div>
                                                <label htmlFor="farmLocation">Location: </label><br />
                                                <input style={inputStyle} type="text" id="farmLocation" name="userInfo.farmLocation" value={user.userInfo.farmLocation} onChange={handleInputChange} required />
                                            </div>
                                            <div>
                                                <label htmlFor="farmerPhone">Phone No: </label><br />
                                                <input style={inputStyle} type="text" id="farmerPhone" name="userInfo.farmerPhone" value={user.userInfo.farmerPhone} onChange={handleInputChange} required />
                                            </div>
                                        </>
                                    )}
                                    {selectedRole === 'slaughterer' && (
                                        <>
                                            <div>
                                                <label htmlFor="slaughtererFirstName">First Name: </label><br />
                                                <input style={inputStyle} type="text" id="slaughtererFirstName" name="userInfo.slaughtererFirstName" value={user.userInfo.slaughtererFirstName} onChange={handleInputChange} required />
                                            </div>
                                            <div>
                                                <label htmlFor="slaughtererLastName">Last Name: </label><br />
                                                <input style={inputStyle} type="text" id="slaughtererLastName" name="userInfo.slaughtererLastName" value={user.userInfo.slaughtererLastName} onChange={handleInputChange} required />
                                            </div>
                                            <div>
                                                <label htmlFor="slaughterName">Company Name: </label><br />
                                                <input style={inputStyle} type="text" id="slaughterName" name="userInfo.slaughterName" value={user.userInfo.slaughterName} onChange={handleInputChange} required />
                                            </div>
                                            <div>
                                                <label htmlFor="slaughterLocation">Location: </label><br />
                                                <input style={inputStyle} type="text" id="slaughterLocation" name="userInfo.slaughterLocation" value={user.userInfo.slaughterLocation} onChange={handleInputChange} required />
                                            </div>
                                            <div>
                                                <label htmlFor="slaughtererPhone">Phone No: </label><br />
                                                <input style={inputStyle} type="text" id="slaughtererPhone" name="userInfo.slaughtererPhone" value={user.userInfo.slaughtererPhone} onChange={handleInputChange} required />
                                            </div>
                                        </>
                                    )}
                                    {selectedRole === 'retailer' && (
                                        <>
                                            <div>
                                                <label htmlFor="retailerFirstName">First Name: </label><br />
                                                <input style={inputStyle} type="text" id="retailerFirstName" name="userInfo.retailerFirstName" value={user.userInfo.retailerFirstName} onChange={handleInputChange} required />
                                            </div>
                                            <div>
                                                <label htmlFor="retailerLastName">Last Name: </label><br />
                                                <input style={inputStyle} type="text" id="retailerLastName" name="userInfo.retailerLastName" value={user.userInfo.retailerLastName} onChange={handleInputChange} required />
                                            </div>
                                            <div>
                                                <label htmlFor="retailName">Company Name: </label><br />
                                                <input style={inputStyle} type="text" id="retailName" name="userInfo.retailName" value={user.userInfo.retailName} onChange={handleInputChange} required />
                                            </div>
                                            <div>
                                                <label htmlFor="retailLocation">Location: </label><br />
                                                <input style={inputStyle} type="text" id="retailLocation" name="userInfo.retailLocation" value={user.userInfo.retailLocation} onChange={handleInputChange} required />
                                            </div>
                                            <div>
                                                <label htmlFor="retailerPhone">Phone No: </label><br />
                                                <input style={inputStyle} type="text" id="retailerPhone" name="userInfo.retailerPhone" value={user.userInfo.retailerPhone} onChange={handleInputChange} required />
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div style={{marginLeft: "30%", marginTop: "5px"}}>
                                    <Button variant='contained' type="submit">add</Button>
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
