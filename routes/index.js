const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/login", async (req, res) => {
  console.log(">>>", req.body);
  const access_token = await bcrypt.hash(
    jwt.sign(req.body, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15s",
    }),
    10
  );
  const refresh_token = await bcrypt.hash(
    jwt.sign(req.body, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    }),
    10
  );

  res.json({ access_token, refresh_token });
});

router.post("/profile", async (req, res) => {
  jwt.verify()
});

module.exports = router;