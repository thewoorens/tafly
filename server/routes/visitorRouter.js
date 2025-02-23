const express = require('express');
const Business = require('../models/Business');
const Category = require("../models/Category");
const User = require("../models/User");
const router = express.Router();

router.get('/get', async (req, res) => {
    try {
        const {visitorId} = req.query;

        if (!visitorId) {
            return res.status(400).json({message: "visitorId zorunludur."});
        }

        const business = await Business.findOne({visitorId});
        if (!business) {
            return res.status(404).json({message: "Şirket bulunamadı."});
        }

        const categories = await Category.find({businessId: business._id});
        console.log("AYARLAR: => "+ business.settings)
        res.status(200).json({
            name: business.name,
            address: business.address,
            type: business.type,
            social: business.social,
            phone: business.phone,
            email: business.email,
            logo: business.logo,
            visitorId: business.visitorId,
            categories: categories.map(category => ({
                tr: {
                    name: category.name,
                    description: category.description,
                },
                en: {
                    name: category.name + "English",
                    description: category.description + "English",
                }
            })),
            settings: business.settings
        });
    } catch (err) {
        res.status(500).json({message: "Sunucu hatası", error: err.message});
        console.log("Failed to fetch business: " + err.message);
    }
});


module.exports = router;
