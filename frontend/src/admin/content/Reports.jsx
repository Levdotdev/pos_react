import React from "react";

export default function Reports() {
  return (
    <div id="reports" className="content-section">
      <h2>Reporting & Analytics</h2>
      <div className="toolbar">
        <select><option>Sales Summary (Monthly)</option><option>Inventory Movement</option></select>
        <input type="date" defaultValue="2025-10-01" />
        <input type="date" defaultValue="2025-10-31" />
        <button className="action-btn primary-btn"><i className="fas fa-chart-bar" /> Generate Report</button>
        <button className="action-btn"><i className="fas fa-download" /> Export Data</button>
      </div>

      <div className="report-box-grid">
        <div className="report-box"><h3><i className="fas fa-coins" /> Sales Summary: October 2025</h3><p>Total Revenue: ₱ 1,850,200.00</p></div>
        <div className="report-box"><h3><i className="fas fa-truck-loading" /> Inventory Value & Status</h3><p>Total Stock Value: ₱ 5,450,000.00</p></div>
        <div className="report-box"><h3><i className="fas fa-user-tie" /> Top Cashier (Oct)</h3><p>Cashier: Fyra Nika Dudas</p></div>
      </div>

      <div className="placeholder-chart">
        <h3 style={{ fontFamily: "'Playfair Display', serif", marginTop: 3, textAlign: "center" }}>Top 5 Selling Products (Units Sold)</h3>
        <div className="table-container">
          <table className="data-table top-products-table">
            <thead><tr><th>Rank</th><th>Product Name</th><th>Units Sold</th><th>Revenue (₱)</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>Smartwatch X30</td><td>150</td><td>1,349,850.00</td></tr>
              <tr><td>2</td><td>Fast-Charging Cable (USB-C)</td><td>450</td><td>135,000.00</td></tr>
              <tr><td>3</td><td>Gaming Mouse G9</td><td>80</td><td>120,000.00</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
