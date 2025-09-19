const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all customers
router.get("/", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Add customer
router.post("/", (req, res) => {
  const { name, email, password } = req.body;
  db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Customer added!", id: result.insertId });
    }
  );
});

module.exports = router;
