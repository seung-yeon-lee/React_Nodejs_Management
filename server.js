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
const multer = require("multer");
const upload = multer({ dest: "./upload" });
app.use("/image", express.static("./upload"));

app.post("/api/customers", upload.single("image"), (req, res) => {
  let sql = "INSERT INTO CUSTOMER VALUES(null, ?,?,?,?,?)";
  let image = "http://localhost:5000/image/" + req.file.filename;
  let name = req.body.name;
  let current = req.body.current;
  let state = req.body.state;
  let account = req.body.account;
  let params = [image, name, current, account, state];
  db.query(sql, params, (err, rows) => {
    if (err) console.log(err);
    res.send(rows);
  });
});

app.get("/api/customers", (req, res) => {
  db.query("SELECT * FROM CUSTOMER", (err, rows, fileds) => {
    if (err) console.log(err);
    res.send(rows);
  });
});

app.listen(port, () => {
  console.log(`Connecting Server Port is ${port}`);
});
