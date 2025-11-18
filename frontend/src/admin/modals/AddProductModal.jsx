import React, { useEffect, useRef, useState } from "react";
import ModalShell from "./_ModalShell"; // small helper below (or inline if you prefer)

/* If you don't want separate helper file, below I included a minimal ModalShell implementation at the bottom of this message.
   Place that component in src/admin/modals/_ModalShell.jsx or paste the function into this file above. */

export default function AddProductModal({ isOpen, onClose, onSaved = () => {} }) {
  const [form, setForm] = useState({ product_name: "", category: "", unit_price: "", product_id: "" });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => { if (isOpen) { setForm({ product_name: "", category: "", unit_price: "", product_id: "" }); setAlert(null);} }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.product_name || !form.category || !form.unit_price || Number(form.unit_price) <= 0) {
      setAlert({ type: "error", text: "Please ensure all required fields are filled correctly." });
      return;
    }
    setLoading(true);
    setTimeout(()=> {
      setLoading(false);
      setAlert({ type: "success", text: `Product ${form.product_name} saved.` });
      onSaved(form);
    }, 900);
  }

  return (
    <ModalShell id="addProductModal" title="Add New Product" isOpen={isOpen} onClose={onClose} footer={
      <>
        <button className="action-btn modal-cancel-btn" onClick={onClose}>Cancel</button>
        <button className="action-btn primary-btn" onClick={() => document.getElementById("addProductForm")?.dispatchEvent(new Event("submit", { bubbles: true }))}>{loading ? "Saving..." : "Save Product"}</button>
      </>
    }>
      <div id="modal-alert-container">{alert && <div className={`modal-alert ${alert.type}`}>{alert.text}</div>}</div>
      <form id="addProductForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name</label>
          <div className="input-group"><i className="fas fa-tag" /><input value={form.product_name} onChange={e=>setForm({...form,product_name:e.target.value})} required /></div>
        </div>
        <div className="form-group">
          <label>Category</label>
          <div className="input-group"><i className="fas fa-layer-group" /><select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} required><option value="">Select</option><option>Keyboard</option><option>Mouse</option></select></div>
        </div>
        <div className="form-group">
          <label>Unit Price</label>
          <div className="input-group"><i className="fas fa-peso-sign" /><input type="number" step="0.01" value={form.unit_price} onChange={e=>setForm({...form,unit_price:e.target.value})} required /></div>
        </div>
        <div className="form-group">
          <label>Barcode / SKU (optional)</label>
          <div className="input-group"><i className="fas fa-barcode" /><input value={form.product_id} onChange={e=>setForm({...form,product_id:e.target.value})} /></div>
        </div>
      </form>
    </ModalShell>
  );
}
