const express = require('express');
const db = require('./database'); // เรียกใช้ไฟล์ database.js

const farmerAdd = express();

farmerAdd.use(express.json());


farmerAdd.post('/api/addPig', (req, res) => {
  const { pigWeight, pigStartDate, pigHealth, pigEndDate, pigBreed, farmerID } = req.body;

  
  const sql = 'INSERT INTO pig (pigWeight, pigStartDate, pigHealth, pigEndDate, pigBreed, farmerID) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [pigWeight, pigStartDate, pigHealth, pigEndDate, pigBreed, farmerID], (err, result) => {
    if (err) {
      console.error('Error adding pig:', err);
      res.status(500).json({ success: false, message: 'Failed to add pig' });
    } else {
      console.log('Pig added successfully');
      res.status(200).json({ success: true, message: 'Pig added successfully' });
    }
  });
});

module.exports = farmerAdd;