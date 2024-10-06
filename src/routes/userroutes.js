// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../middleware/authmiddle');
const { register, login } = require('../controller/authcontroller');

//public register route
router.post('/register', register);

// Public login route
router.post('/login', login);

// Protected route for admins only
router.get('/admin', authenticateToken, authorizeRole(['admin']), (req, res) => {
    res.json({ message: 'This route is protected for admins!' });
});

// Protected route for regular users and admins
router.get('/user', authenticateToken, authorizeRole(['user', 'admin']), (req, res) => {
    res.json({ message: 'This route is for users and admins!' });
});

module.exports = router;
