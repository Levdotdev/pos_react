import Login from "./Login";
import Register from "./Register";

export default function Modal({ visible, rightPanel, onClose, onSwitchPanel }) {
  return (
    <div className={`modal-wrapper ${visible ? "" : "hidden"}`}>
      <div className={`container ${rightPanel ? "right-panel-active" : ""}`}>
        <span className="close-btn" onClick={onClose}>&times;</span>

        <Register />
        <Login />

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="btn ghost" onClick={() => onSwitchPanel(false)}>Login</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Techmate!</h1>
              <p>Enter your personal details and start your journey with TechStore</p>
              <button className="btn ghost" onClick={() => onSwitchPanel(true)}>Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
