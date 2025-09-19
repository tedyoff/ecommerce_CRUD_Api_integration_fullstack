// src/components/NavMenu.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import "./NavMenu.css";

const NavMenu = () => {
  const { cart, removeFromCart } = useCart();
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  const toggleCart = () => setShowCart(!showCart);

  const total = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  const handleCheckout = () => {
    setShowCart(false);
    navigate("/create-order");
  };

  return (
    <nav className="navmenu">
      <div className="logo">
        <Link to="/">MyShop</Link>
      </div>
      <div className="menu-links">
        <Link to="/products">Products</Link>
        <Link to="/create-order">Create Order</Link>
        <Link to="/orders">Orders</Link>
        <div className="cart-icon" onClick={toggleCart}>
          🛒 ({cart.length})
        </div>
      </div>

      {showCart && (
        <div className="cart-dropdown">
          {cart.length === 0 ? (
            <p className="empty-cart">Cart is empty.</p>
          ) : (
            <>
              <ul>
                {cart.map((item) => (
                  <li key={item.id}>
                    {item.name} x {item.quantity} - ${ (Number(item.price) * item.quantity).toFixed(2) }
                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                  </li>
                ))}
              </ul>
              <p className="cart-total">Total: ${total.toFixed(2)}</p>
              <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavMenu;
