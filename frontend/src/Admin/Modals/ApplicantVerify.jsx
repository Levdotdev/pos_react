import React from "react";

const ApplicantVerify = ({ isOpen, id, name, onClose, onApprove }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <form onSubmit={(e)=>{e.preventDefault(); onApprove(id);}}>
        <div className="modal-content">
          <div className="modal-header"><h2>Verify Applicant</h2><button type="button" className="modal-close-btn" onClick={onClose}>&times;</button></div>
          <div className="modal-body"><p id="verify-message">Approve <strong>{name}</strong> as a new employee? This will move them to the Users list.</p></div>
          <div className="modal-footer">
            <button type="button" className="action-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="action-btn primary-btn" style={{backgroundColor:"var(--clr-success)", borderColor:"var(--clr-success)"}}>Approve</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ApplicantVerify;
