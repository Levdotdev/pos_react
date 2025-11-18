// src/admin/Sidebar.jsx
import React from "react";

export default function Sidebar({ active, onNavigate, collapsed, setCollapsed }) {
  const items = [
    { id: "dashboard", label: "Dashboard", icon: "fa-chart-line" },
    { id: "products", label: "Products", icon: "fa-box-open" },
    { id: "inventory", label: "Inventory", icon: "fa-boxes" },
    { id: "users", label: "Users", icon: "fa-users" },
    { id: "transactions", label: "Transactions", icon: "fa-receipt" },
    { id: "reports", label: "Reports", icon: "fa-file-alt" },
    { id: "settings", label: "System Settings", icon: "fa-cog" },
  ];

  return (
    <aside id="sidebar" className={collapsed ? "collapsed" : ""} aria-label="Sidebar">
      <div className="logo-section">
        <div className="logo-left">
          <i className="fas fa-laptop-code" aria-hidden="true" />
          <span>TechStore</span>
        </div>
      </div>

      <nav className="main-menu">
        <ul>
          {items.map(it => (
            <li
              key={it.id}
              className={active === it.id ? "active" : ""}
              data-section={it.id}
              onClick={() => onNavigate(it.id)}
              role="button"
              tabIndex={0}
            >
              <i className={`fas ${it.icon}`} /> <span>{it.label}</span>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
