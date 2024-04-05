const express = require("express");
const db = require("./database");
const batch = express();


batch.use(express.json());


batch.post('/batchInfo', (req, res) => {
    const farmerID = req.body.farmerID 


db.query("SELECT batch.batchID FROM pig JOIN batch ON pig.batchID = batch.batchID WHERE pig.farmerID = ?", [farmerID], (err, batchIDResult) => {
    if (err) {
        res.status(500).json({ error: err.message });
    } else {
        const batchIDs = batchIDResult.map(row => row.batchID);
        db.query("SELECT * FROM batch WHERE batchID IN (?)", [batchIDs], (err, batchResult) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                db.query("SELECT * FROM slaughterer", (err, slaughtererResult) => {
                    if (err) {
                        res.status(500).json({ error: err.message });
                    } else {
                        res.json({ batch: batchResult, slaughterer: slaughtererResult, farmerID: farmerID });
                    }
                });
            }
        });
    }
});
});


batch.put('/updateBatch/:batchID', (req, res) => {
    const batchID = req.params.batchID;
    const slaughtererID = req.body.slaughtererID; 

   
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


