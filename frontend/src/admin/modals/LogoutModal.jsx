import React from "react";
import ModalShell from "./_ModalShell";

export default function LogoutModal({ isOpen, onClose, onConfirm = () => {} }) {
  return (
    <ModalShell id="logout-modal" title="Confirm Logout" isOpen={isOpen} onClose={onClose} footer={<><button className="action-btn modal-cancel-btn" onClick={onClose}>Cancel</button><button className="action-btn delete-btn" onClick={onConfirm}>Yes, Logout</button></>}>
      <p>Are you sure you want to log out of the TechStore Admin System?</p>
    </ModalShell>
  );
}
