const express = require('express');
const db = require('./database'); // เรียกใช้ไฟล์ database.js
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const addShipment = express();

addShipment.use(express.json());

addShipment.post('/api/addShip', async (req, res) => {
    const { source, destination, transactionHash, userID } = req.body;
    

    const slaughtererIDQuery =  'SELECT slaughterer.slaughtererID FROM slaughterer JOIN user ON user.userID = slaughterer.userID WHERE user.userID = ?';
    db.query(slaughtererIDQuery, [userID], async (err, slaughtererIDResult) => {
    if (err) {
        return res.status(500).json({ success: false, message: 'Failed to fetch slaughtererID' });
    }
    if (slaughtererIDResult.length === 0) {
       return res.status(404).json({ success: false, message: 'User not found' });
    }
    const slaughtererID = slaughtererIDResult[0].slaughtererID;
  
    try {
    
        db.query(
            'INSERT INTO shipment (source, destination, shipmentHash) VALUES (?, ?, ?)',
            [source, destination, transactionHash],
        );
    
        res.status(201).json({ message: 'Shipment data added successfully' });
    } catch (error) {
      console.error('Error adding shipment data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  });

module.exports = addShipment;
