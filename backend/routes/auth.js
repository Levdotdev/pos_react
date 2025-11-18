// server.js or routes/users.js (if you want a dedicated login route)
const bcrypt = require('bcrypt'); // if passwords are hashed
const express = require('express');
const router = express.Router();
const pool = require('../db');

// POST /api/users/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

    const user = rows[0];

    // If you store hashed passwords, compare with bcrypt
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Check email verification
    if (!user.email_verified_at || user.role === 'unverified') {
      req.session.user = null;
      return res.json({ role: 'unverified' });
    }

    // Set session
    req.session.user = { id: user.id, username: user.username, role: user.role };
    return res.json({ role: user.role });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
