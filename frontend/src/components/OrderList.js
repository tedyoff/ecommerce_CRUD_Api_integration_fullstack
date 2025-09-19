// src/components/OrderList.js
import React, { useEffect, useState } from "react";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/orders")
      .then(res => res.json())
      .then(data => setOrders(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  if (!orders.length) return <p>No orders found.</p>;

  return (
    <div className="card p-4">
      <h3>Orders</h3>
      {orders.map(order => (
        <div key={order.id} className="border p-2 mb-2">
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Customer:</strong> {order.customer_name}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total:</strong> ${order.total}</p>
          <div>
            <strong>Items:</strong>
            <ul>
              {Array.isArray(order.items) && order.items.map(item => (
                <li key={item.id}>
                  {item.product_name} x {item.quantity} (${item.price})
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
