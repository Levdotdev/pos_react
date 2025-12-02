import React, { useState, useEffect } from "react";
import Sidebar from "../Admin/Sidebar";
import ToastContainer from "../Admin/ToastContainer";
import Dashboard from "../Admin/Dashboard";
import Products from "../Admin/Products";
import Inventory from "../Admin/Inventory";
import Users from "../Admin/Users";
import Transactions from "../Admin/Transactions";
import Reports from "../Admin/Reports";
import Applicants from "../Admin/Applicants";

import Account from "../Admin/Modals/Account";
import Logout from "../Admin/Modals/Logout";
import ProductAdd from "../Admin/Modals/ProductAdd";
import ProductUpdate from "../Admin/Modals/ProductUpdate";
import ProductDelete from "../Admin/Modals/ProductDelete";
import ApplicantVerify from "../Admin/Modals/ApplicantVerify";
import ApplicantDelete from "../Admin/Modals/ApplicantDelete";
import InventoryImport from "../Admin/Modals/InventoryImport";
import InventoryExport from "../Admin/Modals/InventoryExport";
import InventoryUpdate from "../Admin/Modals/InventoryUpdate";
import StaffDelete from "../Admin/Modals/StaffDelete";
import TransactionReceipt from "../Admin/Modals/TransactionReceipt";
import Report from "../Admin/Modals/Report";

const Admin = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [theme, setTheme] = useState("light-mode");

  const [data, setData] = useState({
    sales: { total: 0 },
    sold: { sold: 0 },
    low_stock: { total: 0 },
    top_cashier: { cashier: "", total_transactions: 0, total_sales: 0 },
    top_products: [],
    cashier_sales: []
  });
  const [products, setProducts] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [applicants, setApplicants] = useState([]);


  const [AdminModalState, setAdminModalState] = useState({
    account: false,
    logout: false,
    productAdd: false,
    productUpdate: { open: false, data: null },
    productDelete: { open: false, id: null },
    applicantVerify: { open: false, id: null, name: null },
    applicantDelete: { open: false, id: null },
    inventoryImport: false,
    inventoryExport: false,
    inventoryUpdate: { open: false, id: null },
    staffDelete: { open: false, id: null },
    transactionReceipt: { open: false, src: "" },
    report: false
  });

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    fetchInitialData();
    window.generatePDFReport = handleGeneratePDFReport;
  }, []);

  const fetchInitialData = async () => {
    try {
      const base = "https://techstore-expressnode.gamer.gd";
      const [dRes, pRes, iRes, uRes, tRes, aRes] = await Promise.all([
        fetch(`${base}/admin/dashboard-data`).then(r => r.json()).catch(()=>({})),
        fetch(`${base}/product/list`).then(r => r.json()).catch(()=>[]),
        fetch(`${base}/inventory/list`).then(r => r.json()).catch(()=>[]),
        fetch(`${base}/staff/list`).then(r => r.json()).catch(()=>[]),
        fetch(`${base}/transaction/list`).then(r => r.json()).catch(()=>[]),
        fetch(`${base}/applicant/list`).then(r => r.json()).catch(()=>[])
      ]);
      if (dRes) setData(prev => ({ ...prev, ...dRes }));
      if (Array.isArray(pRes)) setProducts(pRes);
      if (Array.isArray(iRes)) setInventory(iRes);
      if (Array.isArray(uRes)) setUsers(uRes);
      if (Array.isArray(tRes)) setTransactions(tRes);
      if (Array.isArray(aRes)) setApplicants(aRes);

    } catch (err) {
      window.showToast("Failed to fetch initial data", "error");
    }
  };

  const toggleTheme = () => setTheme(prev => (prev === "light-mode" ? "dark-mode" : "light-mode"));

  const switchSection = (section) => setActiveSection(section);

  const openAddProduct = () => setAdminModalState(s => ({ ...s, productAdd: true }));
  const openEditProduct = (p) => setAdminModalState(s => ({ ...s, productUpdate: { open: true, data: p } }));
  const openDeleteProduct = (id) => setAdminModalState(s => ({ ...s, productDelete: { open: true, id } }));

  const handleAddProduct = async (formData) => {
    try {
      const base = "https://techstore-expressnode.gamer.gd";
      const res = await fetch(`${base}/product/add`, {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify(formData)
      });
      const json = await res.json();
      if (res.ok) {
        setProducts(prev => [json, ...prev]);
        window.showToast("Product added", "success");
        setAdminModalState(s => ({ ...s, productAdd: false }));
      } else {
        window.showToast(json.message || "Failed to add product", "error");
      }
    } catch (e) {
      window.showToast("Network error while adding product", "error");
    }
  };

  const handleUpdateProduct = async (id, payload) => {
    try {
      const base = "https://techstore-expressnode.gamer.gd";
      const res = await fetch(`${base}/product/update`, {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify({ id, ...payload })
      });
      const json = await res.json();
      if (res.ok) {
        setProducts(prev => prev.map(p => (p.id === id ? json : p)));
        window.showToast("Product updated", "success");
        setAdminModalState(s => ({ ...s, productUpdate: { open: false, data: null } }));
      } else {
        window.showToast(json.message || "Failed to update", "error");
      }
    } catch (e) {
      window.showToast("Network error while updating product", "error");
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const base = "https://techstore-expressnode.gamer.gd";
      const res = await fetch(`${base}/product/delete/${id}`, { method: "POST" });
      if (res.ok) {
        setProducts(prev => prev.filter(p => p.id !== id));
        window.showToast("Product deleted", "success");
        setAdminModalState(s => ({ ...s, productDelete: { open: false, id: null } }));
      } else {
        const json = await res.json();
        window.showToast(json.message || "Failed to delete", "error");
      }
    } catch (e) {
      window.showToast("Network error while deleting product", "error");
    }
  };

  const openInventoryUpdate = (id) => setAdminModalState(s => ({ ...s, inventoryUpdate: { open: true, id } }));
  const handleInventoryUpdate = async (payload) => {
    try {
      const base = "https://techstore-expressnode.gamer.gd";
      const res = await fetch(`${base}/inventory/update-stock`, {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (res.ok) {
        await fetchInitialData();
        window.showToast("Inventory updated", "success");
        setAdminModalState(s => ({ ...s, inventoryUpdate: { open: false, id: null } }));
      } else window.showToast(json.message || "Failed to update inventory", "error");
    } catch (e) {
      window.showToast("Network error updating inventory", "error");
    }
  };

  const handleInventoryImport = async (file) => {
    try {
      const base = "https://techstore-expressnode.gamer.gd";
      const form = new FormData();
      form.append("csv_file", file);
      const res = await fetch(`${base}/inventory/update-csv`, { method: "POST", body: form });
      const json = await res.json();
      if (res.ok) {
        await fetchInitialData();
        window.showToast("CSV imported", "success");
        setAdminModalState(s => ({ ...s, inventoryImport: false }));
      } else window.showToast(json.message || "Failed to import CSV", "error");
    } catch (e) {
      window.showToast("Network error while importing CSV", "error");
    }
  };

  const handleInventoryExport = async () => {
    try {
      if (!inventory || !inventory.length) return window.showToast("No inventory to export", "error");
      const headers = Object.keys(inventory[0]);
      const csvRows = [
        headers.join(","),
        ...inventory.map(row => headers.map(h => `"${String(row[h] ?? "")}"`).join(","))
      ];
      const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "inventory_data.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      window.showToast("Inventory exported", "success");
      setAdminModalState(s => ({ ...s, inventoryExport: false }));
    } catch (e) {
      window.showToast("Error exporting inventory", "error");
    }
  };

  const handleDeactivateStaff = async (id) => {
    try {
      const base = "https://techstore-expressnode.gamer.gd";
      const res = await fetch(`${base}/staff/deactivate/${id}`, { method: "POST" });
      if (res.ok) {
        setUsers(prev => prev.filter(u => u.id !== id));
        window.showToast("Staff deactivated", "success");
        setAdminModalState(s => ({ ...s, staffDelete: { open: false, id: null } }));
      } else {
        const json = await res.json();
        window.showToast(json.message || "Failed to deactivate", "error");
      }
    } catch (e) {
      window.showToast("Network error while deactivating staff", "error");
    }
  };

  const openVerifyApplicant = (id, name) => setAdminModalState(s => ({ ...s, applicantVerify: { open: true, id, name } }));
  const openRejectApplicant = (id) => setAdminModalState(s => ({ ...s, applicantDelete: { open: true, id } }));

  const handleApproveApplicant = async (id) => {
    try {
      const base = "https://techstore-expressnode.gamer.gd";
      const res = await fetch(`${base}/applicant/verify/${id}`, { method: "POST" });
      if (res.ok) {
        setApplicants(prev => prev.filter(a => a.id !== id));
        await fetchInitialData();
        window.showToast("Applicant approved", "success");
        setAdminModalState(s => ({ ...s, applicantVerify: { open: false, id: null, name: null } }));
      } else {
        const json = await res.json();
        window.showToast(json.message || "Failed to approve", "error");
      }
    } catch (e) {
      window.showToast("Network error while approving", "error");
    }
  };

  const handleRejectApplicant = async (id) => {
    try {
      const base = "https://techstore-expressnode.gamer.gd";
      const res = await fetch(`${base}/applicant/reject/${id}`, { method: "POST" });
      if (res.ok) {
        setApplicants(prev => prev.filter(a => a.id !== id));
        window.showToast("Applicant rejected", "success");
        setAdminModalState(s => ({ ...s, applicantDelete: { open: false, id: null } }));
      } else {
        const json = await res.json();
        window.showToast(json.message || "Failed to reject", "error");
      }
    } catch (e) {
      window.showToast("Network error while rejecting", "error");
    }
  };

  const openReceipt = (receiptFile) => {
    const src = `https://techstore-expressnode.gamer.gd/public/uploads/${receiptFile}`;
    setAdminModalState(s => ({ ...s, transactionReceipt: { open: true, src } }));
  };

  const closeAll = () => {
    setAdminModalState({
      account: false,
      logout: false,
      productAdd: false,
      productUpdate: { open: false, data: null },
      productDelete: { open: false, id: null },
      applicantVerify: { open: false, id: null, name: null },
      applicantDelete: { open: false, id: null },
      inventoryImport: false,
      inventoryExport: false,
      inventoryUpdate: { open: false, id: null },
      staffDelete: { open: false, id: null },
      transactionReceipt: { open: false, src: "" },
      report: false
    });
  };

  const handleGeneratePDFReport = () => {
    const url = "https://techstore-expressnode.gamer.gd/report";
    window.open(url, "_blank");
    setAdminModalState(s => ({ ...s, report: false }));
  };

  return (
    <div className="admin-app">
      <ToastContainer />
      <Sidebar activeSection={activeSection} switchSection={switchSection} />
      <div className="admin-main">
        <header className="admin-topbar">
          <button id="sidebar-toggle" onClick={() => document.getElementById("sidebar")?.classList.toggle("collapsed")}>
            <i className="fas fa-bars"></i>
          </button>
          <h1 className="page-title">{activeSection === "dashboard" ? "Dashboard Overview" : activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h1>
          <div className="topbar-actions">
            <button id="theme-toggle" onClick={toggleTheme}><i className="fas fa-moon"></i></button>
            <div className="profile-wrapper">
              <div className="user-profile" onClick={() => setAdminModalState(s => ({ ...s, account: true }))}>
                <span className="user-name">Admin</span>
                <i className="fas fa-user-circle"></i>
              </div>
              <button id="logout-btn" onClick={() => setAdminModalState(s => ({ ...s, logout: true }))}><i className="fas fa-sign-out-alt"></i></button>
            </div>
          </div>
        </header>

        <main className="admin-content">
          {activeSection === "dashboard" && <Dashboard data={data} />}
          {activeSection === "products" && <Products
            products={products}
            onAdd={() => openAddProduct()}
            onEdit={(p)=> openEditProduct(p)}
            onDelete={(id) => openDeleteProduct(id)}
          />}
          {activeSection === "inventory" && <Inventory
            inventory={inventory}
            onImport={() => setAdminModalState(s => ({ ...s, inventoryImport: true }))}
            onExport={() => setAdminModalState(s => ({ ...s, inventoryExport: true }))}
            onRecordStock={(id) => openInventoryUpdate(id)}
          />}
          {activeSection === "users" && <Users users={users} onDeactivate={(id)=> setAdminModalState(s => ({ ...s, staffDelete: { open: true, id } }))} />}
          {activeSection === "transactions" && <Transactions transactions={transactions} onOpenReceipt={openReceipt} users={users} />}
          {activeSection === "reports" && <Reports data={data} onGenerate={() => setAdminModalState(s => ({ ...s, report: true }))} />}
          {activeSection === "applicants" && <Applicants applicants={applicants} onVerify={(id, name)=> openVerifyApplicant(id, name)} onReject={(id)=> openRejectApplicant(id)} />}
        </main>
      </div>

      <Account isOpen={AdminModalState.account} onClose={() => setAdminModalState(s => ({ ...s, account: false }))} />
      <Logout isOpen={AdminModalState.logout} onClose={() => setAdminModalState(s => ({ ...s, logout: false }))} />
      <ProductAdd isOpen={AdminModalState.productAdd} onClose={() => setAdminModalState(s => ({ ...s, productAdd: false }))} onSave={handleAddProduct} />
      <ProductUpdate isOpen={AdminModalState.productUpdate.open} data={AdminModalState.productUpdate.data} onClose={() => setAdminModalState(s => ({ ...s, productUpdate: { open: false, data: null } }))} onSave={handleUpdateProduct} />
      <ProductDelete isOpen={AdminModalState.productDelete.open} id={AdminModalState.productDelete.id} onClose={() => setAdminModalState(s => ({ ...s, productDelete: { open: false, id: null } }))} onDelete={() => handleDeleteProduct(AdminModalState.productDelete.id)} />
      <ApplicantVerify isOpen={AdminModalState.applicantVerify.open} id={AdminModalState.applicantVerify.id} name={AdminModalState.applicantVerify.name} onClose={() => setAdminModalState(s => ({ ...s, applicantVerify: { open: false, id: null, name: null } }))} onApprove={() => handleApproveApplicant(AdminModalState.applicantVerify.id)} />
      <ApplicantDelete isOpen={AdminModalState.applicantDelete.open} id={AdminModalState.applicantDelete.id} onClose={() => setAdminModalState(s => ({ ...s, applicantDelete: { open: false, id: null } }))} onReject={() => handleRejectApplicant(AdminModalState.applicantDelete.id)} />
      <InventoryImport isOpen={AdminModalState.inventoryImport} onClose={() => setAdminModalState(s => ({ ...s, inventoryImport: false }))} onUpload={handleInventoryImport} />
      <InventoryExport isOpen={AdminModalState.inventoryExport} onClose={() => setAdminModalState(s => ({ ...s, inventoryExport: false }))} onExport={handleInventoryExport} />
      <InventoryUpdate isOpen={AdminModalState.inventoryUpdate.open} id={AdminModalState.inventoryUpdate.id} onClose={() => setAdminModalState(s => ({ ...s, inventoryUpdate: { open: false, id: null } }))} onSave={handleInventoryUpdate} />
      <StaffDelete isOpen={AdminModalState.staffDelete.open} id={AdminModalState.staffDelete.id} onClose={() => setAdminModalState(s => ({ ...s, staffDelete: { open: false, id: null } }))} onConfirm={() => handleDeactivateStaff(AdminModalState.staffDelete.id)} />
      <TransactionReceipt isOpen={AdminModalState.transactionReceipt.open} src={AdminModalState.transactionReceipt.src} onClose={() => setAdminModalState(s => ({ ...s, transactionReceipt: { open: false, src: "" } }))} />
      <Report isOpen={AdminModalState.report} onClose={() => setAdminModalState(s => ({ ...s, report: false }))} generatePDFReport={handleGeneratePDFReport} />
    </div>
  );
};

export default Admin;
