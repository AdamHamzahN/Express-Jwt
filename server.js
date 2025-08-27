// Entry point --> server.js
require('dotenv').config();
const express = require('express');
const app = express();

// Routes
const authRoutes = require('./src/routes/authRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const movieRoutes = require('./src/routes/movieRoutes');

// Middleware global parsing JSON
app.use(express.json());

// mount routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/movies', movieRoutes);

// basic error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({error : err.message || "Internal Server Error"});
});

// start
const PORT = process.env.port || 3000;
app.listen(PORT,() => {
    console.log(`Server berjalan pada port : ${PORT}`);
});