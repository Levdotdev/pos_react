import React, { useState, useEffect } from "react";

export default function AnnouncementModal({ editData, onClose, onSubmit }) {
  const [about, setAbout] = useState(editData ? editData.about : "");
  const [title, setTitle] = useState(editData ? editData.title : "");
  const [body, setBody] = useState(editData ? editData.body : "");

  const predefinedAbouts = ["Redeem Code", "Maintenance", "Update", "Event", "Server Issue", "Bug Fix", "New Feature", "Compensation", "Collaboration", "Character Banner", "Weapon Banner", "System Notice", "Patch Notes", "Developer Message"];

  useEffect(() => {
    const textarea = document.getElementById("bodyInput");
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }, [body]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!about || !title || !body) return alert("All fields are required.");
    const data = { about, title, body, id: editData?.id || undefined };
    onSubmit(data);
  };

  return (
    <div className="modal-overlay">
      <div className="login-box">
        <h2>{editData ? "Update Announcement" : "Add Announcement"}</h2>
        <select value={about} onChange={(e) => setAbout(e.target.value)} className="styled-input">
          <option value="">Select Announcement Type</option>
          {predefinedAbouts.map((option, i) => (
            <option key={i} value={option}>
              {option}
            </option>
          ))}
        </select>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="styled-input" />
        <textarea id="bodyInput" placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} className="styled-textarea" />
        <div className="button-group">
          <input type="button" value={editData ? "Update" : "Add"} onClick={handleSubmit} />
          <input type="button" value="Cancel" onClick={onClose} />
        </div>
      </div>
    </div>
  );
}