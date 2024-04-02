const express = require("express");
const db = require("./database");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const farmer = express();

farmer.get('/farmer', (req,res) => {
    res.send("hello farmer");
});

//Add Pig Info
farmer.post("/api/addpig", jsonParser, async (req, res) => {
    const { pigWeight, pigStartDate, pigEndDate, pigBreed, pigHealth } = req.body;
  
    if (!pigWeight || !pigStartDate || !pigEndDate || !pigBreed || !pigHealth ) {
      return res.status(400).json({ error: "ข้อมูลไม่ครบถ้วน" });
    }
  
    const sql = `INSERT INTO pig (pigWeight, pigStartDate, pigEndDate, pigBreed, pigHealth)
      VALUES (?, ?, ?, ?, ?)`;
  
    const values = [pigWeight, pigStartDate, pigEndDate, pigBreed, pigHealth];
  
    try {
      await db.query(sql, values);
      res.status(201).json({ message: "บันทึกข้อมูลเรียบร้อย" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "เกิดข้อผิดพลาด" });
    }
});

//Get Pig Info From DB
farmer.get("/api/getpig", async (req, res) => {
    try {
      const sql = `SELECT * FROM pig`;
      const results = await db.query(sql);
      res.status(200).json({ data: results });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "เกิดข้อผิดพลาด" });
    }
});
  


// farmer.get("/api/pig/:id", async (req, res) => {
//     const pigID = req.params.id;
  
//     if (!pigID) {
//       return res.status(400).json({ error: "ไม่พบ ID หมู" });
//     }
  
//     const sql = `SELECT * FROM pig WHERE pigID = ?`;
//     const values = [pigID];
  
//     try {
//       const results = await db.query(sql, values);
//       if (results.length === 0) {
//         return res.status(404).json({ error: "ไม่พบข้อมูลหมู" });
//       }
//       res.status(200).json({ data: results[0] });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "เกิดข้อผิดพลาด" });
//     }
// });
  



// const info = [
//   {
//     id: 1,
//     name: 'Chonthitta',
//     email: 'pc@gmail'
//   },
//   {
//     id: 2,
//     name: 'Nathaporn',
//     email: 'lin@gmail'
//   },
//   {
//     id: 3,
//     name: 'Meow',
//     email: 'cat@gmail'
//   }
// ]

// Farmer.get('/farmer/users', (req,res) => {
//   res.json(info);
// });



// farmer.get ("/farmerGet/addPig" , jsonParser, (req,res) => {
//     //pigID autogen
//     const weight = req.body.weight;
//     const startDate = req.body.startDate;
//     const endDate = req.body.endDate;
//     const breed = req.body.breed;
//     const health = req.body.health;
    
//     db.query (
//         "INSERT INTO pig (pigWeight, pigStartDate, pigEndDate, pigBreed, pigHealth) VALUE (?,?,?,?,?)",
//         [weight, startDate, endDate, breed, health],
//         function (err, results, fields) {
//             if (err) {
//                 res.json({ status: "error", message: err });
//                 return;
//             }
//             res.json({ status: "ok" });
//         }
//     );
// });



// farmer.post("/pig", jsonParser, async (req, res) => {
//     const { pigWeight, pigStartDate, pigEndDate, pigBreed, pigHealth } = req.body;
  
//     // ตรวจสอบข้อมูล
//     if (!pigWeight || !pigStartDate || !pigEndDate || !pigBreed || !pigHealth ) {
//       return res.status(400).json({ error: "ข้อมูลไม่ครบถ้วน" });
//     }
  
//     // เขียน SQL query
//     const sql = `INSERT INTO pig (pigWeight, pigStartDate, pigEndDate, pigBreed, pigHealth) 
//     VALUES (?, ?, ?, ?, ?)`;
  
//     // เตรียมค่า parameters
//     const values = [pigWeight, pigStartDate, pigEndDate, pigBreed, pigHealth];
  
//     // ดึง connection จาก database
//     const connection = await db.getConnection();
  
//     // ทำการ query
//     try {
//       await connection.query(sql, values);
//       res.status(201).json({ message: "บันทึกข้อมูลเรียบร้อย" });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "เกิดข้อผิดพลาดในการบันทึกข้อมูล" });
//     } finally {
//       // ปิด connection
//       connection.release();
//     }
//   });
  

module.exports = farmer;