import { useState, useRef } from "react";
import bg from "../assets/resources/bg.jpg";
import "../assets/css/main.css";
import "../assets/css/reset.css";

const BASE_URL = "https://techstore-expressnode.gamer.gd";

export default function PasswordReset() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const toastContainerRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/auth/password-reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Failed to send reset link");
      window.showToast("Reset password link was sent to your email", "success");
    } catch (err) {
      window.showToast(err.message || "Email not found", "error");
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
        <h1>Forgot Password</h1>
        <p className="instructions">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        <input
          id="email"
          type="email"
          name="email"
          placeholder="Email Address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Sending..." : "Send Password Reset Link"}
        </button>
      </form>
    </div>
  );
}
