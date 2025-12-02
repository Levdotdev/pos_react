import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export async function register(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ error: "Missing fields" });

    const [rows] = await db.query("SELECT id FROM users WHERE email = ? OR username = ?", [email, username]);
    if (rows.length) return res.status(400).json({ error: "User already exists" });

    const hash = await bcrypt.hash(password, 10);
    const [result] = await db.query("INSERT INTO users (username, email, password, role, created_at) VALUES (?, ?, ?, ?, NOW())", [username, email, hash, "cashier"]);
    const id = result.insertId;
    const token = jwt.sign({ id, username, email, role: "cashier" }, JWT_SECRET, { expiresIn: "7d" });
    return res.json({ id, username, email, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const [rows] = await db.query("SELECT id,username,email,password,role FROM users WHERE email = ?", [email]);
    if (!rows.length) return res.status(400).json({ error: "Invalid credentials" });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, username: user.username, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ id: user.id, username: user.username, email: user.email, role: user.role, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function me(req, res) {
  try {
    const id = req.user.id;
    const [rows] = await db.query("SELECT id,username,email,role,updated_at FROM users WHERE id = ?", [id]);
    if (!rows.length) return res.status(404).json({ error: "Not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

const { sendPasswordReset, sendEmailVerification } = require("./email");

exports.passwordResetRequest = async (req, res) => {
    const { email } = req.body;
    const user = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (!user[0]) return res.status(404).json({ message: "User not found" });

    const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    await sendPasswordReset(email, token);
    res.json({ message: "Password reset email sent" });
};

exports.setNewPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const hashed = await bcrypt.hash(newPassword, 10);
        await db.query("UPDATE users SET password = ? WHERE id = ?", [hashed, decoded.id]);
        res.json({ message: "Password updated" });
    } catch (err) {
        res.status(400).json({ message: "Invalid or expired token" });
    }
};

exports.verifyEmail = async (req, res) => {
    const { token } = req.query;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        await db.query("UPDATE users SET is_verified = 1 WHERE id = ?", [decoded.id]);
        res.json({ message: "Email verified" });
    } catch (err) {
        res.status(400).json({ message: "Invalid or expired token" });
    }
};