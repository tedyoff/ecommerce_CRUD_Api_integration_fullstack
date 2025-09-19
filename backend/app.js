const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const productRoutes = require("./routes/products");
const customerRoutes = require("./routes/customers");
const orderRoutes = require("./routes/orders"); // <- add this

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/products", productRoutes);
app.use("/customers", customerRoutes);
app.use("/orders", orderRoutes); // <- add this

app.listen(3001, () => console.log("🚀 Server running on http://localhost:3001"));
