const express = require('express');
const Branch = require('../models/Branch');
const Business = require('../models/Business');

const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        console.log("🟩 Creating new Branch");

        const { name, address, social, phone, email, logo, ownerId, businessId } = req.body;

        if (!name || !address || !phone || !email || !ownerId || !businessId) {
            return res.status(400).json({ message: "Tüm alanlar zorunludur." });
        }

        const existingName = await Branch.findOne({ name, businessId });
        if (existingName) {
            return res.status(400).json({ message: 100 });
        }

        const existingPhone = await Branch.findOne({ phone, businessId });
        if (existingPhone) {
            return res.status(400).json({ message: 101 });
        }

        const existingEmail = await Branch.findOne({ email, businessId });
        if (existingEmail) {
            return res.status(400).json({ message: 102 });
        }

        const newBranch = new Branch({ name, address, social, phone, email, logo, ownerId, businessId });
        await newBranch.save();

        await Business.findByIdAndUpdate(businessId, { $set: { setup: true } });

        res.status(201).json({ message: "Şube başarıyla oluşturuldu." });
    } catch (err) {
        res.status(500).json({ message: "Sunucu hatası", error: err.message });
        console.log("Failed to create new branch: " + err.message);
    }
});


module.exports = router;
