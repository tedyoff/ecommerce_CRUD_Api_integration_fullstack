import React, { useState } from "react";
import ProductForm from "../components/ProductForm";
import CustomerForm from "../components/CustomerForm";
import ProductList from "../components/ProductList";
import CustomerList from "../components/CustomerList";
import Cart from "../components/Cart";
import Hero from "../components/Hero";

const ProductsPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  return (
    <>
      <Hero />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <ProductForm
              onSuccess={() => setRefreshTrigger((prev) => prev + 1)}
            />
            <CustomerForm
              onSuccess={() => setRefreshTrigger((prev) => prev + 1)}
            />
          </div>
          <div className="col-md-6">
            <ProductList refreshTrigger={refreshTrigger} />
            <CustomerList refreshTrigger={refreshTrigger} />
            <Cart />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
