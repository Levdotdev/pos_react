import React from "react";

const Users = ({ users = [], onDeactivate }) => {
  return (
    <div id="users" className="content-section">
      <div className="table-container">
        <table className="data-table">
          <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Verified At</th><th>Actions</th></tr></thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} data-id={u.id}>
                <td>{u.id}</td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.updated_at}</td>
                <td><button className="action-icon delete-btn" onClick={() => onDeactivate(u.id)} title="Deactivate/Delete"><i className="fas fa-trash"></i></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
