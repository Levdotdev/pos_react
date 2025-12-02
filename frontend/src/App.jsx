import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PasswordReset from "./pages/PasswordReset";
import NewPassword from "./pages/NewPassword";
import Cashier from "./pages/Cashier";
import Admin from "./pages/Admin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/set-new-password" element={<NewPassword />} />
        <Route path="/pos" element={<Cashier />} />
        <Route path="/" element={<Admin />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
