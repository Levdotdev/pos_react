import db from "../config/db.js";
const { sendApplicantStatus } = require("./email");

exports.verifyApplicant = async (req, res) => {
    const { id } = req.body;
    const applicant = await db.query("SELECT * FROM applicants WHERE id = ?", [id]);
    if (!applicant[0]) return res.status(404).json({ message: "Applicant not found" });

    await db.query("UPDATE applicants SET status = 'approved' WHERE id = ?", [id]);
    await sendApplicantStatus(applicant[0].email, true);
    res.json({ message: "Applicant approved" });
};

exports.deleteApplicant = async (req, res) => {
    const { id } = req.body;
    const applicant = await db.query("SELECT * FROM applicants WHERE id = ?", [id]);
    if (!applicant[0]) return res.status(404).json({ message: "Applicant not found" });

    await db.query("DELETE FROM applicants WHERE id = ?", [id]);
    await sendApplicantStatus(applicant[0].email, false);
    res.json({ message: "Applicant deleted" });
};

export async function rejectApplicant(req, res) {
  try {
    const id = req.params.id || req.body.id;
    if (!id) return res.status(400).json({ error: "Missing id" });

    await db.query("DELETE FROM applicants WHERE id = ?", [id]);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function verifyApplicant(req, res) {
  try {
    const id = req.params.id || req.body.id;
    if (!id) return res.status(400).json({ error: "Missing id" });

    const [rows] = await db.query("SELECT username,email,password FROM applicants WHERE id = ?", [id]);
    if (!rows.length) return res.status(404).json({ error: "Not found" });

    const applicant = rows[0];

    await db.query("INSERT INTO users (username,email,password,role,created_at) VALUES (?, ?, ?, ?, NOW())", [applicant.username, applicant.email, applicant.password || "", "cashier"]);
    await db.query("DELETE FROM applicants WHERE id = ?", [id]);

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
