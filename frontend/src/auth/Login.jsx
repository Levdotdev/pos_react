import { useState } from "react";

export default function Login({ onSubmit }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(form);
    } catch {}
    setLoading(false);
  };

  return (
    <form id="logForm" onSubmit={submit}>
      <h1>Login</h1>

      <div className="input-group">
        <i className="fas fa-user-shield"></i>
        <input
          type="text"
          name="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={handleChange}
          autoFocus
        />
      </div>

      <div className="input-group">
        <i className="fas fa-lock"></i>
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={handleChange}
        />
      </div>

      <a href="/password-reset">Forgot your password?</a>

      <button className="btn" type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
