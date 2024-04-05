const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database");
const cors = require("cors");

const user = express();
const jsonParser = bodyParser.json();

user.use(cors());
user.use(express.json());
user.use(bodyParser.urlencoded({ extends: true }));
user.use(bodyParser.json());

user.get('/getUser', (req, res) => {
    const sqlQuery = `
    SELECT 
    'farmer' AS role,
    user.userID AS ID,
    farmerFirstName AS firstName,
    farmerLastName AS lastName,
    farmName AS name,
    farmLocation AS location,
    farmerPhone AS phone,
    NULL AS slaughterName,
    NULL AS slaughterLocation,
    NULL AS slaughtererPhone,
    farmer.userID -- Specify the table alias for userID
FROM farmer
INNER JOIN user ON farmer.userID = user.userID -- Specify the table alias for userID

UNION ALL

SELECT 
    'slaughterer' AS role,
    user.userID AS ID,
    slaughtererFirstName AS firstName,
    slaughtererLastName AS lastName,
    slaughterName AS name,
    slaughterLocation AS location,
    slaughtererPhone AS phone,
    NULL AS slaughterName,
    NULL AS slaughterLocation,
    NULL AS slaughtererPhone,
    slaughterer.userID -- Specify the table alias for userID
FROM slaughterer
INNER JOIN user ON slaughterer.userID = user.userID -- Specify the table alias for userID

UNION ALL

SELECT 
    'retailer' AS role,
    user.userID AS ID,
    retailerFirstName AS firstName,
    retailerLastName AS lastName,
    retailName AS name,
    retailLocation AS location,
    retailerPhone AS phone,
    NULL AS slaughterName,
    NULL AS slaughterLocation,
    NULL AS slaughtererPhone,
    retailer.userID -- Specify the table alias for userID
FROM retailer
INNER JOIN user ON retailer.userID = user.userID; -- Specify the table alias for userID
`;

    // Execute the query
    db.query(sqlQuery, (error, results) => {
        if (error) {
            console.error('Error fetching user data:', error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            // Send the results as JSON response
            res.json(results);
        }
    });
})

user.post('/admin/register', jsonParser, (req, res) => {
    const { adminName, adminEmail, adminPhone, adminPassword } = req.body;
    const sql = 'INSERT INTO admin (adminName, adminEmail, adminPhone, adminPassword) VALUES (?, ?, ?, ?)';
    db.query(sql,
        [adminName, adminEmail, adminPhone, adminPassword],
        (err, result) => {
            if (err) {
                console.error('Error adding admin:', err);
                res.status(500).json({ status: "ok", message: 'Failed to add admin' });
            } else {
                console.log('Admin added successfully');
                res.status(200).json({ status: "ok" , message: 'Admin added successfully' });
            }
        })
})

user.post('/register', jsonParser, (req, res) => {
    const adminEmail = req.body.adminEmail;
    const userData = req.body.user;

    // Start a transaction
    db.beginTransaction(err => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }

        // Check if admin exists
        db.query(
            'SELECT * FROM admin WHERE adminEmail = ?',
            [adminEmail],
            (err, adminResult) => {
                if (err) {
                    return db.rollback(() => {
                        res.status(500).json({ error: 'Internal server error' });
                    });
                }

                if (adminResult.length === 0) {
                    return db.rollback(() => {
                        res.status(403).json({ error: 'Unauthorized' });
                    });
                }

                // Define a promise for user creation
                const userCreationPromise = new Promise((resolve, reject) => {
                    const { email, password, role, userInfo } = userData;

                    // Insert user into `user` table
                    db.query(
                        'INSERT INTO user (email, password, role, createBy) VALUES (?, ?, ?, ?)',
                        [email, password, role, adminResult[0].adminID],
                        (err, userResult) => {
                            if (err) {
                                console.error(err);
                                return reject('Failed to register user');
                            }

                            const userID = userResult.insertId; // Obtain the ID of the newly inserted user

                            // Insert user-specific info into respective tables based on role
                            switch (role) {
                                case 'farmer':
                                    // Insert farmer
                                    db.query(
                                        'INSERT INTO farmer (farmerFirstName, farmerLastName, farmName, farmLocation, farmerPhone, userID) VALUES (?, ?, ?, ?, ?, ?)',
                                        [userInfo.farmerFirstName, userInfo.farmerLastName, userInfo.farmName, userInfo.farmLocation, userInfo.farmerPhone, userID],
                                        (err, farmerResult) => {
                                            if (err) {
                                                console.error(err);
                                                return reject('Failed to register farmer');
                                            }
                                            resolve(); // Resolve the promise once farmer is inserted successfully
                                        }
                                    );
                                    break;
                                case 'slaughterer':
                                    // Insert slaughterer
                                    db.query(
                                        'INSERT INTO slaughterer (slaughtererFirstName, slaughtererLastName, slaughterName, slaughterLocation, slaughtererPhone, userID) VALUES (?, ?, ?, ?, ?, ?)',
                                        [userInfo.slaughtererFirstName, userInfo.slaughtererLastName, userInfo.slaughterName, userInfo.slaughterLocation, userInfo.slaughtererPhone, userID],
                                        (err, slaughtererResult) => {
                                            if (err) {
                                                console.error(err);
                                                return reject('Failed to register slaughterer');
                                            }
                                            resolve(); // Resolve the promise once slaughterer is inserted successfully
                                        }
                                    );
                                    break;
                                case 'retailer':
                                    // Insert retailer
                                    db.query(
                                        'INSERT INTO retailer (retailerFirstName, retailerLastName, retailName, retailLocation, retailerPhone, userID) VALUES (?, ?, ?, ?, ?, ?)',
                                        [userInfo.retailerFirstName, userInfo.retailerLastName, userInfo.retailName, userInfo.retailLocation, userInfo.retailerPhone, userID],
                                        (err, retailerResult) => {
                                            if (err) {
                                                console.error(err);
                                                return reject('Failed to register retailer');
                                            }
                                            resolve(); // Resolve the promise once retailer is inserted successfully
                                        }
                                    );
                                    break;
                                default:
                                    reject('Unknown role'); // Reject for unknown role
                                    break;
                            }
                        }
                    );
                });

                // Execute the user creation promise
                userCreationPromise
                    .then(() => {
                        // Commit the transaction if promise is resolved
                        db.commit(err => {
                            if (err) {
                                console.error(err);
                                return res.status(500).json({ error: 'Failed to commit transaction' });
                            }
                            // User and corresponding info inserted successfully
                            res.status(200).json({status: 'ok', message: 'User registered successfully' });
                        });
                    })
                    .catch(error => {
                        // Rollback the transaction if promise is rejected
                        db.rollback(() => {
                            res.status(500).json({ error, message: 'User registration failed' });
                        });
                    });
            }
        );
    });
});


module.exports = user;