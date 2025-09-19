import React, { useState, useEffect } from "react";
import axios from "axios";

function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Fetch existing customers
  const fetchCustomers = () => {
    axios.get("http://localhost:3001/customers")
      .then(res => setCustomers(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleAddCustomer = (e) => {
    e.preventDefault();
    if (!name || !email) return alert("Name and email required");

    axios.post("http://localhost:3001/add-customer", { name, email })
      .then(res => {
        alert(res.data);
        setName("");
        setEmail("");
        fetchCustomers(); // refresh list
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Add Customer</h2>
      <form onSubmit={handleAddCustomer} className="mb-4">
        <input
          type="text"
          placeholder="Name"
          className="form-control mb-2"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="form-control mb-2"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">Add Customer</button>
      </form>

      <h3>Customers List</h3>
      <ul className="list-group">
        {customers.map(c => (
          <li key={c.customer_id} className="list-group-item">
            {c.name} - {c.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomersPage;
