// app.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Routes
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const userRoutes = require('./routes/user');
const generalRoutes = require('./routes/general');

app.get('/', (req, res) => {
    res.send({poweredBy: "kernelsoftware(BDT)"});
})

app.use('/api', authRoutes);
app.use('/api', categoryRoutes);
app.use('/api', userRoutes);
app.use('/api', generalRoutes);

// Error Handling Middleware (4 parametreli olmalı)
app.use((err, req, res, next) => {
    console.error("❌ Error:", err.message);
    res.status(500).json({error: 'Internal Server Error'});
});

app.listen(port, () => {
    console.log(`🚀 Backend services running at http://localhost:${port}`);
});