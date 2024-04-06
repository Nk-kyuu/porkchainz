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
login.use(bodyParser.json());


login.post("/login", jsonParser, (req, res) => {
    const { email, password, role } = req.body;

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
            if (password === user[0].password && role === user[0].role) {
                const token = jwt.sign({ email: user[0].email, role: user[0].role }, secret, {
                    expiresIn: "1h",
                });
                return res.status(200).json({ status: "ok", message: "success", token, userID: user[0].userID });
            } else {
                return res.status(401).json({ status: "error", message: "Authentication failed" });
            }
        }
    );
});





login.post('/admin/login', jsonParser, (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query('SELECT * FROM admin WHERE adminEmail = ?',
    [email],
    (err, admin, fields) => {
        if (err) {
            return res.status(500).json({ status: "error", message: "Internal server error" });
        }
        if (admin.length === 0) {
            return res.status(404).json({ status: "error", message: "No user found" });
        }

        // Compare passwords directly
        if (password === admin[0].adminPassword) {
            const token = jwt.sign({ email: admin[0].adminEmail }, secret, {
                expiresIn: "1h",
            });
            return res.status(200).json({ status: "ok", message: "success", token });
        } else {
            return res.status(401).json({ status: "error", message: "Authentication failed" });
        }
    })
})

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

login.post("/admin/authen", jsonParser, (req, res, next) => {
    try {
        const AdminToken = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(AdminToken, secret);
        res.json({ status: "ok", decoded });
    } catch (err) {
        res.json({ status: "error", message: err.message });
    }
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
