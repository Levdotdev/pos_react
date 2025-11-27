const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all users
router.get('/products', async (req, res, next) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM products ORDER BY id');
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// POST create
router.post('/product', async (req, res, next) => {
  try {
    const { id, name, price, category } = req.body;
    const [result] = await pool.execute(
      'INSERT INTO products (id, name, price, category) VALUES (?, ?, ?, ?)',
      [id, name, price, category ]
    );
    const [rows] = await pool.execute('SELECT * FROM products WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// PUT update
router.put('/:id', async (req, res, next) => {
  try {
    const { id, name, price, category } = req.body;
    await pool.execute(
      'UPDATE products SET id=?, name=?, price=?, category=? WHERE id=?',
      [id, name, price, category ,req.params.id]
    );
    const [rows] = await pool.execute('SELECT * FROM products WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});


// DELETE
router.delete('/:id', async (req, res, next) => {
  try {
    await pool.execute('DELETE FROM products WHERE id=?', [req.params.id]);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
