export default function Register() {
  return (
    <div className="form-container sign-up-container">
      <form id="regForm" method="POST" action="/auth/register">
        <h1>Create Account</h1>
        <div className="input-group">
          <i className="fas fa-user"></i>
          <input type="text" placeholder="Username" />
        </div>
        <div className="input-group">
          <i className="fas fa-envelope"></i>
          <input type="email" placeholder="Email" />
        </div>
        <div className="input-group">
          <i className="fas fa-lock"></i>
          <input type="password" placeholder="Password" />
        </div>
        <button className="btn" style={{ marginTop: "20px" }}>Register</button>
      </form>
    </div>
  );
}
