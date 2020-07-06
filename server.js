const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/customers", (req, res) => {
  res.send([
    {
      id: 1,
      image: "https://placeimg.com/64/64/3",
      name: "ItemList1",
      current: "1,000,000원",
      account: "1,200,000원",
      state: "상",
    },
    {
      id: 2,
      image: "https://placeimg.com/64/64/1",
      name: "ItemList2",
      current: "235,123원",
      account: "400,201원",
      state: "중",
    },
    {
      id: 3,
      image: "https://placeimg.com/64/64/2",
      name: "ItemList3",
      current: "589,539원",
      account: "698,212원",
      state: "하",
    },
  ]);
});

app.listen(port, () => {
  console.log(`Connecting Server Port is ${port}`);
});
