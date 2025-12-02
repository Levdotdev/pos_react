import React from "react";

const Products = ({ products = [], onAdd, onEdit, onDelete }) => {
  return (
    <div id="products" className="content-section">
      <div className="toolbar">
        <button className="action-btn primary-btn" onClick={onAdd}><i className="fas fa-plus-circle"></i> Add Product</button>
        <div style={{ marginLeft: "auto" }}>
          <input placeholder="Search..." id="products-search" />
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr><th>ID</th><th>Name</th><th>Category</th><th>Unit Price (₱)</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} data-id={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>₱{p.price}</td>
                <td>
                  <button className="action-icon edit-btn" onClick={() => onEdit(p)} title="Edit Product"><i className="fas fa-pen"></i></button>
                  <button className="action-icon delete-btn" onClick={() => onDelete(p.id)} title="Delete Product"><i className="fas fa-trash"></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
