import React, { useContext } from "react";
import { CartContext } from "../CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    const customer_id = prompt("Enter Customer ID to place order:");
    if (!customer_id) return alert("Customer ID required");

    const items = cart.map(item => ({
      product_id: item.product_id,
      quantity: item.quantity
    }));

    axios.post("http://localhost:3001/create-order", { customer_id, items })
      .then(res => {
        alert(res.data);
        clearCart();
        navigate("/orders");
      })
      .catch(err => console.error(err));
  };

  if (cart.length === 0) return <p>Your cart is empty.</p>;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h2 className="mb-4">Shopping Cart</h2>
      <ul className="list-group mb-3">
        {cart.map(item => (
          <li key={item.product_id} className="list-group-item d-flex justify-content-between align-items-center">
            {item.name} (x{item.quantity}) - ${item.price * item.quantity}
            <button className="btn btn-sm btn-danger" onClick={() => removeFromCart(item.product_id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h5>Total: ${total.toFixed(2)}</h5>
      <button className="btn btn-success mt-3" onClick={handleCheckout}>Checkout</button>
    </div>
  );
}

export default CartPage;
