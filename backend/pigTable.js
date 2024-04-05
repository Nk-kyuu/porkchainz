const express = require("express");
const db = require("./database");
const pig = express();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();


pig.post('/pigInfo', jsonParser, (req, res) => {
    const userID = req.body.userID;
    const farmerIDQuery = 'SELECT farmer.farmerID FROM farmer JOIN user ON user.userID = farmer.userID WHERE user.userID = ?';
    db.query(farmerIDQuery, [userID], (err, farmerIDResult) => {
        if (err) {
            console.error('Error fetching farmerID:', err);
            return res.status(500).json({ success: false, message: 'Failed to fetch farmerID' });
        }
        if (farmerIDResult.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const farmerID = farmerIDResult[0].farmerID;
        const sqlQuery = 'SELECT * FROM pig WHERE farmerID = ? AND batchID IS NULL';
        db.query(sqlQuery, farmerID, (err, result) => {
            if (err) {
                console.error('Error fetching pig information:', err);
                return res.status(500).json({ success: false, message: 'Failed to fetch pig information' });
            }
            res.json(result);
        });
    });
});

pig.post('/pigFarmerID', jsonParser,(req, res) => {
    const email = req.body.email; 

    const findFarmer = `
        SELECT farmerID
        FROM farmer
        INNER JOIN user ON farmer.userID = user.userID
        WHERE user.email = ?`;

    db.query( findFarmer , [email], (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Error fetching pig information');
        } else {
            // ตรวจสอบว่ามีผลลัพธ์ที่พบหรือไม่
            if (result.length > 0) {
                // ส่งผลลัพธ์กลับไปเป็น JSON
                res.json({ farmerID: result[0].farmerID }); // เพิ่มการส่ง farmerID กลับไปในรูปแบบของ JSON
            } else {
                res.status(404).send('No data found for the provided email');
            }
        }
    });
});


module.exports = pig;
