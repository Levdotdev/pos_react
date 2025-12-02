import React from "react";

const Report = ({ isOpen, onClose, generatePDFReport }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header"><h2>Generate PDF Report</h2><button className="modal-close-btn" onClick={onClose}>&times;</button></div>
        <div className="modal-body"><p>Do you want to generate the PDF report for this month?</p></div>
        <div className="modal-footer">
          <button className="action-btn" onClick={onClose}>Cancel</button>
          <button className="action-btn primary-btn" onClick={generatePDFReport}>Generate</button>
        </div>
      </div>
    </div>
  );
};

export default Report;
