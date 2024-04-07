const express = require("express");
const db = require("./database");
const pro = express();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();


pro.post('/productInfo', jsonParser, (req, res) => {
    const userID = req.body.userID;
    const slaughtererIDQuery = 'SELECT slaughterer.slaughtererID FROM slaughterer JOIN user ON user.userID = slaughterer.userID WHERE user.userID = ?';
    db.query(slaughtererIDQuery, [userID], (err, slaughtererIDResult) => {
        if (err) {
            console.error('Error fetching farmerID:', err);
            return res.status(500).json({ success: false, message: 'Failed to fetch farmerID' });
        }
        if (slaughtererIDResult.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const slaughtererID = slaughtererIDResult[0].slaughtererID;
        const sqlQuery = 'SELECT productID,productName,productWeight,productDate,productStatus,productHash FROM product WHERE slaughtererID = ? '
        db.query(sqlQuery, slaughtererID, (err, result) => {
            if (err) {
                console.error('Error fetching product information:', err);
                return res.status(500).json({ success: false, message: 'Failed to fetch pig information' });
            }
            res.json(result);
        });
    });
});




module.exports = pro;
