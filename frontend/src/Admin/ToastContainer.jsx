import React, { useEffect, useState } from "react";

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    window.showToast = (message, type = "success") => {
      const id = Date.now() + Math.random();
      setToasts(prev => [...prev, { id, message, type }]);
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
    };
  }, []);

  return (
    <div id="toast-container" style={{ position: "fixed", top: 20, right: 20, zIndex: 9999 }}>
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type}`} style={{ marginBottom: 8, padding: "10px 14px", borderRadius: 6, background: t.type === "success" ? "#16a34a" : (t.type === "error" ? "#dc2626" : "#2563eb"), color: "#fff" }}>
          {t.message}
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
