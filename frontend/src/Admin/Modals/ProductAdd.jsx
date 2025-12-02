import React, { useState } from "react";

const ProductAdd = ({ isOpen, onClose, onSave }) => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [productId, setProductId] = useState("");

  if (!isOpen) return null;

  const submit = () => {
    if (!productName || !category || !unitPrice || !productId) return window.showToast("Please fill all fields", "error");
    onSave({ name: productName, category, price: Number(unitPrice), id: productId });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header"><h2>Add New Product</h2><button className="modal-close-btn" onClick={onClose}>&times;</button></div>
        <div className="modal-body">
          <div className="form-group"><label>Product Name</label><input value={productName} onChange={e=>setProductName(e.target.value)} /></div>
          <div className="form-grid">
            <div className="form-group"><label>Category</label>
              <select value={category} onChange={e=>setCategory(e.target.value)}>
                <option value="">Select category</option>
                <option>Electronics</option><option>Keyboard</option><option>Mouse</option><option>Controller</option><option>Speaker</option><option>Headset</option><option>Microphone</option><option>Webcam</option><option>Accessories</option>
              </select>
            </div>
            <div className="form-group"><label>Unit Price (₱)</label><input type="number" value={unitPrice} min={50} onChange={e=>setUnitPrice(e.target.value)} /></div>
          </div>
          <div className="form-group"><label>Barcode</label><input value={productId} onChange={e=>setProductId(e.target.value)} /></div>
        </div>
        <div className="modal-footer">
          <button className="action-btn" onClick={onClose}>Cancel</button>
          <button className="action-btn primary-btn" onClick={submit}>Save Product</button>
        </div>
      </div>
    </div>
  );
};

export default ProductAdd;
