const db = require("../db");

exports.getProducts = (req, res) => {
  db.query("SELECT * FROM Products", (err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
};

exports.addProduct = (req, res) => {
  const { name, price, image, category } = req.body;
  db.query(
    "INSERT INTO Products (name, price, image, category) VALUES (?, ?, ?, ?)",
    [name, price, image, category],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("✅ Product added");
    }
  );
};
