const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all orders
router.get("/", (req, res) => {
  db.query(
    `SELECT o.id AS order_id, u.name AS customer_name, o.total, o.status
     FROM orders o
     JOIN users u ON o.user_id = u.id
     ORDER BY o.created_at DESC`,
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    }
  );
});

// Create new order
router.post("/", (req, res) => {
  const { user_id, items } = req.body;
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  db.query("INSERT INTO orders (user_id, total) VALUES (?, ?)", [user_id, total], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    const orderId = result.insertId;

    const orderItems = items.map(item => [orderId, item.id, item.quantity, item.price]);
    db.query(
      "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?",
      [orderItems],
      (err2) => {
        if (err2) return res.status(500).json({ error: err2 });
        res.json({ message: "Order created!", orderId });
      }
    );
  });
});

module.exports = router;
