// Add new customer (register or guest)
app.post("/add-customer", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  // Check if customer already exists
  const checkQuery = "SELECT * FROM Customers WHERE email = ?";
  db.query(checkQuery, [email], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });

    if (results.length > 0) {
      // Customer already exists
      return res.status(200).json({ 
        message: "Customer already exists", 
        customer_id: results[0].customer_id 
      });
    } else {
      // Insert new customer
      const insertQuery = "INSERT INTO Customers (name, email) VALUES (?, ?)";
      db.query(insertQuery, [name, email], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });

        return res.status(201).json({ 
          message: "✅ Customer added", 
          customer_id: result.insertId 
        });
      });
    }
  });
});
