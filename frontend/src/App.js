import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./CartContext";
import NavMenu from "./components/NavMenu";
import HeroBanner from "./components/HeroBanner";
import ProductList from "./components/ProductList";
import CreateOrder from "./components/CreateOrder";

function App() {
  return (
    <CartProvider>
      <Router>
        <NavMenu />
        <HeroBanner />

        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/create-order" element={<CreateOrder />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
