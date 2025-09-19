// src/components/OrderForm.js
import React, { useState } from "react";
import { useCart } from "../CartContext";

const OrderForm = () => {
  const { cart, clearCart } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [status, setStatus] = useState("pending");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const orderData = {
      customerName,
      customerEmail,
      items: cart.map(({ id, name, quantity, price }) => ({
        product_id: id,
        product_name: name,
        quantity,
        price,
      })),
      status,
    };

    console.log("Submitting Order:", orderData);

    // TODO: POST orderData to backend API
    clearCart();
    setCustomerName("");
    setCustomerEmail("");
    alert("Order submitted successfully!");
  };

  return (
    <div className="order-form">
      <h2>Create Order</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Customer Email"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          required
        />

        <h3>Cart Items</h3>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} x {item.quantity} - ${(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
        )}

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="shipped">Shipped</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
};

export default OrderForm;
