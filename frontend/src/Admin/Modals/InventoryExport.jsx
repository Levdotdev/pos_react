import React from "react";

const InventoryExport = ({ isOpen, onClose, onExport }) => {
  if (!isOpen) return null;

  const handleExport = () => {
    onExport();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header"><h2>Download Data</h2><button className="modal-close-btn" onClick={onClose}>&times;</button></div>
        <div className="modal-body"><p>Do you want to download the current inventory list as a CSV file in your device?</p></div>
        <div className="modal-footer">
          <button className="action-btn" onClick={onClose}>Cancel</button>
          <button className="action-btn primary-btn" onClick={handleExport}>Export</button>
        </div>
      </div>
    </div>
  );
};

export default InventoryExport;
