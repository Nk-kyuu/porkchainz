const express = require("express");
const db = require("./database");
const pig = express();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

pig.post('/pigInfo',jsonParser, (req, res) => {
    const  farmerID  = req.body.farmerID;
    // ปรับแต่งคำสั่ง SQL เพื่อดึงข้อมูล pigID ที่มี farmerID และ batchID เป็นค่า NULL
    const sqlQuery = "SELECT * FROM pig WHERE farmerID = ? AND batchID IS NULL";

    db.query(sqlQuery, farmerID, (err, result) => {
        if (err) {
            // การจัดการกับข้อผิดพลาด
            console.error('Error fetching data:', err);
            res.status(500).send('Error fetching pig information');
        } else {
            // ส่งผลลัพธ์กลับไปเป็น JSON
            res.json(result);
        }
    });
});


pig.post('/pigFarmerID', jsonParser,(req, res) => {
    const email = req.body.email; 

    const findFarmer = `
        SELECT farmerID
        FROM farmer
        INNER JOIN user ON farmer.userID = user.userID
        WHERE user.email = ?`;

    db.query( findFarmer , [email], (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Error fetching pig information');
        } else {
            // ตรวจสอบว่ามีผลลัพธ์ที่พบหรือไม่
            if (result.length > 0) {
                // ส่งผลลัพธ์กลับไปเป็น JSON
                res.json({ farmerID: result[0].farmerID }); // เพิ่มการส่ง farmerID กลับไปในรูปแบบของ JSON
            } else {
                res.status(404).send('No data found for the provided email');
            }
        }
    });
});


module.exports = pig;
