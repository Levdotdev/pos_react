// src/pages/Admin.jsx
import React, { useState } from "react";
import "../assets/css/home.css";

/* Layout pieces (imported from src/admin/) */
import Sidebar from "../admin/Sidebar";
import Navbar from "../admin/Navbar";

/* Content pages (imported from src/admin/content/) */
import Dashboard from "../admin/content/Dashboard";
import Products from "../admin/content/Products";
import Inventory from "../admin/content/Inventory";
import Users from "../admin/content/Users";
import Transactions from "../admin/content/Transactions";
import Reports from "../admin/content/Reports";
import Settings from "../admin/content/Settings";

/* Modals (imported from src/admin/modals/) */
import AddProductModal from "../admin/modals/AddProductModal";
import EditProductModal from "../admin/modals/EditProductModal";
import AddUserModal from "../admin/modals/AddUserModal";
import EditUserModal from "../admin/modals/EditUserModal";
import AddInventoryModal from "../admin/modals/AddInventoryModal";
import EditInventoryModal from "../admin/modals/EditInventoryModal";
import SettingsModal from "../admin/modals/SettingsModal";
import LogoutModal from "../admin/modals/LogoutModal";

export default function Admin() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light-mode");

  const [modals, setModals] = useState({
    addProduct: false,
    editProduct: null,   // pass product object or id
    addUser: false,
    editUser: null,
    addInventory: false,
    editInventory: null,
    settings: false,
    logout: false,
  });

  function openModal(key, payload = true) {
    setModals(m => ({ ...m, [key]: payload }));
  }
  function closeModal(key) {
    setModals(m => ({ ...m, [key]: key.startsWith("edit") ? null : false }));
  }

  function handleToggleTheme() {
    const next = theme === "light-mode" ? "dark-mode" : "light-mode";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.body.classList.remove("light-mode", "dark-mode");
    document.body.classList.add(next);
  }

  // simple dispatcher to open sections
  function navigateTo(section) {
    setActiveSection(section);
    if (window.innerWidth <= 768) setSidebarCollapsed(true);
  }

  return (
    <div className={`admin-root ${theme}`}>
      <Sidebar
        active={activeSection}
        onNavigate={navigateTo}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <main id="main-content">
        <Navbar
          pageTitle={{
            dashboard: "Dashboard Overview",
            products: "Product Management",
            inventory: "Inventory Management",
            users: "User Management",
            transactions: "Transaction Log",
            reports: "Reporting & Analytics",
            settings: "System Settings",
          }[activeSection]}
          onToggleSidebar={() => setSidebarCollapsed(c => !c)}
          onToggleTheme={handleToggleTheme}
          onOpenSettings={() => openModal("settings")}
          onOpenLogout={() => openModal("logout")}
        />

        <section id="content-area">
          {activeSection === "dashboard" && <Dashboard />}
          {activeSection === "products" && (
            <Products
              onAdd={() => openModal("addProduct")}
              onEdit={(product) => openModal("editProduct", product)}
            />
          )}
          {activeSection === "inventory" && (
            <Inventory
              onAdd={() => openModal("addInventory")}
              onEdit={(item) => openModal("editInventory", item)}
            />
          )}
          {activeSection === "users" && (
            <Users
              onAdd={() => openModal("addUser")}
              onEdit={(user) => openModal("editUser", user)}
            />
          )}
          {activeSection === "transactions" && <Transactions />}
          {activeSection === "reports" && <Reports />}
          {activeSection === "settings" && <Settings />}
        </section>
      </main>

      {/* Modals */}
      <AddProductModal isOpen={!!modals.addProduct} onClose={() => closeModal("addProduct")} onSaved={(p)=>{ console.log("saved", p); closeModal("addProduct"); }} />
      <EditProductModal product={modals.editProduct} isOpen={!!modals.editProduct} onClose={() => closeModal("editProduct")} onSaved={(p)=>{ console.log("edited", p); closeModal("editProduct"); }} />

      <AddUserModal isOpen={!!modals.addUser} onClose={() => closeModal("addUser")} onSaved={(u)=>{ console.log("user added", u); closeModal("addUser"); }} />
      <EditUserModal user={modals.editUser} isOpen={!!modals.editUser} onClose={() => closeModal("editUser")} onSaved={(u)=>{ console.log("user edited", u); closeModal("editUser"); }} />

      <AddInventoryModal isOpen={!!modals.addInventory} onClose={() => closeModal("addInventory")} onSaved={(i)=>{ console.log("inventory added", i); closeModal("addInventory"); }} />
      <EditInventoryModal item={modals.editInventory} isOpen={!!modals.editInventory} onClose={() => closeModal("editInventory")} onSaved={(i)=>{ console.log("inventory edited", i); closeModal("editInventory"); }} />

      <SettingsModal isOpen={!!modals.settings} onClose={() => closeModal("settings")} onSave={(s)=>{ console.log("settings saved", s); closeModal("settings"); }} />
      <LogoutModal isOpen={!!modals.logout} onClose={() => closeModal("logout")} onConfirm={() => { closeModal("logout"); alert("Logged out (placeholder)"); }} />
    </div>
  );
}
