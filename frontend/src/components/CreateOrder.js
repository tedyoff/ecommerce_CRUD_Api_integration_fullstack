import React, { useState, useEffect } from "react";
import { useCart } from "../CartContext";
import axios from "axios";

const CreateOrder = () => {
  const { cart, clearCart } = useCart();
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/customers")
      .then(res => setCustomers(res.data))
      .catch(err => console.error(err));
  }, []);

  const handlePlaceOrder = () => {
    if (!selectedCustomer) return alert("Select a customer!");
    if (cart.length === 0) return alert("Cart is empty!");

    const cartWithNumbers = cart.map(item => ({ ...item, price: Number(item.price) }));

    axios.post("http://localhost:3001/orders", {
      user_id: selectedCustomer,
      items: cartWithNumbers
    })
      .then(() => {
        alert("Order placed!");
        clearCart();
      })
      .catch(err => console.error(err));
  };

  const total = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  return (
    <div className="container mt-4">
      <h2>Create Order</h2>
      <select value={selectedCustomer} onChange={(e) => setSelectedCustomer(e.target.value)}>
        <option value="">Select Customer</option>
        {customers.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <div>
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                {item.name} x {item.quantity} - ${(Number(item.price) * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <p><strong>Total: ${total.toFixed(2)}</strong></p>
          <button onClick={handlePlaceOrder}>Place Order</button>
        </div>
      )}
    </div>
  );
};

export default CreateOrder;
