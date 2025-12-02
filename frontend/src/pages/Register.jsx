import { useState, useRef } from "react";
import bg from "../assets/resources/bg.jpg";
import "../assets/css/main.css";
import "../assets/css/reset.css";

const BASE_URL = "https://techstore-expressnode.gamer.gd";
export default function Register({ onSubmit }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const validate = () => {
    const newErrors = {};
    if (!form.username || form.username.length < 5) {
      newErrors.username = "Username must be at least 5 characters";
    }
    if (!form.email) {
      newErrors.email = "Please input your email address";
    }
    if (!form.password || form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (form.password !== form.password_confirmation) {
      newErrors.password_confirmation = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  
    const handleRegister = async (formData) => {
      try {
        const res = await fetch(`${BASE_URL}/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formData),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => null);
          throw new Error(err?.message || "Registration failed");
        }
        window.showToast("Registration successful", "success");
        setModalOpen(false);
      } catch (err) {
        window.showToast(err.message || "Registration failed", "error");
        throw err;
      }
    };

  return (
    <div
      className="forgot-container"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <span className="valid-feedback" role="alert">
        <strong>
          Note: Password must be at least 8 characters and contain one of these special characters (!@£$%^&*-_+=?), a number, uppercase and lowercase letters.
        </strong>
      </span>

      <form id="regForm" onSubmit={handleRegister} autoComplete="off">
        <h1>Register</h1>
        <p className="instructions">
          Enter your personal details and start your journey with TechStore.
        </p>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        {errors.username && <p className="error-msg">{errors.username}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p className="error-msg">{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="New Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        {errors.password && <p className="error-msg">{errors.password}</p>}

        <input
          type="password"
          name="password_confirmation"
          placeholder="Confirm Password"
          value={form.password_confirmation}
          onChange={handleChange}
          required
        />
        {errors.password_confirmation && (
          <p className="error-msg">{errors.password_confirmation}</p>
        )}

        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
