import React, { useEffect, useState } from "react";
import ModalShell from "./_ModalShell";

export default function EditUserModal({ user, isOpen, onClose, onSaved = () => {} }) {
  const [form, setForm] = useState(user || null);
  useEffect(()=> { if (isOpen) setForm(user || { name: "", username: "", role: "" }); }, [isOpen, user]);
  function submit(e){ e.preventDefault(); onSaved(form); }
  return (
    <ModalShell id="editUserModal" title="Edit User" isOpen={isOpen} onClose={onClose} footer={<><button className="action-btn modal-cancel-btn" onClick={onClose}>Cancel</button><button className="action-btn primary-btn" onClick={() => document.getElementById("editUserForm")?.dispatchEvent(new Event("submit", { bubbles: true }))}>Save</button></>}>
      {form && <form id="editUserForm" onSubmit={submit}>
        <div className="form-group"><label>Name</label><div className="input-group"><i className="fas fa-user" /><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /></div></div>
        <div className="form-group"><label>Username</label><div className="input-group"><i className="fas fa-user-tag" /><input value={form.username} onChange={e=>setForm({...form,username:e.target.value})} /></div></div>
      </form>}
    </ModalShell>
  );
}
