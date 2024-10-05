// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/User_db');

//Register function
const register = async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'user already exists' });
        }
        const encryptpwd = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(password, encryptpwd);

        //create new user
        user = new User({
            username,
            email,
            password: hashedPwd,
            role,
        });

        // save user to db
        await user.save();

        res.status(201).json({ message: 'user successfully registered' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
};

// Login function
const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT with role
    const token = jwt.sign({ username: user.username, role: user.role }, 'SECRET_KEY', { expiresIn: '1h' });
    res.json({ token });
};

module.exports = { register, login };
