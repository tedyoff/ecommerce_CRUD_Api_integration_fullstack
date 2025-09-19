const db = require("../db");

// Create Order
const createOrder = (req, res) => {
  const { customer_id, items } = req.body;

  if (!customer_id || !items || items.length === 0) {
    return res.status(400).json({ message: "❌ Customer ID and items are required" });
  }

  // Insert into Orders table
  const orderQuery = "INSERT INTO Orders (customer_id, order_date) VALUES (?, NOW())";
  db.query(orderQuery, [customer_id], (err, result) => {
    if (err) return res.status(500).json({ message: "❌ Failed to create order", error: err });

    const order_id = result.insertId;

    // Insert all items into OrderItems table
    const itemQuery = "INSERT INTO OrderItems (order_id, product_id, quantity) VALUES ?";
    const values = items.map((item) => [order_id, item.id, item.quantity || 1]);

    db.query(itemQuery, [values], (err2) => {
      if (err2) return res.status(500).json({ message: "❌ Failed to save order items", error: err2 });

      return res.status(201).json({ message: "✅ Order created successfully", order_id });
    });
  });
};

// Get All Orders with Items
const getOrders = (req, res) => {
  const query = `
    SELECT o.order_id, o.order_date, c.name AS customer_name, 
           p.name AS product_name, oi.quantity
    FROM Orders o
    JOIN Customers c ON o.customer_id = c.customer_id
    JOIN OrderItems oi ON o.order_id = oi.order_id
    JOIN Products p ON oi.product_id = p.product_id
    ORDER BY o.order_date DESC
  `;

  db.query(query, (err, rows) => {
    if (err) return res.status(500).json({ message: "❌ Failed to fetch orders", error: err });

    // Group rows by order_id so frontend can render items cleanly
    const orders = [];
    const orderMap = {};

    rows.forEach((row) => {
      if (!orderMap[row.order_id]) {
        orderMap[row.order_id] = {
          order_id: row.order_id,
          customer_name: row.customer_name,
          order_date: row.order_date,
          items: [],
        };
        orders.push(orderMap[row.order_id]);
      }
      orderMap[row.order_id].items.push({
        name: row.product_name,
        quantity: row.quantity,
      });
    });

    res.json(orders);
  });
};

module.exports = { createOrder, getOrders };
