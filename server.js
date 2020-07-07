const fs = require("fs"); // file read를 위한 라이브러리
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);
const mysql = require("mysql");

const db = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database,
});
db.connect();

app.get("/api/customers", (req, res) => {
  db.query("SELECT * FROM CUSTOMER", (err, rows, fileds) => {
    if (err) console.log(err);
    res.send(rows);
  });
});

app.listen(port, () => {
  console.log(`Connecting Server Port is ${port}`);
});
