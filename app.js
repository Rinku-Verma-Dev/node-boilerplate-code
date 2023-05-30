const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/index");
require("dotenv").config();

const app = express();

app.use(cors());
app.use("/", router);
app.use(express.json());
app.use(express.static("public"));

const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_CONNECTION_URL)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log("listening post http://localhost:" + port);
});

console.log("hello");
