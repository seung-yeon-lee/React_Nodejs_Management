const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/hello", (req, res) => {
  res.send({ message: "Hello Express!" });
});

app.listen(port, () => {
  console.log(`Connecting Server Port is ${port}`);
});
