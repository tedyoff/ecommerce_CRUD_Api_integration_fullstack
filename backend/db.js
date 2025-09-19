const mysql = require("mysql2"); // instead of "mysql"

const db = mysql.createConnection({
  user: "test",
  password: "123456",
  host: "localhost",
  database: "demo-ecommerce",
  port: 3308,
});

db.connect((err) => {
  if (err) console.error("❌ DB Connection Error:", err);
  else console.log("✅ MySQL Connected");
});

module.exports = db;
