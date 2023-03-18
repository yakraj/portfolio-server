const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const cors = require("cors");

const app = express();
const server = http.Server(app);
app.use(bodyParser.json());
app.use(cors());
const port = 5001;

app.get("/", (req, res) => {
  res.json("hello thre it is working");
});

app.listen(9000, () => {
  console.log("it is working");
});
