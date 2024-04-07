const express = require('express');
const db = require('./database'); // เรียกใช้ไฟล์ database.js

const addProduct = express();

addProduct.use(express.json());

addProduct.post('/api/addPro', async (req, res) => {
  const { productWeight, productName, transactionHash, userID } = req.body;

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
    try {
      // Insert product data into the database
      db.query(
        'INSERT INTO product (productName, productWeight, productHash, slaughtererID) VALUES (?, ?, ?, ?)',
        [productName, productWeight, transactionHash, slaughtererID]
      );

      res.status(201).json({ message: 'Product data added successfully' });
    } catch (error) {
      console.error('Error adding product data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});

module.exports = addProduct;
