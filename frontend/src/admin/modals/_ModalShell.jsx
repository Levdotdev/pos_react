// src/admin/modals/_ModalShell.jsx
import React, { useEffect, useRef } from "react";

export default function ModalShell({ id, title, isOpen, onClose, children, footer }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    function onKey(e) { if (e.key === "Escape" && isOpen) onClose(); }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    function onOverlayClick(e) { if (e.target === overlayRef.current) onClose(); }
    const el = overlayRef.current;
    if (el) el.addEventListener("click", onOverlayClick);
    return () => el && el.removeEventListener("click", onOverlayClick);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div id={id} className="modal-overlay" ref={overlayRef} role="dialog" aria-modal="true" aria-labelledby={`${id}-title`}>
      <div className="modal-content">
        <div className="modal-header">
          <h2 id={`${id}-title`}>{title}</h2>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">&times;</button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}
