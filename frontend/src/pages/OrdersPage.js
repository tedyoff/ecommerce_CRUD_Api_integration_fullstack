import React, { useEffect, useState } from "react";
import axios from "axios";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/orders")
      .then(res => setOrders(res.data || []))
      .catch(err => {
        console.error("❌ Failed to fetch orders:", err);
        setOrders([]);
      });
  }, []);

  return (
    <div>
      <h2>Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.order_id}>
                <td>{o.order_id}</td>
                <td>{o.customer_name}</td>
                <td>
                  {o.items && o.items.map((item, i) => (
                    <div key={i}>{item.name} (x{item.quantity})</div>
                  ))}
                </td>
                <td>{new Date(o.order_date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrdersPage;
