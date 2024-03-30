const express = require("express");
const db = require("./database");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const test = express();

test.post("/test", jsonParser, (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const phoneNo = req.body.phoneno;

    db.query(
        "INSERT INTO admin (adminName, adminEmail, adminPassword, adminPhone) VALUE (?,?,?,?)",
        [username, email, password, phoneNo],
        function (err, results, fields) {
            if (err) {
                res.json({ status: "error", message: err });
                return;
            }
            res.json({ status: "ok" });
        }
    );

});

test.get("/getTest", (req, res) => {
    db.query("SELECT * FROM admin", (err, result) => {
        if (err) {
            // console.log(err);
        } else {
            console.log(result); // แสดงผลลัพธ์ใน console
            res.send(result);

        }
    })
})
module.exports = test;