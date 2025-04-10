const express = require('express');
const router = express.Router();

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === ADMIN_CREDENTIALS.username && 
      password === ADMIN_CREDENTIALS.password) {
    req.session.isAuthenticated = true;
    req.session.user = { username: 'admin' };
    return res.json({ success: true });
  }
  
  return res.status(401).json({ error: 'Invalid credentials' });
});

// Check Auth Status
router.get('/check', (req, res) => {
  if (req.session.isAuthenticated) {
    return res.json({ isAuthenticated: true, user: req.session.user });
  }
  res.status(401).json({ isAuthenticated: false });
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.clearCookie('connect.sid');
    res.json({ success: true });
  });
});

module.exports = router;