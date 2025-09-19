// backend/seed.js
const mysql = require("mysql");

// MySQL Connection
const db = mysql.createConnection({
  user: "test",
  password: "123456",
  host: "localhost",
  database: "demo-ecommerce",
  port: 3308, // MySQL port
});

db.connect((err) => {
  if (err) {
    console.error("❌ DB Connection Error:", err);
    return;
  }
  console.log("✅ MySQL Connected");

  const products = [
    ['iPhone 15', 'Apple flagship phone', 1199.99, 10],
    ['Samsung Galaxy S23', 'Latest Samsung smartphone', 999.99, 15],
    ['MacBook Pro 16"', 'Apple laptop for professionals', 2499.99, 5],
    ['Dell XPS 13', 'High-end Windows laptop', 1399.99, 8],
    ['Sony WH-1000XM5', 'Noise-cancelling headphones', 349.99, 20],
    ['Bose QuietComfort 45', 'Premium noise-cancelling headphones', 329.99, 18],
    ['Apple Watch Series 9', 'Smartwatch with health tracking', 399.99, 25],
    ['Samsung Galaxy Watch 6', 'Samsung smartwatch', 379.99, 22],
    ['iPad Pro 12.9"', 'Apple tablet', 1099.99, 12],
    ['Kindle Paperwhite', 'E-reader with backlight', 149.99, 30],
    ['Logitech MX Master 3', 'Advanced wireless mouse', 99.99, 40],
    ['Razer BlackWidow V3', 'Gaming mechanical keyboard', 139.99, 15],
    ['Sony PlayStation 5', 'Next-gen gaming console', 499.99, 7],
    ['Xbox Series X', 'Microsoft gaming console', 499.99, 7],
    ['Nintendo Switch OLED', 'Nintendo hybrid console', 349.99, 10],
  ];

  const sql = "INSERT INTO products (name, description, price, stock) VALUES ?";

  db.query(sql, [products], (err, result) => {
    if (err) throw err;
    console.log(`✅ Inserted ${result.affectedRows} products`);
    db.end();
  });
});
