import React, { useState, useEffect } from "react";

const InventoryUpdate = ({ isOpen, id, onClose, onSave }) => {
  const [productId, setProductId] = useState("");
  const [stock, setStock] = useState(1);

  useEffect(() => {
    if (id) setProductId(id);
  }, [id]);

  if (!isOpen) return null;

  const submit = () => {
    if (!productId || !stock) return window.showToast("Please fill required fields", "error");
    onSave({ product_id: productId, stock: Number(stock) });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header"><h2>Record Stock Entry</h2><button className="modal-close-btn" onClick={onClose}>&times;</button></div>
        <div className="modal-body">
          <form id="form-record-stock" onSubmit={(e)=>{e.preventDefault(); submit();}}>
            <div className="form-group"><label>Product</label><input type="text" value={productId} onChange={e=>setProductId(e.target.value)} placeholder="Scan unique product code" required /></div>
            <div className="form-group"><label>Quantity Added</label><input type="number" min={1} value={stock} onChange={e=>setStock(e.target.value)} required /></div>
          </form>
        </div>
        <div className="modal-footer">
          <button className="action-btn" onClick={onClose}>Cancel</button>
          <button className="action-btn primary-btn" onClick={submit}>Add Stock</button>
        </div>
      </div>
    </div>
  );
};

export default InventoryUpdate;
