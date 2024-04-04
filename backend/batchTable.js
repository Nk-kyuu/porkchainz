const express = require("express");
const db = require("./database");
const batch = express();

// Middleware เพื่อให้อ่านข้อมูลจาก request body ในรูปแบบ JSON
batch.use(express.json());

// GET endpoint เพื่อเรียกดูข้อมูลของ batch และ slaughterer
batch.get('/batchInfo', (req, res) => {
    db.query("SELECT * FROM batch", (err, batchResult) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            db.query("SELECT * FROM slaughterer", (err, slaughtererResult) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                } else {
                    res.json({ batch: batchResult, slaughterer: slaughtererResult });
                }
            });
        }
    });
});

// PUT endpoint เพื่ออัปเดต slaughtererID ในตาราง batch
batch.put('/updateBatch/:batchID', (req, res) => {
    const batchID = req.params.batchID;
    const slaughtererID = req.body.slaughtererID; // รับ slaughtererID จาก req.body

    // ตรวจสอบว่า slaughtererID ถูกส่งมาหรือไม่
    if (!slaughtererID) {
        return res.status(400).json({ error: "Missing slaughtererID in request body" });
    }

    // Check if the batchID exists
    db.query("SELECT * FROM batch WHERE batchID = ?", [batchID], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else {
            if (result.length === 0) {
                return res.status(404).json({ error: "Batch not found" });
            } else if (result[0].slaughtererID !== null) {
                return res.status(400).json({ error: "Slaughterer already assigned" });
            } else {
                // Update the batch with the new slaughtererID
                db.query("UPDATE batch SET slaughtererID = ? WHERE batchID = ?", [slaughtererID, batchID], (err, result) => {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    } else {
                        return res.sendStatus(200);
                    }
                });
            }
        }
    });
});

module.exports = batch;
