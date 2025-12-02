import React, { useState } from "react";

const Account = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  if (!isOpen) return null;

  const handleSave = async () => {
    try {
      const res = await fetch("https://techstore-expressnode.gamer.gd/settings", {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify({ email, currentPassword, newPassword, confirmPassword })
      });
      const json = await res.json();
      if (res.ok) {
        window.showToast("Account settings saved!", "success");
        onClose();
      } else window.showToast(json.message || "Failed to save", "error");
    } catch (e) {
      window.showToast("Network error", "error");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header"><h2>Account Settings</h2><button className="modal-close-btn" onClick={onClose}>&times;</button></div>
        <div className="modal-body">
          <form onSubmit={(e)=>{ e.preventDefault(); handleSave(); }}>
            <div className="form-group"><label>Username</label><input type="text" value="Admin" readOnly /></div>
            <div className="form-group"><label>Email</label><input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} /></div>
            <h3 className="form-divider">Change Password</h3>
            <div className="form-group"><label>Current Password</label><input type="password" value={currentPassword} onChange={(e)=>setCurrentPassword(e.target.value)} /></div>
            <div className="form-grid">
              <div className="form-group"><label>New Password</label><input type="password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} /></div>
              <div className="form-group"><label>Confirm Password</label><input type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} /></div>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button className="action-btn modal-cancel-btn" onClick={onClose}>Cancel</button>
          <button className="action-btn primary-btn" onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default Account;
