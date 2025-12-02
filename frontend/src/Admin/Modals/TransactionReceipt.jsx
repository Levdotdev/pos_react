import React from "react";
import { jsPDF } from "jspdf";

const TransactionReceipt = ({ isOpen, src, onClose }) => {
  if (!isOpen) return null;

  const downloadAsPDF = async () => {
    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = src;
      img.onload = () => {
        const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: [img.width, img.height] });
        pdf.addImage(img, "PNG", 0, 0, img.width, img.height);
        const filename = src.split('/').pop().replace(/\.[^/.]+$/, ".pdf");
        pdf.save(filename);
      };
      img.onerror = () => window.showToast("Failed to load receipt image", "error");
    } catch (e) {
      window.showToast("Error generating PDF", "error");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header"><h2>Transaction Details</h2><button className="modal-close-btn" onClick={onClose}>&times;</button></div>
        <div className="modal-body"><img id="receipt-img" src={src} alt="Receipt" style={{ maxWidth: "100%", height: "auto" }} /></div>
        <div className="modal-footer">
          <button className="action-btn" onClick={onClose}>Close</button>
          <button className="action-btn primary-btn" onClick={downloadAsPDF}><i className="fas fa-print"></i> Print</button>
        </div>
      </div>
    </div>
  );
};

export default TransactionReceipt;
