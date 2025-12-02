import db from "../config/db.js";

export async function deactivateStaff(req, res) {
  try {
    const id = req.params.id || req.body.id;
    if (!id) return res.status(400).json({ error: "Missing id" });

    await db.query("UPDATE users SET active = 0 WHERE id = ?", [id]);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
