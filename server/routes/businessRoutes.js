const express = require('express');
const Business = require('../models/Business');
const User = require('../models/User');

const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        console.log("🟩 Creating new Business");
        const { name, address, type, social, phone, email, logo, ownerId } = req.body;

        // Tüm alanların dolu olup olmadığını kontrol et
        if (!name || !address || !type || !phone || !email || !ownerId) {
            return res.status(400).json({ message: "Tüm alanlar zorunludur." });
        }

        // Benzersiz alanları kontrol et
        const existingName = await Business.findOne({ name });
        if (existingName) {
            return res.status(400).json({ message: 100 }); // Şirket adı zaten var
        }

        const existingPhone = await Business.findOne({ phone });
        if (existingPhone) {
            return res.status(400).json({ message: 101 }); // Telefon numarası zaten var
        }

        const existingEmail = await Business.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 102 }); // E-posta zaten var
        }

        const newBusiness = new Business({ name, address, type, social, phone, email, logo, ownerId });
        await newBusiness.save();

        await User.findByIdAndUpdate(ownerId, { $set: { setup: true } });

        res.status(201).json({ message: "Şirket başarıyla oluşturuldu." });
    } catch (err) {
        res.status(500).json({ message: "Sunucu hatası", error: err.message });
        console.log("Failed to create new business: " + err.message);
    }
});


module.exports = router;
