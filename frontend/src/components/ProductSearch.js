import React from "react";

const ProductSearch = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <style jsx>{`
        .search-bar {
          margin-bottom: 20px;
          text-align: center;
        }
        input {
          width: 60%;
          padding: 8px 12px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }
        input:focus {
          outline: none;
          border-color: #222;
        }
      `}</style>
    </div>
  );
};

export default ProductSearch;
