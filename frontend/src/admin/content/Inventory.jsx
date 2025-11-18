import React from "react";

export default function Inventory({ onAdd = () => {}, onEdit = () => {} }) {
  return (
    <div id="inventory" className="content-section">
      <h2>Inventory Management</h2>
      <div className="toolbar">
        <button className="action-btn primary-btn" onClick={onAdd}><i className="fas fa-truck-loading" /> Record New Stock</button>
        <button className="action-btn"><i className="fas fa-upload" /> Import (CSV)</button>
        <button className="action-btn"><i className="fas fa-download" /> Export Data</button>
        <div className="search-box">
          <i className="fas fa-filter search-icon" />
          <input type="text" placeholder="Filter by Stock Status..." />
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead><tr><th>Product Name</th><th>Current Stock</th><th>Last Restock</th><th>Threshold</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            <tr><td>Smartwatch X30</td><td>45</td><td>2025-10-15</td><td>20</td><td><span className="status-badge success">In Stock</span></td><td><button className="action-icon view-btn" onClick={()=>onEdit({name:"Smartwatch X30"})}><i className="fas fa-history" /></button></td></tr>
            <tr><td>Gaming Mouse G9</td><td>15</td><td>2025-10-20</td><td>10</td><td><span className="status-badge warning">Low Stock</span></td><td><button className="action-icon view-btn" onClick={()=>onEdit({name:"Gaming Mouse G9"})}><i className="fas fa-history" /></button></td></tr>
            <tr className="low-stock"><td>Power Adapter 65W</td><td>7</td><td>2025-09-01</td><td>10</td><td><span className="status-badge critical">Critical!</span></td><td><button className="action-icon view-btn" onClick={()=>onEdit({name:"Power Adapter 65W"})}><i className="fas fa-history" /></button></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
