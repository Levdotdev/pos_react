import db from "../config/db.js";
import fs from "fs";
import csvParser from "csv-parser";

export async function updateStock(req, res) {
  try {
    const { product_id, stock } = req.body;
    if (!product_id || !stock) return res.status(400).json({ error: "Missing fields" });

    await db.query("UPDATE products SET stock = stock + ?, last_restock = NOW() WHERE id = ?", [Number(stock), product_id]);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function importCsv(req, res) {
  try {
    if (!req.file) return res.status(400).json({ error: "CSV file required" });

    const filePath = req.file.path;
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        const conn = db;
        const promises = results.map(row => {
          const id = row.id || row.product_id || row.barcode;
          const name = row.name || row.product_name;
          const category = row.category || "Accessories";
          const price = Number(row.price || 0) || 0;
          const stock = Number(row.stock || 0) || 0;

          return conn.query(
            `INSERT INTO products (id,name,category,price,stock,created_at) VALUES (?, ?, ?, ?, ?, NOW())
             ON DUPLICATE KEY UPDATE name = VALUES(name), category = VALUES(category), price = VALUES(price), stock = stock + VALUES(stock), last_restock = NOW()`,
            [id, name, category, price, stock]
          );
        });

        await Promise.all(promises);
        fs.unlinkSync(filePath);
        res.json({ ok: true, imported: results.length });
      });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
