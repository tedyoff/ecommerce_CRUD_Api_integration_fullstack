const db = require("../db");

const createTables = async () => {
  const createCustomers = `
    CREATE TABLE IF NOT EXISTS Customers (
      customer_id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL
    );`;

  const createProducts = `
    CREATE TABLE IF NOT EXISTS Products (
      product_id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      price DECIMAL(10,2) NOT NULL
    );`;

  const createOrders = `
    CREATE TABLE IF NOT EXISTS Orders (
      order_id INT AUTO_INCREMENT PRIMARY KEY,
      customer_id INT NOT NULL,
      order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
    );`;

  const createOrderItems = `
    CREATE TABLE IF NOT EXISTS OrderItems (
      item_id INT AUTO_INCREMENT PRIMARY KEY,
      order_id INT NOT NULL,
      product_id INT NOT NULL,
      quantity INT NOT NULL,
      FOREIGN KEY (order_id) REFERENCES Orders(order_id),
      FOREIGN KEY (product_id) REFERENCES Products(product_id)
    );`;

  const createUsers = `
    CREATE TABLE IF NOT EXISTS Users (
      user_id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );`;

  db.query(createCustomers);
  db.query(createProducts);
  db.query(createOrders);
  db.query(createOrderItems);
  db.query(createUsers);

  console.log("✅ Tables created successfully!");
};

createTables();
