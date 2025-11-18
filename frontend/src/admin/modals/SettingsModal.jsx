import React, { useEffect, useState } from "react";
import ModalShell from "./_ModalShell";

export default function SettingsModal({ isOpen, onClose, onSave = () => {} }) {
  const [form, setForm] = useState({ username: "Admin", email: "admin@techstore.com", newPassword: "", confirmPassword: "" });
  useEffect(()=>{ if (isOpen) setForm({ username: "Admin", email: "admin@techstore.com", newPassword: "", confirmPassword: "" }); }, [isOpen]);
  function save(){ if (form.newPassword && form.newPassword !== form.confirmPassword) { alert("Passwords do not match"); return; } onSave(form); }

  return (
    <ModalShell id="settings-modal" title="Account Settings" isOpen={isOpen} onClose={onClose} footer={<><button className="action-btn modal-cancel-btn" onClick={onClose}>Cancel</button><button className="action-btn primary-btn" onClick={save}>Save Changes</button></>}>
      <form>
        <div className="form-group"><label>Username</label><div className="input-group"><i className="fas fa-user" /><input value={form.username} readOnly /></div></div>
        <div className="form-group"><label>Email</label><div className="input-group"><i className="fas fa-envelope" /><input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} /></div></div>
        <h3 className="form-divider">Change Password</h3>
        <div className="form-group"><label>New Password</label><div className="input-group"><i className="fas fa-lock" /><input type="password" value={form.newPassword} onChange={e=>setForm({...form,newPassword:e.target.value})} /></div></div>
        <div className="form-group"><label>Confirm New Password</label><div className="input-group"><i className="fas fa-lock" /><input type="password" value={form.confirmPassword} onChange={e=>setForm({...form,confirmPassword:e.target.value})} /></div></div>
      </form>
    </ModalShell>
  );
}
