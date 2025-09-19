// src/components/ProductCard.js
import React from "react";

const ProductCard = ({ product, addToCart }) => {
  const price = Number(product.price); // convert string to number

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>${price.toFixed(2)}</p>
      <button onClick={() => addToCart({ ...product, price })}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
