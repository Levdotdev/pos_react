require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const usersRouter = require('./routes/users');
const pool = require('./db'); // your existing pool

const app = express();

// Enable CORS for React frontend
app.use(cors({
  origin: 'https://l-and-d-tech-store.gamer.gd', // React app URL
  credentials: true
}));

app.use(express.json());

// MySQL session store
const sessionStore = new MySQLStore({}, pool.promise ? pool.promise() : pool); // ensure pool supports promise

app.use(session({
  key: 'session',
  secret: 'djhcvsAHy36228',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60, // 1 hour
    httpOnly: true,
    secure: false // set true if using HTTPS
  }
}));

app.get('/', (req, res) => res.send({ message: 'API running...' }));

// Example login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Replace with your user check
  const [rows] = await pool.execute('SELECT * FROM users WHERE name=?', [username]);
  if (rows.length > 0) {
    req.session.user = { id: rows[0].id, username: rows[0].title };
    return res.json({ message: 'Logged in successfully' });
  }

  res.status(401).json({ message: 'Invalid credentials' });
});

// Example logout
app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ message: 'Logout failed' });
    res.clearCookie('cookie');
    res.json({ message: 'Logged out successfully' });
  });
});

// Session check
app.get('/session', (req, res) => {
  if (req.session.user) return res.json({ loggedIn: true, user: req.session.user });
  res.json({ loggedIn: false });
});

app.use('/api/users', usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running at https://l-and-d-tech-store.gamer.gd`));
