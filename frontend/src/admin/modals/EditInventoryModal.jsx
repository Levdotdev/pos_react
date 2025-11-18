import React, { useEffect, useState } from "react";
import ModalShell from "./_ModalShell";

export default function EditInventoryModal({ item, isOpen, onClose, onSaved = () => {} }) {
  const [form, setForm] = useState(item || null);
  useEffect(()=> { if (isOpen) setForm(item || { product: "", qty: 0, date: "" }); }, [isOpen, item]);
  function submit(e){ e.preventDefault(); onSaved(form); }
  return (
    <ModalShell id="editInventoryModal" title="Edit Stock" isOpen={isOpen} onClose={onClose} footer={<><button className="action-btn modal-cancel-btn" onClick={onClose}>Cancel</button><button className="action-btn primary-btn" onClick={() => document.getElementById("editInventoryForm")?.dispatchEvent(new Event("submit", { bubbles: true }))}>Save</button></>}>
      {form && <form id="editInventoryForm" onSubmit={submit}>
        <div className="form-group"><label>Product</label><div className="input-group"><i className="fas fa-box" /><input value={form.product} onChange={e=>setForm({...form,product:e.target.value})} /></div></div>
        <div className="form-group"><label>Quantity</label><div className="input-group"><i className="fas fa-sort-numeric-up" /><input type="number" value={form.qty} onChange={e=>setForm({...form,qty:e.target.value})} /></div></div>
      </form>}
    </ModalShell>
  );
}
