const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const itemRoutes = require('./routes/itemRoutes');
const authRoutes = require('./routes/authRoutes');
const businessRoutes = require('./routes/businessRoutes');
const branchRoutes = require('./routes/branchRoutes')
const categoryRoutes = require('./routes/categoryRouter');
const visitorRoutes = require('./routes/visitorRouter');
const cors = require('cors');
const jwt = require("jsonwebtoken");
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/', async (req, res) => {
    res.status(200).json({kernel: 'software'});
});

// ✅ Yetkilendirme Middleware
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({message: "Yetkilendirme reddedildi, token eksik"});
    }

    try {
        const tokenValue = token.split(" ")[1]; // "Bearer" önekini kaldır
        req.user = jwt.verify(tokenValue, process.env.JWT_SECRET); // Kullanıcı bilgilerini req.user içine ekle
        next();
    } catch (error) {
        res.status(403).json({message: "Geçersiz token"});
    }
};

app.get('/api/auth/verify', authMiddleware, (req, res) => {
    res.status(200).json({message: "Token geçerli", user: req.user});
});

app.get('/api/protected', authMiddleware, (req, res) => {
    res.json({message: "Bu veri sadece yetkili kullanıcılar içindir.", user: req.user});
});

const connectWithRetry = () => {
    mongoose.connect(process.env.MONGODB_URI, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    })
        .then(() => console.log('✅  MongoDB bağlantısı başarılı! (TaflyCP veritabanı)'))
        .catch(err => {
            console.log('❌  MongoDB bağlantı hatası:', err.message);
            setTimeout(connectWithRetry, 5000); // 5 saniye sonra tekrar dene
        });
};

connectWithRetry();

app.use('/api', itemRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/branch', branchRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/visitor', visitorRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`✅  Backend Server Running on Port: http://localhost:${port}`));
