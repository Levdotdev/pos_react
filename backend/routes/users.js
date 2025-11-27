const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all users
router.get('/', async (req, res, next) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM users ORDER BY id');
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// POST create
router.post('/', async (req, res, next) => {
  try {
    const { title, about, body, developer } = req.body;
    const [result] = await pool.execute(
      'INSERT INTO users (title, about, body, developer) VALUES (?, ?, ?, ?)',
      [title, about, body, developer ]
    );
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// PUT update
router.put('/:id', async (req, res, next) => {
  try {
    const { title, about, body, developer } = req.body;
    await pool.execute(
      'UPDATE users SET title=?, about=?, body=?, developer=? WHERE id=?',
      [title, about, body, developer , req.params.id]
    );
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});


// DELETE
router.delete('/:id', async (req, res, next) => {
  try {
    await pool.execute('DELETE FROM users WHERE id=?', [req.params.id]);
    res.json({ message: 'User deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
