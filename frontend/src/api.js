import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001", // backend
});

// PRODUCTS
export const fetchProducts = () => API.get("/products");
export const addProduct = (product) => API.post("/products", product);

// CART
export const fetchCart = () => API.get("/cart");
export const addToCart = (productId, quantity) =>
  API.post("/cart", { productId, quantity });
export const removeFromCart = (id) => API.delete(`/cart/${id}`);

// ORDERS
export const createOrder = (orderData) => API.post("/orders", orderData);
export const fetchOrders = () => API.get("/orders");
