import React, { useState, useEffect } from "react";

const CustomerList = ({ refreshTrigger }) => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/customers")
      .then((res) => res.json())
      .then((data) => {
        // Ensure the data is always an array
        if (Array.isArray(data)) {
          setCustomers(data);
        } else if (data.customers) {
          setCustomers(data.customers); // optional if backend wraps array
        } else {
          setCustomers([]); // fallback
        }
      })
      .catch((err) => {
        console.error(err);
        setCustomers([]); // fallback
      });
  }, [refreshTrigger]);

  return (
    <div>
      <h3>Customers</h3>
      {customers.length === 0 ? (
        <p>No customers yet.</p>
      ) : (
        <ul>
          {customers.map((c) => (
            <li key={c.id}>
              {c.name} - {c.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomerList;
