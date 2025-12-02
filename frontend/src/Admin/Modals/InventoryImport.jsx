import React, { useRef, useState } from "react";

const InventoryImport = ({ isOpen, onClose, onUpload }) => {
  const fileRef = useRef();
  const [fileName, setFileName] = useState("");

  if (!isOpen) return null;

  const submit = (e) => {
    e.preventDefault();
    const f = fileRef.current.files[0];
    if (!f) return window.showToast("Please select CSV file", "error");
    onUpload(f);
  };

  return (
    <div className="modal-overlay">
      <form id="import-csv-form" onSubmit={submit}>
        <div className="modal-content">
          <div className="modal-header"><h2>Import Inventory CSV</h2><button className="modal-close-btn" onClick={onClose}>&times;</button></div>
          <div className="modal-body">
            <div id="drop-zone" className="drop-zone" onClick={()=>fileRef.current.click()} style={{padding:40, border:"2px dashed var(--clr-border)", textAlign:"center", cursor:"pointer"}}>
              <i className="fas fa-file-csv" style={{fontSize:"3rem", marginBottom:10}}></i>
              <p>Drag & Drop CSV file here or Click to Upload</p>
              <p id="file-name-display" style={{marginTop:10}}>{fileName}</p>
              <input type="file" id="csv-file-input" name="csv_file" accept=".csv" hidden ref={fileRef} onChange={(e)=>setFileName(e.target.files[0]?.name || "")} />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="action-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="action-btn primary-btn" id="btn-upload-csv">Upload</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InventoryImport;
