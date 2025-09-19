import React, { useState } from "react";

const ProductForm = ({ onSuccess }) => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: ""
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert price and stock to number
    const payload = {
      ...product,
      price: Number(product.price),
      stock: Number(product.stock)
    };

    fetch("http://localhost:3001/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setProduct({ name: "", description: "", price: "", stock: "" });

        // Trigger refresh in parent
        if (onSuccess) onSuccess();
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to add product. Check console for details.");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h3>Add Product</h3>
      <input
        name="name"
        placeholder="Product Name"
        value={product.name}
        onChange={handleChange}
        required
      />
      <input
        name="description"
        placeholder="Description"
        value={product.description}
        onChange={handleChange}
      />
      <input
        name="price"
        placeholder="Price"
        type="number"
        step="0.01"
        value={product.price}
        onChange={handleChange}
        required
      />
      <input
        name="stock"
        placeholder="Stock"
        type="number"
        value={product.stock}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;
