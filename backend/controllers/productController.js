import db from "../config/db.js";

export async function addProduct(req, res) {
  try {
    const { product_name, category, unit_price, product_id } = req.body;
    if (!product_name || !category || !unit_price || !product_id) return res.status(400).json({ error: "Missing fields" });

    const [result] = await db.query(
      "INSERT INTO products (id, name, category, price, stock, created_at) VALUES (?, ?, ?, ?, ?, NOW())",
      [product_id, product_name, category, Number(unit_price), 0]
    );
    res.json({ ok: true, insertedId: product_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function updateProduct(req, res) {
  try {
    const { id, product_name, category, unit_price, product_id } = req.body;
    if (!id) return res.status(400).json({ error: "Missing product id" });

    await db.query("UPDATE products SET name = ?, category = ?, price = ?, id = ? WHERE id = ?", [product_name, category, Number(unit_price), product_id, id]);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function softDeleteProduct(req, res) {
  try {
    const id = req.params.id || req.body.id;
    if (!id) return res.status(400).json({ error: "Missing id" });

    await db.query("UPDATE products SET deleted_at = NOW() WHERE id = ?", [id]);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function listProducts(req, res) {
  try {
    const [rows] = await db.query("SELECT id, name, category, price, stock FROM products WHERE deleted_at IS NULL ORDER BY name ASC");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function getProduct(req, res) {
  try {
    const id = req.params.id;
    const [rows] = await db.query("SELECT id, name, category, price, stock FROM products WHERE id = ? LIMIT 1", [id]);
    if (!rows.length) return res.status(404).json({ error: "Not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
