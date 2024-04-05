const express = require('express');
const db = require('./database'); // เรียกใช้ไฟล์ database.js

const slaughtererAdd = express();

slaughtererAdd.use(express.json());

slaughtererAdd.get('/slaughterer', (req, res) => {
  res.send("hello slaughterer");
});

// API endpoint สำหรับการเพิ่มข้อมูลหมู
slaughtererAdd.post('/api/slaughtererAdd', (req, res) => {
  const { productName, productWeight, productDate, batchID, email } = req.body;

  const findSlaughtererSql = `
    SELECT user.userID, slaughterer.slaughtererID, user.email, user.role
    FROM user
    INNER JOIN slaughterer ON slaughterer.userID = user.userID
    WHERE user.email = ?`;

  db.query(findSlaughtererSql, [email], (err, results) => {
    if (err) {
      console.error('Error finding slaughterer:', err);
      return res.status(500).json({ success: false, message: 'Error finding slaughterer' });
    }
    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'slaughterer not found' });
    }

    // ถ้ามี slaughtererID, เพิ่มข้อมูลหมู
    const slaughtererID = results[0].slaughtererID; // หรือใช้ userID ตามโครงสร้างของคุณ
    const sql =  'INSERT INTO product (productName, productWeight, productDate, batchID) VALUES (?, ?, ?, ?)';
    db.query(sql, [productName, productWeight, productDate, batchID], (err, result) => {
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

module.exports = slaughtererAdd;