import { useState } from 'react';
import axios from 'axios';

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
        setUser(prevUser => ({
            ...prevUser,
            userInfo: {
                ...prevUser.userInfo,
                [name]: value
            }
        }));
    };

    // const handleInputChange = (event) => {
    //     const { name, value } = event.target;
    //     const [parentKey, childKey] = name.split('.'); // Split nested property name
    //     setUser(prevUser => ({
    //         ...prevUser,
    //         userInfo: {
    //             ...prevUser.userInfo,
    //             [parentKey === 'userInfo' ? childKey : parentKey]: value
    //         }
    //     }));
    // };
    

    

    const handleRoleSelect = (event) => {
        const role = event.target.value;
        setSelectedRole(role);
        setUser({
            ...user,
            role: role,
            userInfo: {} // Reset user info when role changes
        });
    };

    // const transformData = (adminEmail, user) => {
    //     return {
    //         adminEmail: adminEmail,
    //         userData: [
    //             {
    //                 email: user.email,
    //                 password: user.password,
    //                 role: user.role,
    //                 userInfo: user.userInfo
    //             }
    //         ]
    //     };
    // };


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Log the data before submitting the form
            console.log("Form data:", adminEmail, user, selectedRole);

            // Prepare user data
            //const transformedData = transformData(adminEmail, user);

            const response = await axios.post('http://localhost:5000/register');
            setSuccessMessage(response.data.message);
            setErrorMessage('');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setErrorMessage(error.response.data.error);
            } else {
                setErrorMessage('An error occurred while registering the user.');
            }
            setSuccessMessage('');
        }
    };

    return (
        <div>
            <h2>Register User</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
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
                    <>
                        <div>
                            <label htmlFor="adminEmail">Admin Email:</label>
                            <input type="email" id="adminEmail" name="adminEmail" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" value={user.email} onChange={handleEmailChange} required />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" name="password" value={user.password} onChange={handlePasswordChange} required />
                        </div>
                        <div>
                            <h3>User Info</h3>
                            {/* Render additional fields based on selected role */}
                            {selectedRole === 'farmer' && (
                                <>
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
                                </>
                            )}
                            {selectedRole === 'slaughterer' && (
                                <>
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
                                </>
                            )}
                            {selectedRole === 'retailer' && (
                                <>
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
                                </>
                            )}
                        </div>
                        <button type="submit">Register</button>
                    </>
                )}
            </form>
        </div>
    );
};

export default RegisterForm;
