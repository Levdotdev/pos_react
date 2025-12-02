import React from "react";

const Inventory = ({ inventory = [], onImport, onExport, onRecordStock }) => {
  return (
    <div id="inventory" className="content-section">
      <div className="toolbar">
        <button className="action-btn primary-btn" onClick={() => onRecordStock(null)}><i className="fas fa-truck-loading"></i> Record New Stock</button>
        <button className="action-btn" onClick={onImport}><i className="fas fa-upload"></i> CSV Entry</button>
        <button className="action-btn" onClick={onExport}><i className="fas fa-download"></i> Download Data</button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr><th>ID</th><th>Product Name</th><th>Current Stock</th><th>Last Restock</th><th>Status</th></tr>
          </thead>
          <tbody>
            {inventory.map(i => (
              <tr key={i.id} data-id={i.id}>
                <td>{i.id}</td>
                <td>{i.name}</td>
                <td>{i.stock}</td>
                <td>{i.last_restock}</td>
                <td>{i.stock === 0 ? <span className="status-badge critical">Out of Stock</span> : (i.stock <= 4 ? <span className="status-badge warning">Low Stock</span> : <span className="status-badge success">In Stock</span>)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
