const express = require('express');
const db = require('./database'); // เรียกใช้ไฟล์ database.js

const farmerAdd = express();

farmerAdd.use(express.json());    

// API endpoint สำหรับการเพิ่มข้อมูลหมู
farmerAdd.post('/api/addPig', (req, res) => {
  const { pigWeight, pigStartDate, pigHealth, pigEndDate, pigBreed } = req.body;

  // Query เพื่อเพิ่มข้อมูลลงในฐานข้อมูล
  const sql = 'INSERT INTO pig (pigWeight, pigStartDate, pigHealth, pigEndDate, pigBreed) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [pigWeight, pigStartDate, pigHealth, pigEndDate, pigBreed], (err, result) => {
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
