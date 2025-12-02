import React from "react";

const Logout = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header"><h2>Confirm Logout</h2><button className="modal-close-btn" onClick={onClose}>&times;</button></div>
        <div className="modal-body"><p>Are you sure you want to log out?</p></div>
        <div className="modal-footer">
          <button className="action-btn modal-cancel-btn" onClick={onClose}>Cancel</button>
          <button className="action-btn delete-btn" onClick={() => { window.location.href = "https://techstore-expressnode.gamer.gd/auth/logout"; }}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
