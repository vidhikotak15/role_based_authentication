// server.js
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

// Initialize express app
const app = express();
require('dotenv').config();
// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Use the user routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
