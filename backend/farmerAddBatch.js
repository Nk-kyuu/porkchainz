const express = require('express');
const db = require('./database'); // เรียกใช้ไฟล์ database.js

const farmerAddBatch = express();

farmerAddBatch.use(express.json());

// API endpoint สำหรับการเพิ่มข้อมูลหมู
farmerAddBatch.post('/api/addBatch', (req, res) => {
  const { batchName,batchWeight,batchQuantity, batchDescription } = req.body;

  // Query เพื่อเพิ่มข้อมูลลงในฐานข้อมูล
  const sql = 'INSERT INTO batch ( batchName,batchWeight,batchQuantity, batchDescription) VALUES (?, ?, ?, ?)';
  db.query(sql, [batchName,batchWeight,batchQuantity, batchDescription], (err, result) => {
    if (err) {
      console.error('Error adding batch:', err);
      res.status(500).json({ success: false, message: 'Failed to add batch' });
    } else {
      console.log('Batch added successfully');
      res.status(200).json({ success: true, message: 'Batch added successfully' });
    }
  });
});

module.exports = farmerAddBatch;
