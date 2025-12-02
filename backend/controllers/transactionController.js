import db from "../config/db.js";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const uploadsDir = path.join(process.cwd(), "backend", "uploads", "receipts");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

export async function createTransaction(req, res) {
  try {
    const { total, cashier, transaction_time, items, receipt_image } = req.body;
    if (!total || !items) return res.status(400).json({ error: "Missing fields" });

    let receiptFilename = null;
    if (receipt_image) {
      const matches = receipt_image.match(/^data:(image\/png|image\/jpeg);base64,(.+)$/);
      const b64 = matches ? matches[2] : null;
      if (b64) {
        const buf = Buffer.from(b64, "base64");
        receiptFilename = `${uuidv4()}.png`;
        fs.writeFileSync(path.join(uploadsDir, receiptFilename), buf);
      }
    }

    const [result] = await db.query("INSERT INTO transactions (cashier, total, date, receipt) VALUES (?, ?, ?, ?)", [cashier, Number(total), transaction_time || new Date(), receiptFilename]);
    const transactionId = result.insertId;

    const parsedItems = typeof items === "string" ? JSON.parse(items) : items;
    for (const it of parsedItems) {
      await db.query("INSERT INTO transaction_items (transaction_id, product_id, qty) VALUES (?, ?, ?)", [transactionId, it.product_id, it.qty]);
      await db.query("UPDATE products SET stock = GREATEST(0, stock - ?) WHERE id = ?", [it.qty, it.product_id]);
    }

    res.json({ ok: true, transactionId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function listTransactions(req, res) {
  try {
    const [rows] = await db.query("SELECT id, cashier, total, date, receipt FROM transactions ORDER BY date DESC");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function getReceiptImage(req, res) {
  try {
    const file = req.params.file;
    const filepath = path.join(uploadsDir, file);
    if (!fs.existsSync(filepath)) return res.status(404).send("Not found");
    res.sendFile(filepath);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}
