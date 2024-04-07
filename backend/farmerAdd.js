const express = require('express');
const db = require('./database'); // เรียกใช้ไฟล์ database.js

const farmerAdd = express();

farmerAdd.use(express.json());

// farmerAdd.post('/api/addPig', (req, res) => {
//   const { pigWeight, pigStartDate, pigEndDate, pigBreed, pigHealth, pigHash,  userID } = req.body;

//   const farmerIDQuery = 'SELECT farmer.farmerID FROM farmer JOIN user ON user.userID = farmer.userID WHERE user.userID = ?';
//   db.query(farmerIDQuery, [userID], (err, farmerIDResult) => {
//     if (err) {
//       return res.status(500).json({ success: false, message: 'Failed to fetch farmerID' });
//     }
//     if (farmerIDResult.length === 0) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }
//     const farmerID = farmerIDResult[0].farmerID;
//     console.log(pigBreed)
//     const insertPig = 'INSERT INTO pig (pigWeight, pigStartDate, pigEndDate, pigBreed, pigHealth, pigHash,  farmerID) VALUES (?, ?, ?, ?, ?, ?,?)';
//     db.query(insertPig, [pigWeight, pigStartDate, pigEndDate, pigBreed, pigHealth, pigHash,  farmerID], (err, result) => {
//       if (err) {
//         console.error('Failed to add pig:', err);
//         return res.status(500).json({ success: false, message: 'Failed to add pig' });
//       }

//       console.log('Pig added successfully');
//       res.status(200).json({ success: true, message: 'Pig added successfully' });
//     });
//   });
// });

// farmerAdd.post('/api/addPig', async (req, res) => {
//   try {
//     const { pigWeight, pigHealth, transactionHash } = req.body;

//     // Insert pig data into the database
//     await db.query(
//       'INSERT INTO pig (pigWeight, pigHealth, pigHash) VALUES (?, ?, ?)',
//       [pigWeight, pigHealth, transactionHash]
//     );

//     res.status(201).json({ message: 'Pig data added successfully' });
//   } catch (error) {
//     console.error('Error adding pig data:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

farmerAdd.post('/api/addPig', async (req, res) => {
  try {
    const { pigWeight, pigHealth,pigBreed, transactionHash } = req.body;

    // Insert pig data into the database
    await db.query(
      'INSERT INTO pig (pigWeight, pigHealth,pigBreed, pigHash) VALUES (?, ?, ?,?)',
      [pigWeight, pigHealth,pigBreed, transactionHash]
    );

    res.status(201).json({ message: 'Pig data added successfully' });
  } catch (error) {
    console.error('Error adding pig data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

farmerAdd.post('/api/storeHash', (req, res) => {
  const { hash } = req.body;

  // Assuming you have a table named 'hashes' with a column named 'hash'
  const insertQuery = 'INSERT INTO pig (pigHash) VALUES (?)';

  db.query(insertQuery, [hash], (err, result) => {
    if (err) {
      console.error('Error storing hash:', err);
      return res.status(500).json({ success: false, message: 'Failed to store hash' });
    }

    console.log('Hash stored successfully');
    res.status(200).json({ success: true, message: 'Hash stored successfully' });
  });
});



module.exports = farmerAdd;
