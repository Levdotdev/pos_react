import React, { useEffect, useState } from "react";
import ModalShell from "./_ModalShell";

export default function AddUserModal({ isOpen, onClose, onSaved = () => {} }) {
  const [form, setForm] = useState({ name: "", username: "", role: "" });
  useEffect(()=> { if (isOpen) setForm({ name: "", username: "", role: "" }); }, [isOpen]);
  function submit(e){ e.preventDefault(); onSaved(form); }
  return (
    <ModalShell id="addUserModal" title="Add New User" isOpen={isOpen} onClose={onClose} footer={<><button className="action-btn modal-cancel-btn" onClick={onClose}>Cancel</button><button className="action-btn primary-btn" onClick={() => document.getElementById("addUserForm")?.dispatchEvent(new Event("submit", { bubbles: true }))}>Save User</button></>}>
      <form id="addUserForm" onSubmit={submit}>
        <div className="form-group"><label>Name</label><div className="input-group"><i className="fas fa-user" /><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required /></div></div>
        <div className="form-group"><label>Username</label><div className="input-group"><i className="fas fa-user-tag" /><input value={form.username} onChange={e=>setForm({...form,username:e.target.value})} required /></div></div>
        <div className="form-group"><label>Role</label><div className="input-group"><i className="fas fa-user-shield" /><select value={form.role} onChange={e=>setForm({...form,role:e.target.value})}><option value="">Select Role</option><option>Admin</option><option>Cashier</option><option>Inventory Manager</option></select></div></div>
      </form>
    </ModalShell>
  );
}
