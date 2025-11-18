import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/users/login', { username, password }, { withCredentials: true });

      const { role } = res.data;

      if (role === 'admin') navigate('/');      // Admin page
      else if (role === 'user') navigate('/pos'); // POS page
      else navigate('/auth');                    // Back to login

    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form id="logForm" method="POST" action="/auth/login">
        <h1>Login</h1>
        <div className="input-group">
          <i className="fas fa-user-shield"></i>
          <input type="text" name="email" placeholder="Email or Username" />
        </div>
        <div className="input-group">
          <i className="fas fa-lock"></i>
          <input type="password" name="password" placeholder="Password" />
        </div>
        <a href="/auth/password-reset">Forgot your password?</a>
        <button className="btn">Login</button>
      </form>
    </div>
  );
}