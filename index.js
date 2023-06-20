const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/index");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/", router);
app.use(express.static("public"));
app.use(express.static("uploads"));
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const sanitizedFilename = file.originalname.replace(/\s+/g, "_");
    cb(null, Date.now() + path.extname(sanitizedFilename));
  },
});
const upload = multer({ storage });

app.post("/upload", upload.array("images"), (req, res) => {
  const fileURLs = req.files.map(
    (file) => `http://localhost:${port}/${file.path}`
  );
  // Save fileURLs to MongoDB
  res.json({ message: "Images uploaded successfully", fileURLs });
});

mongoose
  .connect(process.env.MONGO_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

app.listen(port, () => console.log(`listening at http://localhost:${port}`));
