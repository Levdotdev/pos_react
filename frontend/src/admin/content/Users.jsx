import React from "react";

export default function Users({ onAdd = () => {}, onEdit = () => {} }) {
  return (
    <div id="users" className="content-section">
      <h2>User Management</h2>
      <div className="toolbar">
        <button className="action-btn primary-btn" onClick={onAdd}><i className="fas fa-user-plus" /> Add New User</button>
        <div className="search-box"><i className="fas fa-search search-icon" /><input type="text" placeholder="Search Users..." /></div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead><tr><th>Name</th><th>Username</th><th>Role</th><th>Last Login</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            <tr><td>Lance Kianne Brito</td><td>lance.ad</td><td>Admin</td><td>2025-10-22 10:00 AM</td><td><span className="status-badge success">Active</span></td><td><button className="action-icon edit-btn" onClick={()=>onEdit({username:"lance.ad"})}><i className="fas fa-user-cog" /></button><button className="action-icon delete-btn"><i className="fas fa-user-slash" /></button></td></tr>
            <tr><td>Fyra Nika Dudas</td><td>fyra.cs</td><td>Cashier</td><td>2025-10-22 11:30 AM</td><td><span className="status-badge success">Active</span></td><td><button className="action-icon edit-btn" onClick={()=>onEdit({username:"fyra.cs"})}><i className="fas fa-user-cog" /></button><button className="action-icon delete-btn"><i className="fas fa-user-slash" /></button></td></tr>
            <tr><td>Dennis Silleza</td><td>dennis.inv</td><td>Inventory Manager</td><td>2025-10-18 02:45 PM</td><td><span className="status-badge inactive">Inactive</span></td><td><button className="action-icon edit-btn" onClick={()=>onEdit({username:"dennis.inv"})}><i className="fas fa-user-cog" /></button><button className="action-icon delete-btn"><i className="fas fa-user-slash" /></button></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
