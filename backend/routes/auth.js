const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: "Missing fields" });

  const hashedPassword = await bcrypt.hash(password, 10);
  db.query(
    "INSERT INTO Users (username, password) VALUES (?, ?)",
    [username, hashedPassword],
    (err) => {
      if (err) return res.status(500).json({ message: "User already exists" });
      res.json({ message: "✅ User registered successfully" });
    }
  );
});

// Login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query("SELECT * FROM Users WHERE username = ?", [username], async (err, rows) => {
    if (err) return res.status(500).json(err);
    if (rows.length === 0) return res.status(400).json({ message: "User not found" });

    const user = rows[0];
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).json({ message: "Invalid password" });

    // Create token
    const token = jwt.sign({ id: user.user_id, username: user.username }, "secretkey", {
      expiresIn: "1h",
    });

    res.json({ token });
  });
});

module.exports = router;
