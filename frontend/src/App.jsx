import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import POS from "./pages/PoS";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Admin />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/pos" element={<POS />} />
    </Routes>
  );
}
