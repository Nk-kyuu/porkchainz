const express = require('express');
const db = require('./database'); // เรียกใช้ไฟล์ database.js

const slaughtererSend = express();

slaughtererSend.use(express.json());

// API endpoint สำหรับการเพิ่มข้อมูลหมู
slaughtererSend.post('/api/slaughtererSend', (req, res) => {
  const { source, destination ,sendDate ,estimateArrivalDate } = req.body;

  // Query เพื่อเพิ่มข้อมูลลงในฐานข้อมูล
  const sql = 'INSERT INTO shipment ( source, destination ,sendDate ,estimateArrivalDate) VALUES (?, ?, ?, ?)';
  db.query(sql, [source, destination ,sendDate ,estimateArrivalDate], (err, result) => {
    if (err) {
      console.error('Error adding shipment:', err);
      res.status(500).json({ success: false, message: 'Failed to add shipment' });
    } else {
      console.log('shipment added successfully');
      res.status(200).json({ success: true, message: 'shipment added successfully' });
    }
  });
});

module.exports = slaughtererSend;