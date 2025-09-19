import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { useCart } from "../CartContext";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get("http://localhost:3001/products")
      .then((res) => {
        // Ensure prices are numbers
        const productsWithNumbers = res.data.map(p => ({ ...p, price: Number(p.price) }));
        setProducts(productsWithNumbers);
      })
      .catch(err => console.error(err));
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />
      <div className="product-grid">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
