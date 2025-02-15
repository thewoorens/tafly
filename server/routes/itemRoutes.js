const express = require('express');
const Item = require('../models/itemModel');

const router = express.Router();

router.post('/item', async (req, res) => {
    try {
        const { name, description, price } = req.body;

        if (!name || !description || !price) {
            return res.status(400).json({ message: 'Tüm alanlar zorunludur.' });
        }

        const newItem = new Item({ name, description, price });
        await newItem.save();

        res.status(201).json({ message: 'Ürün başarıyla eklendi!', item: newItem });
    } catch (error) {
        res.status(500).json({ message: 'Bir hata oluştu', error: error.message });
    }
});

router.get('/item', async (req, res) => {
    try {
        const { name, description, price } = req.query; // 🔹 req.body yerine req.query kullanıyoruz
        if (!name || !description || !price) {
            return res.status(400).json({ message: 'Tüm alanlar zorunludur.' });
        }

        res.status(200).json({
            message: 'Item successfully received!',
            item: { name, description, price }
        });
    } catch (error) {
        res.status(500).json({ message: 'Bir hata oluştu', error: error.message });
    }
});

router.get('/item/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({message: 'Item not found'});
        res.status(200).json({item})
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

router.put('/item/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!item) return res.status(404).json({message: 'Item not found'});
        res.status(200).json({item});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})

router.delete('/item/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({message: 'Item not found'});
        res.status(200).json({message: 'Item deleted'});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})

module.exports = router;