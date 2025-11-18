import React from "react";

export default function Products({ onAdd = () => {}, onEdit = () => {} }) {
  return (
    <div id="products" className="content-section">
      <h2>Product Management</h2>
      <div className="toolbar">
        <button className="action-btn primary-btn" id="addProductBtn" onClick={onAdd}><i className="fas fa-plus-circle" /> Add Product</button>
        <button className="action-btn"><i className="fas fa-barcode" /> Print Barcode</button>
        <div className="search-box">
          <i className="fas fa-search search-icon" />
          <input type="text" placeholder="Search Products..." />
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr><th>ID</th><th>Name</th><th>Category</th><th>Stock</th><th>Unit Price (₱)</th><th>Actions</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>TS-001</td><td>Smartwatch X30</td><td>Electronics</td><td>45</td><td>8,999.00</td>
              <td>
                <button className="action-icon edit-btn" onClick={() => onEdit({ id: "TS-001", name: "Smartwatch X30" })}><i className="fas fa-pen" /></button>
                <button className="action-icon view-btn"><i className="fas fa-eye" /></button>
                <button className="action-icon delete-btn"><i className="fas fa-trash" /></button>
              </td>
            </tr>
            <tr>
              <td>TS-002</td><td>Organic Coffee Beans</td><td>Beverage</td><td>150</td><td>599.50</td>
              <td>
                <button className="action-icon edit-btn" onClick={() => onEdit({ id: "TS-002" })}><i className="fas fa-pen" /></button>
                <button className="action-icon view-btn"><i className="fas fa-eye" /></button>
                <button className="action-icon delete-btn"><i className="fas fa-trash" /></button>
              </td>
            </tr>
            <tr className="low-stock">
              <td>TS-003</td><td>Power Adapter 65W</td><td>Electronics</td><td>7</td><td>1,495.00</td>
              <td>
                <button className="action-icon edit-btn" onClick={() => onEdit({ id: "TS-003" })}><i className="fas fa-pen" /></button>
                <button className="action-icon view-btn"><i className="fas fa-eye" /></button>
                <button className="action-icon delete-btn"><i className="fas fa-trash" /></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
