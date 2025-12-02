import { useState } from "react";

export default function Register({ onSubmit }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();

    if (!form.username || form.username.length < 5) {
      window.showToast("Username must be at least 5 characters", "error");
      return;
    }
    if (!form.email) {
      window.showToast("Please input your email.", "error");
      return;
    }
    if (!form.password || form.password.length < 8) {
      window.showToast("Password must be at least 8 characters", "error");
      return;
    }
    if (form.password !== form.password_confirmation) {
      window.showToast("Passwords do not match", "error");
      return;
    }

    setLoading(true);
    try {
      await onSubmit(form);
    } catch {}
    setLoading(false);
  };

  return (
    <form id="regForm" onSubmit={submit}>
      <h1>Create Account</h1>

      <div className="input-group">
        <i className="fas fa-user"></i>
        <input
          id="username"
          name="username"
          type="text"
          required
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />
      </div>

      <div className="input-group">
        <i className="fas fa-envelope"></i>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div className="input-group">
        <i className="fas fa-lock"></i>
        <input
          id="password"
          name="password"
          type="password"
          required
          placeholder="Enter password"
          value={form.password}
          onChange={handleChange}
        />
      </div>

      <div className="input-group">
        <i className="fas fa-lock"></i>
        <input
          id="password_confirmation"
          name="password_confirmation"
          type="password"
          required
          placeholder="Confirm password"
          value={form.password_confirmation}
          onChange={handleChange}
        />
      </div>

      <button className="btn" style={{ marginTop: 20 }} disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
