import React, { useContext, useState } from "react";
import axios from "axios";
import { CartContext } from "../CartContext";

const CreateOrderPage = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [customer, setCustomer] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      // 1. Ensure customer exists or create new
      const resCustomer = await axios.post("http://localhost:3001/customers/add-customer", customer);
      const customer_id = resCustomer.data.customer_id;

      // 2. Send order
      await axios.post("http://localhost:3001/orders/create", {
        customer_id,
        items: cart
      });

      setMessage("✅ Order created successfully!");
      clearCart();
    } catch (err) {
      console.error("❌ Failed to create order:", err);
      setMessage("❌ Failed to create order");
    }
  };

  return (
    <div>
      <h2>Create Order</h2>
      <input
        type="text"
        placeholder="Name"
        className="form-control mb-2"
        value={customer.name}
        onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        className="form-control mb-2"
        value={customer.email}
        onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
      />

      <button className="btn btn-primary" onClick={handleSubmit}>
        Place Order
      </button>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default CreateOrderPage;
