const express = require('express');
const db = require('./database'); // เรียกใช้ไฟล์ database.js

const farmerAdd = express();


farmerAdd.use(express.json());

// farmerAdd.post('/api/addPig', (req, res) => {
//   const { pigWeight, pigStartDate, pigEndDate, pigBreed, pigHealth, transactionHash,  userID } = req.body;
  
//   const farmerIDQuery = 'SELECT farmer.farmerID FROM farmer JOIN user ON user.userID = farmer.userID WHERE user.userID = ?';
//   db.query(farmerIDQuery, [userID], (err, farmerIDResult) => {
//     if (err) {
//       return res.status(500).json({ success: false, message: 'Failed to fetch farmerID' });
//     }
//     if (farmerIDResult.length === 0) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }
//     const farmerID = farmerIDResult[0].farmerID;
//     const insertPig = 'INSERT INTO pig (pigWeight, pigStartDate, pigEndDate, pigBreed, pigHealth, pigHash,  farmerID) VALUES (?, ?, ?, ?, ?, ?,?)';
//     db.query(insertPig, [pigWeight, pigStartDate, pigEndDate, pigBreed, pigHealth, transactionHash,  farmerID], (err, result) => {
//       if (err) {
//         console.error('Failed to add pig:', err);
//         return res.status(500).json({ success: false, message: 'Failed to add pig' });
//       }

//       console.log('Pig added successfully');
//       res.status(200).json({ success: true, message: 'Pig added successfully' });
//     });
//   });
// });
farmerAdd.post('/api/addPig', async (req, res) => {
  const { pigWeight, pigHealth, transactionHash, userID } = req.body;

const farmerIDQuery = 'SELECT farmer.farmerID FROM farmer JOIN user ON user.userID = farmer.userID WHERE user.userID = ?';
db.query(farmerIDQuery, [userID], async (err, farmerIDResult) => {
  if (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch farmerID' });
  }
  if (farmerIDResult.length === 0) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  const farmerID = farmerIDResult[0].farmerID;
  
  try {
    // Insert pig data into the database
     db.query(
      'INSERT INTO pig (pigWeight, pigHealth, pigHash, farmerID) VALUES (?, ?, ?, ?)',
      [pigWeight, pigHealth, transactionHash, farmerID]
    );

    res.status(201).json({ message: 'Pig data added successfully' });
  } catch (error) {
    console.error('Error adding pig data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
});


module.exports = farmerAdd;
