import { useState } from "react";
import Modal from "../auth/Modal";
import Map from "../auth/Map";
import bg from "../assets/resources/bg.jpg";
import "../assets/css/login.css";

export default function Auth() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isRightPanel, setRightPanel] = useState(false);

  return (
    <div className="auth-wrapper" style={{ backgroundImage: `url(${bg})` }}>

      <div className="welcome-container" id="welcome-container">
        <div className="welcome-content">
          <div className="logo-container anim-fade-in">
            <i className="fas fa-laptop-code"></i>
          </div>
          <h1 className="anim-slide-up" style={{ animationDelay: "0.2s" }}>
            Welcome to TechStore
          </h1>
          <p className="anim-slide-up" style={{ animationDelay: "0.4s" }}>
            Your one-stop shop for the latest and greatest in technology.
            <br />
            Join us and discover the future of tech retail.
          </p>

          <div className="welcome-buttons anim-slide-up" style={{ animationDelay: "0.6s" }}>
            <button
              className="btn primary"
              onClick={() => {
                setModalVisible(true);
                setRightPanel(false);
              }}
            >
              Login
            </button>
            <button
              className="btn secondary"
              onClick={() => {
                setModalVisible(true);
                setRightPanel(true);
              }}
            >
              Register
            </button>
          </div>
        </div>
      </div>

      <Modal
        visible={isModalVisible}
        rightPanel={isRightPanel}
        onClose={() => setModalVisible(false)}
        onSwitchPanel={(panel) => setRightPanel(panel)}
      />

      <Map />
    </div>
  );
}
