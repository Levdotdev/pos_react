import React from "react";

const Sidebar = ({ activeSection, switchSection }) => {
  return (
    <aside id="sidebar">
      <div className="logo-section">
        <div className="logo-left">
          <img src="/public/resources/logolight.jpg" alt="logo" className="logo-img light-logo" />
          <img src="/public/resources/logodark.jpg" alt="logo" className="logo-img dark-logo" />
          <span>TechStore</span>
        </div>
      </div>

      <nav className="main-menu">
        <ul>
          <li className={activeSection === "dashboard" ? "active" : ""} data-section="dashboard" onClick={() => switchSection("dashboard")}><i className="fas fa-chart-line"></i> <span>Dashboard</span></li>
          <li className={activeSection === "products" ? "active" : ""} data-section="products" onClick={() => switchSection("products")}><i className="fas fa-box-open"></i> <span>Products</span></li>
          <li className={activeSection === "inventory" ? "active" : ""} data-section="inventory" onClick={() => switchSection("inventory")}><i className="fas fa-boxes"></i> <span>Inventory</span></li>
          <li className={activeSection === "users" ? "active" : ""} data-section="users" onClick={() => switchSection("users")}><i className="fas fa-users"></i> <span>Users</span></li>
          <li className={activeSection === "transactions" ? "active" : ""} data-section="transactions" onClick={() => switchSection("transactions")}><i className="fas fa-receipt"></i> <span>Transactions</span></li>
          <li className={activeSection === "reports" ? "active" : ""} data-section="reports" onClick={() => switchSection("reports")}><i className="fas fa-file-alt"></i> <span>Reports</span></li>
          <li className={activeSection === "applicants" ? "active" : ""} data-section="applicants" onClick={() => switchSection("applicants")}><i className="fas fa-id-card"></i> <span>Applicants</span></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
