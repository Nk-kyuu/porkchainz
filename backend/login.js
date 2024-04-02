const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const db = require("./database");

const login = express();
const jsonParser = bodyParser.json();
const secret = "secretlog";

login.use(cors());
login.use(express.json());
login.use(bodyParser.urlencoded({ extends: true }));
login.use(bodyParser.json());

// Admin add user/register endpoint
login.post('/register', (req, res) => {
    const { adminEmail,userData } = req.body;

    // Check if admin exists
    db.query(
        'SELECT * FROM admin WHERE adminEmail = ?',
        [adminEmail,],
        (err, adminResult) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error' });
            }

            if (adminResult.length === 0) {
                return res.status(403).json({ error: 'Unauthorized' });
            }

            // Iterate through user data array
            userData.forEach(user => {
                const { email, password, role, userInfo } = user;

                // Insert new user
                db.query(
                    'INSERT INTO user (email, password, role, createBy) VALUES (?, ?, ?, ?)',
                    [email, password, role, adminResult[0].adminID],
                    (err, userResult) => {
                        if (err) {
                            return res.status(500).json({ error: 'Failed to register user' });
                        }

                        // Get the ID of the newly inserted user
                        const userID = userResult.insertId;

                        // Insert user-specific info into respective tables
                        switch (role) {
                            case 'farmer':
                                const { farmerFirstName, farmerLastName, farmName, farmLocation, farmerPhone } = userInfo;
                                db.query(
                                    'INSERT INTO farmer (farmerFirstName, farmerLastName, farmName, farmLocation, farmerPhone, userID) VALUES (?, ?, ?, ?, ?, ?)',
                                    [farmerFirstName, farmerLastName, farmName, farmLocation, farmerPhone, userID],
                                    (err, farmerResult) => {
                                        if (err) {
                                            console.error(err);
                                            return res.status(500).json({ error: 'Failed to register farmer' });
                                        }
                                    }
                                );
                                break;
                            case 'slaughterer':
                                const { slaughtererFirstName, slaughtererLastName, slaughterName, slaughterLocation, slaughtererPhone } = userInfo;
                                db.query(
                                    'INSERT INTO slaughterer (slaughtererFirstName, slaughtererLastName, slaughterName, slaughterLocation, slaughtererPhone, userID) VALUES (?, ?, ?, ?, ?, ?)',
                                    [slaughtererFirstName, slaughtererLastName, slaughterName, slaughterLocation, slaughtererPhone, userID],
                                    (err, slaughtererResult) => {
                                        if (err) {
                                            console.error(err);
                                            return res.status(500).json({ error: 'Failed to register slaughterer' });
                                        }
                                    }
                                );
                                break;
                            case 'retailer':
                                const { retailerFirstName, retailerLastName, retailName, retailLocation, retailerPhone } = userInfo;
                                db.query(
                                    'INSERT INTO retailer (retailerFirstName, retailerLastName, retailName, retailLocation, retailerPhone, userID) VALUES (?, ?, ?, ?, ?, ?)',
                                    [retailerFirstName, retailerLastName, retailName, retailLocation, retailerPhone, userID],
                                    (err, retailerResult) => {
                                        if (err) {
                                            console.error(err);
                                            return res.status(500).json({ error: 'Failed to register retailer' });
                                        }
                                    }
                                );
                                break;
                            default:
                                break;
                        }
                    }
                );
            });

            res.status(200).json({ message: 'Users registered successfully' });
        }
    );
});


login.post("/login", jsonParser, (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query(
        'SELECT * FROM user WHERE email = ?',
        [email],
        function (err, user, fields) {
            if (err) {
                return res.status(500).json({ status: "error", message: "Internal server error" });
            }
            if (user.length === 0) {
                return res.status(404).json({ status: "error", message: "No user found" });
            }

            // Compare passwords directly
            if (password === user[0].password) {
                const token = jwt.sign({ email: user[0].email, role: user[0].role }, secret, {
                    expiresIn: "1h",
                });
                return res.status(200).json({ status: "ok", message: "success", token });
            } else {
                return res.status(401).json({ status: "error", message: "Authentication failed" });
            }
        }
    );
});

login.post('/login/metamask', (req, res) => {
    const { address, role } = req.body;

    // Authenticate user with Metamask
    // For simplicity, let's assume the user is always authenticated successfully

    // Generate JWT token
    const token = jwt.sign({ address, role }, secret, { expiresIn: '1h' });

    // Send token to the client
    return res.status(200).json({ status: "ok", message: "success", token });
    // res.json({ token });
});

login.post("/authen", jsonParser, (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, secret);
        res.json({ status: "ok", decoded });
    } catch (err) {
        res.json({ status: "error", message: err.message });
    }
});

login.post("/logout", jsonParser, (req, res) => {
    return res.status(200).json({ message: "Logout successful" });
})

// // Middleware to verify JWT token
// const verifyToken = (req, res, next) => {
//     const token = req.headers['authorization'];

//     if (!token) {
//         return res.status(401).json({ status: "error", message: "No token provided" });
//     }

//     jwt.verify(token, secret, (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ status: "error", message: "Failed to authenticate token" });
//         }
//         req.user = decoded;
//         next();
//     });
// };

// // Example protected route
// login.get('/protected', verifyToken, (req, res) => {
//     res.json({ status: "ok", message: "This is a protected route", user: req.user });
// });


module.exports = login;
