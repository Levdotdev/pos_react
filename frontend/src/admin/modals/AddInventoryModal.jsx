import React, { useEffect, useState } from "react";
import ModalShell from "./_ModalShell";

export default function AddInventoryModal({ isOpen, onClose, onSaved = () => {} }) {
  const [form, setForm] = useState({ product: "", qty: 0, date: "" });
  useEffect(()=> { if (isOpen) setForm({ product: "", qty: 0, date: "" }); }, [isOpen]);
  function submit(e){ e.preventDefault(); onSaved(form); }

  return (
    <ModalShell id="addInventoryModal" title="Record New Stock" isOpen={isOpen} onClose={onClose} footer={<><button className="action-btn modal-cancel-btn" onClick={onClose}>Cancel</button><button className="action-btn primary-btn" onClick={() => document.getElementById("addInventoryForm")?.dispatchEvent(new Event("submit", { bubbles: true }))}>Save</button></>}>
      <form id="addInventoryForm" onSubmit={submit}>
        <div className="form-group"><label>Product</label><div className="input-group"><i className="fas fa-box" /><input value={form.product} onChange={e=>setForm({...form,product:e.target.value})} /></div></div>
        <div className="form-group"><label>Quantity</label><div className="input-group"><i className="fas fa-sort-numeric-up" /><input type="number" value={form.qty} onChange={e=>setForm({...form,qty:e.target.value})} /></div></div>
        <div className="form-group"><label>Date</label><div className="input-group"><i className="fas fa-calendar" /><input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} /></div></div>
      </form>
    </ModalShell>
  );
}
