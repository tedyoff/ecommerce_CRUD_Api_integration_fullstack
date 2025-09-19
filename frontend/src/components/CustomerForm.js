import React, { useState } from "react";

const CustomerForm = ({ onSuccess }) => {
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3001/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer)
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setCustomer({ name: "", email: "", password: "" });

        // Trigger refresh in parent
        if (onSuccess) onSuccess();
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to add customer. Check console for details.");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="customer-form">
      <h3>Add Customer</h3>
      <input
        name="name"
        placeholder="Name"
        value={customer.name}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={customer.email}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={customer.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Customer</button>
    </form>
  );
};

export default CustomerForm;
