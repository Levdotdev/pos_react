// src/admin/Navbar.jsx
import React from "react";

export default function Navbar({ pageTitle, onToggleSidebar, onToggleTheme, onOpenSettings, onOpenLogout, notifications = 0 }) {
  return (
    <header id="top-navbar">
      <div className="nav-left">
        <button id="sidebar-toggle" title="Toggle Menu" onClick={onToggleSidebar}><i className="fas fa-bars" /></button>
        <span className="page-title">{pageTitle}</span>
      </div>

      <div className="nav-right nav-icons">

        <button id="theme-toggle" title="Toggle Theme" onClick={onToggleTheme}><i className="fas fa-moon" /></button>

        <div className="profile-menu" id="profile-menu">
          <div className="user-profile" id="profile-toggle" role="button" tabIndex={0}>
            <span className="user-name">Admin</span>
            <i className="fas fa-user-circle" />
            <i className="fas fa-chevron-down profile-chevron" />
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button className="action-btn" onClick={onOpenSettings}><i className="fas fa-cog" /> Account</button>
          <button className="action-btn delete-btn" onClick={onOpenLogout}><i className="fas fa-sign-out-alt" /> Logout</button>
        </div>
      </div>
    </header>
  );
}
