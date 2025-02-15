const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();


router.get('/setup/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı." });
        }

        res.status(200).json({ setup: user.setup });
    } catch (err) {
        res.status(500).json({ message: "Sunucu hatası", error: err.message });
        console.log("Failed to fetch user setup status: " + err.message);
    }
});



router.post('/register', async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({message: "Tüm alanlar zorunludur."});
        }

        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: "Bu e-posta zaten kullanılıyor."});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({email, password: hashedPassword});
        await newUser.save();

        res.status(201).json({message: "Kullanıcı başarıyla oluşturuldu."});
    } catch (error) {
        res.status(500).json({message: "Sunucu hatası", error: error.message});
    }
});

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({message: "E-posta ve şifre gereklidir."});
        }

        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message: "Geçersiz e-posta veya şifre."});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: "Geçersiz e-posta veya şifre."});
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "30d"});

        const userData = user.toObject();
        delete userData.password;

        res.status(200).json({
            message: "Giriş başarılı",
            token,
            user: userData
        });
    } catch (error) {
        res.status(500).json({message: "Sunucu hatası", error: error.message});
    }
});


module.exports = router;
