import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";

export default function Cashier({ initialProducts = [], cashierName = "Cashier" }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("all");
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [cashReceived, setCashReceived] = useState("");
  const [changeAmount, setChangeAmount] = useState(0);
  const [modals, setModals] = useState({
    payment: false,
    receipt: false,
    deleteItem: false,
    clearCart: false,
  });
  const [itemToDelete, setItemToDelete] = useState(null);
  const receiptRef = useRef(null);

  const categoryIcons = {
    Electronics: "fa-plug",
    Keyboard: "fa-keyboard",
    Mouse: "fa-computer-mouse",
    Controller: "fa-gamepad",
    Speaker: "fa-volume-high",
    Headset: "fa-headphones",
    Microphone: "fa-microphone",
    Webcam: "fa-video",
    Accessories: "fa-box",
  };

  useEffect(() => {
    const mapped = initialProducts.map((p) => ({
      ...p,
      icon: categoryIcons[p.category] || "fa-box",
    }));
    setProducts(mapped);
  }, [initialProducts]);

  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const stored = localStorage.getItem("isClockedIn") === "true";
    setIsClockedIn(stored);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleAttendance = () => {
    const newState = !isClockedIn;
    setIsClockedIn(newState);
    localStorage.setItem("isClockedIn", newState);
    showToast(
      newState
        ? "Time In Successful. Terminal Unlocked."
        : "Time Out Successful. Redirecting to Login Page",
      newState ? "success" : "info"
    );
    if (!newState) setTimeout(() => (window.location.href = "https://techstore-expressnode.gamer.gd/auth/logout"), 1000);
  };

  const filteredProducts =
    category === "all" ? products : products.filter((p) => p.category === category);

  const filterCategory = (cat) => setCategory(cat);

  const addToCart = (id) => {
    if (!isClockedIn) return;
    const prod = products.find((p) => p.id === id);
    if (!prod) return showToast("Product not found!", "error");
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        if (existing.qty < prod.stock) {
          return prev.map((item) =>
            item.id === id ? { ...item, qty: item.qty + 1 } : item
          );
        } else {
          showToast(`Cannot exceed stock (${prod.stock})`, "error");
          return prev;
        }
      } else {
        if (prod.stock > 0) return [{ ...prod, qty: 1 }, ...prev];
        else {
          showToast("Out of stock", "error");
          return prev;
        }
      }
    });
  };

  const adjustQty = (id, change) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + change;
            if (newQty <= 0) {
              initiateDeleteItem(item);
              return null;
            }
            const prod = products.find((p) => p.id === id);
            if (newQty > prod.stock) {
              showToast(`Cannot exceed stock (${prod.stock})`, "error");
              return item;
            }
            return { ...item, qty: newQty };
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const vat = subtotal * 0.12;
  const total = subtotal + vat;

  const openModal = (name) => setModals((prev) => ({ ...prev, [name]: true }));
  const closeModal = (name) => setModals((prev) => ({ ...prev, [name]: false }));

  const initiateDeleteItem = (item) => {
    setItemToDelete(item);
    openModal("deleteItem");
  };
  const executeDeleteItem = () => {
    if (itemToDelete) {
      setCart((prev) => prev.filter((i) => i.id !== itemToDelete.id));
      showToast("Item removed from cart", "info");
      closeModal("deleteItem");
      setItemToDelete(null);
    }
  };
  const confirmClearCart = () => {
    if (cart.length === 0) return showToast("Cart is already empty", "error");
    openModal("clearCart");
  };
  const executeClearCart = () => {
    setCart([]);
    showToast("Cart cleared", "info");
    closeModal("clearCart");
  };

  const handleCashChange = (value) => {
    setCashReceived(value);
    const change = parseFloat(value || 0) - total;
    setChangeAmount(change);
  };
  const setQuickCash = (amount) => handleCashChange(amount);
  const setExact = () => handleCashChange(total.toFixed(2));

  const processTransaction = () => {
    closeModal("payment");
    html2canvas(receiptRef.current, { scale: 3 }).then((canvas) => {
      const imageData = canvas.toDataURL("image/png");
      const form = document.getElementById("transaction-form");
      document.getElementById("total").value = total.toFixed(2);
      document.getElementById("cashier").value = cashierName;
      document.getElementById("transaction-time").value = new Date().toISOString();
      document.getElementById(
        "items"
      ).value = JSON.stringify(cart.map((item) => ({ product_id: item.id, qty: item.qty })));
      document.getElementById("receipt_image").value = imageData;
      form.submit();
    });
    setCart([]);
    setCashReceived("");
    setChangeAmount(0);
  };

  const showToast = (msg, type = "info") => {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fas ${type === "success" ? "fa-check" : "fa-info-circle"}"></i> ${msg}`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const handleScan = (e) => {
    if (e.key === "Enter") {
      const query = e.target.value.trim();
      const match = products.find((p) => p.id === query);
      if (match) addToCart(match.id);
      else showToast("Item not found", "info");
      e.target.value = "";
    }
  };

  return (
    <div className={`pos-body ${isClockedIn ? "" : "locked"}`}>
      <audio id="beepSound" src="/public/resources/notif.mp3" preload="auto"></audio>

      <header>
        <div>
          <h1>TechStore POS</h1>
          <span>{time.toLocaleTimeString()}</span>
        </div>
        <div>
          <span>{cashierName}</span>
          <span>{isClockedIn ? "Online" : "Offline"}</span>
          <button onClick={toggleAttendance}>{isClockedIn ? "Time Out" : "Time In"}</button>
        </div>
      </header>

      <main>
        <section>
          <input type="text" placeholder="Scan barcode..." onKeyPress={handleScan} />
          <div>
            {["all", ...Object.keys(categoryIcons)].map((cat) => (
              <button
                key={cat}
                className={category === cat ? "active" : ""}
                onClick={() => filterCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="product-grid">
            {filteredProducts.map((p) => (
              <div key={p.id} className="product-card" onClick={() => addToCart(p.id)}>
                <i className={`fas ${p.icon}`}></i>
                <div>{p.name}</div>
                <div>₱{p.price.toLocaleString()}</div>
                <div>Stock: {p.stock}</div>
              </div>
            ))}
          </div>
        </section>

        <aside>
          <h3>Current Order</h3>
          {cart.length === 0 ? (
            <div>Cart is empty</div>
          ) : (
            cart.map((item) => (
              <div key={item.id}>
                <div>
                  <h4>{item.name}</h4>
                  <small>@ ₱{item.price}</small>
                  <small>Stock: {item.stock}</small>
                </div>
                <div>
                  <button onClick={() => adjustQty(item.id, -1)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => adjustQty(item.id, 1)}>+</button>
                  <button onClick={() => initiateDeleteItem(item)}>Remove</button>
                </div>
              </div>
            ))
          )}
          <div>
            <div>Subtotal: ₱{subtotal.toFixed(2)}</div>
            <div>VAT (12%): ₱{vat.toFixed(2)}</div>
            <div>Total: ₱{total.toFixed(2)}</div>
            <button onClick={() => openModal("payment")}>Charge</button>
          </div>
        </aside>
      </main>

      {modals.payment && (
        <div className="modal">
          <h2>Process Payment</h2>
          <div>Total: ₱{total.toFixed(2)}</div>
          <input
            type="number"
            value={cashReceived}
            onChange={(e) => handleCashChange(e.target.value)}
            placeholder="Cash Received"
          />
          <div>
            <button onClick={() => setQuickCash(100)}>100</button>
            <button onClick={() => setQuickCash(500)}>500</button>
            <button onClick={() => setQuickCash(1000)}>1000</button>
            <button onClick={setExact}>Exact</button>
          </div>
          <div>Change: ₱{changeAmount.toFixed(2)}</div>
          <button onClick={processTransaction} disabled={changeAmount < 0}>
            Print & Complete
          </button>
          <button onClick={() => closeModal("payment")}>Cancel</button>
        </div>
      )}

      {modals.deleteItem && (
        <div className="modal">
          <p>Remove {itemToDelete?.name}?</p>
          <button onClick={executeDeleteItem}>Yes</button>
          <button onClick={() => closeModal("deleteItem")}>Cancel</button>
        </div>
      )}

      {modals.clearCart && (
        <div className="modal">
          <p>Clear all items?</p>
          <button onClick={executeClearCart}>Yes</button>
          <button onClick={() => closeModal("clearCart")}>Cancel</button>
        </div>
      )}

      <div ref={receiptRef} style={{ display: "none" }}>
        <h3>TechStore</h3>
        <p>Cashier: {cashierName}</p>
        <p>Date: {new Date().toLocaleString()}</p>
        {cart.map((item) => (
          <div key={item.id}>
            {item.name} x{item.qty} = ₱{(item.price * item.qty).toFixed(2)}
          </div>
        ))}
        <div>Total: ₱{total.toFixed(2)}</div>
        <div>Cash: ₱{cashReceived}</div>
        <div>Change: ₱{changeAmount.toFixed(2)}</div>
      </div>

      <form id="transaction-form" action="https://techstore-expressnode.gamer.gd/pos/transaction" method="POST" style={{ display: "none" }}>
        <input type="hidden" name="total" id="total" />
        <input type="hidden" name="cashier" id="cashier" />
        <input type="hidden" name="transaction_time" id="transaction-time" />
        <input type="hidden" name="items" id="items" />
        <input type="hidden" name="receipt_image" id="receipt_image" />
      </form>

      <div id="toast-container"></div>
    </div>
  );
}
