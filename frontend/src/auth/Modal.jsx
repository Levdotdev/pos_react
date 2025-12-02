import { useEffect } from "react";

export default function Modal({ children, onClose, type = "login", switchTo }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const isRegister = type === "register";

  return (
    <div
      className="modal-wrapper"
      onClick={(e) => {
        if (e.target.classList.contains("modal-wrapper")) onClose();
      }}
    >
      <div
        id="container"
        className={isRegister ? "container right-panel-active" : "container"}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>

        <div className="form-container sign-up-container">{children}</div>
        <div className="form-container sign-in-container"></div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Hello, Techmate!</h1>
              <p>Enter your personal details and start your journey with TechStore</p>
              <hr />
              <h5>OR</h5>
              <br />
              <button className="btn ghost" onClick={() => switchTo("login")}>
                Login
              </button>
            </div>

            <div className="overlay-panel overlay-right">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us, login with your personal info</p>
              <hr />
              <h5>OR</h5>
              <br />
              <button className="btn ghost" onClick={() => switchTo("register")}>
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
