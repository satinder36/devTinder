const express = require("express");

const app = express();

app.use("/test", (req, res) => {
  res.send(" testing");
});

app.use("/", (req, res) => {
  res.send(" Hello parent");
});

app.listen(3000, () => {
  console.log("listening"); //callback func is optional
});
