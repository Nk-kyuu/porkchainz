const express = require("express");
const db = require("./database");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const batch = express();

batch.post("/createBatch", jsonParser, (req, res) => {
    const batchName = req.body.batchName;
    const batchDescription = req.body.batchDescription;
    const pigID = req.body.pigID;

    db.beginTransaction(function (err) {
        if (err) {
            res.json({ status: "error", message: err });
            return;
        }
        
        db.query(
            `
            INSERT INTO batch (batchID, batchName, batchWeight, batchQuantity, batchDescription)
            SELECT 
                batchID,
                '${batchName}' AS batchName,
                SUM(pigWeight) AS batchWeight,
                COUNT(*) AS batchQuantity,
                '${batchDescription}' AS batchDescription
            FROM pig
            WHERE pigID IN (${pigID.join(',')})
            GROUP BY batchID;
            `,
            function (err, results, fields) {
                if (err) {
                    return db.rollback(function () {
                        res.json({ status: "error", message: err });
                    });
                }
                const lastInsertId = results.insertId;
                db.query(
                    `
                    UPDATE pig
                    SET batchID = ${lastInsertId}
                    WHERE pigID IN (${pigID.join(',')});
                    `,
                    function (err, results, fields) {
                        if (err) {
                            return db.rollback(function () {
                                res.json({ status: "error", message: err });
                            });
                        }

                        db.commit(function (err) {
                            if (err) {
                                return db.rollback(function () {
                                    res.json({ status: "error", message: err });
                                });
                            }
                            res.json({ status: "ok" });
                        });
                    }
                );
            }
        );
    });
});
module.exports = batch;