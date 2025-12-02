import React from "react";

const Applicants = ({ applicants = [], onVerify, onReject }) => {
  return (
    <div id="applicants" className="content-section">
      <div className="table-container">
        <table className="data-table">
          <thead><tr><th>ID</th><th>Applicant Name</th><th>Email</th><th>Date Applied</th><th>Actions</th></tr></thead>
          <tbody>
            {applicants.map(a => (
              <tr key={a.id} data-id={a.id}>
                <td>{a.id}</td>
                <td>{a.username}</td>
                <td>{a.email}</td>
                <td>{a.updated_at}</td>
                <td>
                  <button className="action-icon success-btn" onClick={() => onVerify(a.id, a.username)} title="Verify/Approve"><i className="fas fa-check"></i></button>
                  <button className="action-icon delete-btn" onClick={() => onReject(a.id)} title="Reject/Delete"><i className="fas fa-trash"></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Applicants;
