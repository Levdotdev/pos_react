import React from "react";

const Reports = ({ data = {}, onGenerate }) => {
  return (
    <div id="reports" className="content-section">
      <div className="toolbar">
        <button className="action-btn primary-btn" onClick={onGenerate}><i className="fas fa-chart-bar"></i> Generate Report</button>
      </div>

      <div className="report-box-grid">
        <div className="report-box">
          <h3><i className="fas fa-coins"></i> Sales Summary: {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
          <p>Total Sales: ₱ {data.sales?.total ?? 0}</p>
          <p>Total Transactions: {data.transacts?.total ?? 0}</p>
          <p>Products Sold: {data.sold?.sold ?? 0}</p>
        </div>

        <div className="report-box">
          <h3><i className="fas fa-user-tie"></i> Top Cashier ({new Date().toLocaleString('default', { month: 'short' })})</h3>
          <p>Cashier: {data.top_cashier?.cashier ?? "-"}</p>
          <p>Total Transactions: {data.top_cashier?.total_transactions ?? 0}</p>
          <p>Total Sales Handled: ₱ {Number(data.top_cashier?.total_sales || 0).toFixed(2)}</p>
        </div>
      </div>

      <div className="placeholder-chart">
        <h3>Top 5 Selling Products (Units Sold)</h3>
        <div className="table-container">
          <table className="data-table top-products-table">
            <thead><tr><th>Rank</th><th>Product Name</th><th>Units Sold</th><th>Sales (₱)</th></tr></thead>
            <tbody>
              {(data.top_products || []).map((p, idx) => (
                <tr key={p.id || idx}>
                  <td>{idx+1}</td>
                  <td>{p.name}</td>
                  <td>{p.units_sold}</td>
                  <td>{Number(p.revenue).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
