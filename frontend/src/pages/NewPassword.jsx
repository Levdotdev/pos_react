import { useState } from "react";
import bg from "../assets/resources/bg.jpg";
import "../assets/css/main.css";
import "../assets/css/reset.css";

const BASE_URL = "https://techstore-expressnode.gamer.gd";

export default function NewPassword() {
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [loading, setLoading] = useState(false);

  const token = new URLSearchParams(window.location.search).get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      window.showToast("Passwords do not match", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/auth/set-new-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password, re_password: rePassword }),
      });
      if (!res.ok) throw new Error("Failed to set new password");
      window.showToast("Password changed successfully", "success");
    } catch (err) {
      window.showToast(err.message || "Failed to change password", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="forgot-container"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <form id="forgot-form" onSubmit={handleSubmit} autoComplete="off">
        <h1>Change Password</h1>
        <p className="instructions">
          Please fill and match the following to reset your password.
        </p>

        <input
          id="password"
          type="password"
          name="password"
          placeholder="New Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          id="re_password"
          type="password"
          name="re_password"
          placeholder="Confirm Password"
          required
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
        />

        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
}
