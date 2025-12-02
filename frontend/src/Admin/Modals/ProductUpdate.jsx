import React, { useEffect, useState } from "react";

const ProductUpdate = ({ isOpen, data, onClose, onSave }) => {
  const [form, setForm] = useState({ id: "", name: "", category: "", price: "", product_id: "" });

  useEffect(() => {
    if (data) setForm({ id: data.id, name: data.name, category: data.category, price: data.price, product_id: data.id });
  }, [data]);

  if (!isOpen) return null;

  const submit = () => {
    if (!form.name || !form.category || !form.price) return window.showToast("Fill required fields", "error");
    onSave(form.id, { product_name: form.name, category: form.category, unit_price: Number(form.price), product_id: form.product_id });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header"><h2>Edit Product</h2><button className="modal-close-btn" onClick={onClose}>&times;</button></div>
        <div className="modal-body">
          <div className="form-group"><label>Product Name</label><input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} /></div>
          <div className="form-grid">
            <div className="form-group"><label>Category</label>
              <select value={form.category} onChange={e=>setForm({...form, category:e.target.value})}>
                <option value="">Select category</option>
                <option>Electronics</option><option>Keyboard</option><option>Mouse</option><option>Controller</option><option>Speaker</option><option>Headset</option><option>Microphone</option><option>Webcam</option><option>Accessories</option>
              </select>
            </div>
            <div className="form-group"><label>Unit Price (₱)</label><input type="number" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} /></div>
          </div>
          <div className="form-group"><label>Barcode</label><input value={form.product_id} onChange={e=>setForm({...form, product_id: e.target.value})} /></div>
        </div>
        <div className="modal-footer">
          <button className="action-btn" onClick={onClose}>Cancel</button>
          <button className="action-btn primary-btn" onClick={submit}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
