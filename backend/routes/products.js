const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all products
router.get("/", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Add product
router.post("/", (req, res) => {
  const { name, description, price, stock } = req.body;
  db.query(
    "INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)",
    [name, description, price, stock],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Product added!", id: result.insertId });
    }
  );
});

module.exports = router;
