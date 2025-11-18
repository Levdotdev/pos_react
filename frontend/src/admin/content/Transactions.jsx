import React from "react";

export default function Transactions() {
  return (
    <div id="transactions" className="content-section">
      <h2>Transaction Log</h2>
      <div className="toolbar">
        <input type="date" defaultValue="2025-10-22" />
        <select><option>All Cashiers</option><option>Fyra Nika Dudas</option><option>Lance Kianne Brito</option></select>
        <button className="action-btn"><i className="fas fa-filter" /> Filter</button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead><tr><th>ID</th><th>Date/Time</th><th>Cashier</th><th>Total Amount (₱)</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            <tr><td>TRX-00101</td><td>2025-10-22 11:45 AM</td><td>Fyra Nika Dudas</td><td>3,500.00</td><td><span className="status-badge success">Completed</span></td><td><button className="action-icon view-btn"><i className="fas fa-eye" /></button><button className="action-icon refund-btn"><i className="fas fa-undo-alt" /></button></td></tr>
            <tr><td>TRX-00102</td><td>2025-10-22 10:15 AM</td><td>Lance Kianne Brito</td><td>500.00</td><td><span className="status-badge critical">Voided</span></td><td><button className="action-icon view-btn"><i className="fas fa-eye" /></button><button className="action-icon refund-btn" disabled><i className="fas fa-undo-alt" /></button></td></tr>
            <tr><td>TRX-00103</td><td>2025-10-21 04:30 PM</td><td>Dennis Silleza</td><td>15,200.00</td><td><span className="status-badge success">Completed</span></td><td><button className="action-icon view-btn"><i className="fas fa-eye" /></button><button className="action-icon refund-btn"><i className="fas fa-undo-alt" /></button></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
