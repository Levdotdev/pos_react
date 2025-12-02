import db from "../config/db.js";
import bcrypt from "bcrypt";

export async function updateSettings(req, res) {
  try {
    const userId = req.user.id;
    const { email, currentPassword, newPassword } = req.body;

    if (email) {
      await db.query("UPDATE users SET email = ? WHERE id = ?", [email, userId]);
    }

    if (newPassword) {
      const [rows] = await db.query("SELECT password FROM users WHERE id = ?", [userId]);
      if (!rows.length) return res.status(404).json({ error: "User not found" });
      const valid = await bcrypt.compare(currentPassword || "", rows[0].password || "");
      if (!valid) return res.status(400).json({ error: "Current password invalid" });
      const hash = await bcrypt.hash(newPassword, 10);
      await db.query("UPDATE users SET password = ? WHERE id = ?", [hash, userId]);
    }

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
