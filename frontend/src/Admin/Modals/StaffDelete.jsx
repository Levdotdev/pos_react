import React from "react";

const StaffDelete = ({ isOpen, id, onClose, onConfirm }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <form onSubmit={(e)=>{e.preventDefault(); onConfirm(id);}}>
        <div className="modal-content">
          <div className="modal-header"><h2>Deactivate Account</h2><button type="button" className="modal-close-btn" onClick={onClose}>&times;</button></div>
          <div className="modal-body"><p style={{color:"var(--clr-danger)"}}><strong>Warning:</strong> Are you sure you want to remove access for this user?</p></div>
          <div className="modal-footer">
            <button type="button" className="action-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="action-btn delete-btn">Deactivate</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StaffDelete;
