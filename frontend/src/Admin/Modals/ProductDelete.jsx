import React from "react";

const ProductDelete = ({ isOpen, id, onClose, onDelete }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header"><h2>Delete Product</h2><button className="modal-close-btn" onClick={onClose}>&times;</button></div>
        <div className="modal-body"><p style={{color:"var(--clr-danger)"}}><strong>Warning:</strong> Are you sure you want to delete this product?</p></div>
        <div className="modal-footer">
          <button className="action-btn" onClick={onClose}>Cancel</button>
          <button className="action-btn delete-btn" onClick={() => onDelete(id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDelete;
