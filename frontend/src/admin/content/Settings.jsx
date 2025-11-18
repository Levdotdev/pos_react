import React from "react";

export default function Settings() {
  return (
    <div id="settings" className="content-section">
      <h2>System Settings</h2>
      <div className="settings-grid">
        <div className="setting-card"><h3><i className="fas fa-store" /> Store Information</h3><p>Name: <strong>TechStore PH</strong></p></div>
        <div className="setting-card"><h3><i className="fas fa-tags" /> Tax & Discounts</h3><p>Tax Rate (VAT): <strong>12.00%</strong></p></div>
        <div className="setting-card"><h3><i className="fas fa-database" /> Database Management</h3><p>Last Backup: <strong>2025-10-22 01:00 AM</strong></p></div>
      </div>
    </div>
  );
}
