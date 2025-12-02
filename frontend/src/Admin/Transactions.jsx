import React from "react";

const Transactions = ({ transactions = [], onOpenReceipt, users = [] }) => {
  return (
    <div id="transactions" className="content-section">
      <div className="toolbar">
        <select id="transactions-filter">
          <option value="">All Cashiers</option>
          {users.map(u => <option key={u.id} value={u.username}>{u.username}</option>)}
        </select>
        <button className="action-btn"><i className="fas fa-filter"></i> Filter</button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead><tr><th>ID</th><th>Timestamp</th><th>Cashier</th><th>Total (₱)</th><th>Actions</th></tr></thead>
          <tbody>
            {transactions.map(t => (
              <tr key={t.id} data-id={t.id}>
                <td>{t.id}</td>
                <td>{t.date}</td>
                <td>{t.cashier}</td>
                <td>{t.total}</td>
                <td><button className="action-icon edit-btn" onClick={() => onOpenReceipt(t.receipt)} title="Receipt"><i className="fas fa-receipt"></i></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
