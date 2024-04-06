const express = require('express');
const db = require('./database'); // เรียกใช้ไฟล์ database.js
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const Add = express();



//Add product
Add.post('/api/slaughtererAdd', jsonParser, (req, res) => {
  const userID = req.body.userID;
  const { productName, productWeight, productDate, batchID} = req.body;
  const slaughtererIDQuery = 'SELECT slaughterer.slaughtererID FROM slaughterer JOIN user ON user.userID = slaughterer.userID WHERE user.userID = ?';
  db.query(slaughtererIDQuery, [userID], (err, slaughtererIDResult) => {
    if (err) {
      console.error('Error fetching slaughtererID:', err);
      return res.status(500).json({ success: false, message: 'Failed to fetch slaughtererID' });
    }
    if (slaughtererIDResult.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const slaughtererID = slaughtererIDResult[0].slaughtererID;
   
    const sql = 'INSERT INTO product (productName, productWeight, productDate, batchID, slaughtererID) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [productName, productWeight, productDate, batchID, slaughtererID], (err, result) => {
      if (err) {
        console.error('Error adding product:', err);
        res.status(500).json({ success: false, message: 'Failed to add product' });
      } else {
        console.log('Product added successfully');
        res.status(200).json({ success: true, message: 'Product added successfully', slaughtererID: slaughtererID });
      }
    });
  });
});

//SendBatchID
Add.post('/api/slaughtererBatchID', jsonParser, (req, res) => {
  const userID = req.body.userID;
  const slaughtererIDQuery = 'SELECT slaughterer.slaughtererID FROM slaughterer JOIN user ON user.userID = slaughterer.userID WHERE user.userID = ?';
  db.query(slaughtererIDQuery, [userID], (err, slaughtererIDResult) => {
    if (err) {
      console.error('Error fetching slaughtererID:', err);
      return res.status(500).json({ success: false, message: 'Failed to fetch slaughtererID' });
    }
    if (slaughtererIDResult.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const slaughtererID = slaughtererIDResult[0].slaughtererID;
    const sql = 'SELECT batch.batchID FROM batch WHERE batch.slaughtererID = ?';
    db.query(sql, [slaughtererID], (err, result) => {
      if (err) {
        console.error('Error fetching batchID:', err);
        res.status(500).json({ success: false, message: 'Failed to fetch batchID' });
      } else {
        const batchID = result.map(row => row.batchID); // แปลงเป็นอาร์เรย์ของตัวเลข batchID เท่านั้น
        res.status(200).json({ success: true, batchID: batchID });
      }
    });
  });
});

module.exports = Add;
