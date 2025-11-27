export default function Login() {
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
