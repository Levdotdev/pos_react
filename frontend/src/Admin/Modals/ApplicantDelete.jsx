import React from "react";

const ApplicantDelete = ({ isOpen, id, onClose, onReject }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <form onSubmit={(e)=>{ e.preventDefault(); onReject(id); }}>
        <div className="modal-content">
          <div className="modal-header"><h2>Reject Applicant</h2><button type="button" className="modal-close-btn" onClick={onClose}>&times;</button></div>
          <div className="modal-body"><p style={{color:"var(--clr-danger)"}}><strong>Warning:</strong> Are you sure you want to decline access to this user?</p></div>
          <div className="modal-footer">
            <button type="button" className="action-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="action-btn delete-btn">Reject</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ApplicantDelete;
