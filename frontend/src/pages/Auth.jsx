import { useState, useEffect, useRef } from "react";
import Modal from "../auth/Modal";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Map from "../auth/Map";

import "../assets/css/login.css";
import "../assets/css/toast.css";

import bg from "../assets/resources/bg.jpg";
import notifMp3 from "../assets/resources/notif.mp3";

const BASE_URL = "https://techstore-expressnode.gamer.gd";

export default function Auth() {
  const [modalOpen, setModalOpen] = useState(false);
  const [active, setActive] = useState("login");
  const toastContainerRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    window.showToast = (message, type = "success") => {
      if (!toastContainerRef.current) return;
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }

      const toast = document.createElement("div");
      toast.className = `toast toast-${type}`;
      const icon =
        type === "success"
          ? "fa-check-circle"
          : type === "error"
          ? "fa-times-circle"
          : "fa-info-circle";

      toast.innerHTML = `
        <div style="display:flex; align-items:center;">
          <i class="fas ${icon}" style="margin-right:10px;"></i>
          <span>${message}</span>
        </div>
        <button class="close-toast">&times;</button>
      `;

      toast.querySelector(".close-toast").addEventListener("click", () => {
        toast.style.animation = "fadeOut 0.4s forwards";
        setTimeout(() => toast.remove(), 400);
      });

      setTimeout(() => {
        toast.style.animation = "fadeOut 0.4s forwards";
        setTimeout(() => toast.remove(), 400);
      }, 4000);

      toastContainerRef.current.appendChild(toast);
    };

    return () => {
      window.showToast = undefined;
    };
  }, []);

  const handleLogin = async (formData) => {
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.message || "Login failed");
      }
      window.showToast("Login successful", "success");
      setModalOpen(false);
    } catch (err) {
      window.showToast(err.message || "Login failed", "error");
      throw err;
    }
  };

  return (
    <>
      <audio ref={audioRef} id="notifSound" src={notifMp3} preload="auto" />
      <div id="toast-container" ref={toastContainerRef}></div>

      <div
        className="welcome-container"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "150%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
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

          <div
            className="welcome-buttons anim-slide-up"
            style={{ animationDelay: "0.6s" }}
          >
            <button
              className="btn primary"
              onClick={() => {
                setActive("login");
                setModalOpen(true);
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <Modal
          type={active}
          onClose={() => setModalOpen(false)}
          switchTo={(mode) => setActive(mode)}
        >
          {active === "login" ? (
            <Login onSubmit={handleLogin} />
          ) : (
            <Register onSubmit={handleRegister} />
          )}
        </Modal>
      )}

      <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 10 }}>
        <Map />
      </div>
    </>
  );
}
