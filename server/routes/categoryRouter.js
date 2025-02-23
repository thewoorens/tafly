const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const mongoose = require('mongoose');

// Kategori Oluşturma (Create)
router.post('/create', async (req, res) => {
    try {
        const {name, description, Image, ownerId, businessId} = req.body;

        if (!name || !description || !ownerId || !businessId) {
            return res.status(400).json({message: 'Lütfen tüm gerekli alanları doldurun.'});
        }

        if (!mongoose.Types.ObjectId.isValid(ownerId) || !mongoose.Types.ObjectId.isValid(businessId)) {
            return res.status(400).json({message: 'Geçersiz ownerId veya businessId.'});
        }

        const newCategory = new Category({
            name,
            description,
            Image,
            ownerId,
            businessId,
        });

        await newCategory.save();
        res.status(201).json({message: 'Kategori başarıyla oluşturuldu.', category: newCategory});
    } catch (error) {
        if (error.code === 11000) {
            return res.status(500).json({message: 'Kategori oluşturulurken bir hata oluştu.', error: error.message});
        }
    }
});
router.get('/getAll', async (req, res) => {
    try {
        const { ownerId } = req.query;

        let filter = {};
        if (ownerId) {
            filter.ownerId = ownerId;
        }

        const categories = await Category.find(filter).populate('ownerId', 'username email');
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Kategoriler getirilirken bir hata oluştu.', error: error.message });
    }
});

// Tek Bir Kategori Getirme (Read One)
router.get('/categories/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;


        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({message: 'Geçersiz kategori ID.'});
        }

        const category = await Category.findById(categoryId).populate('ownerId', 'username email');
        if (!category) {
            return res.status(404).json({message: 'Kategori bulunamadı.'});
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({message: 'Kategori getirilirken bir hata oluştu.', error: error.message});
    }
});

// Kategori Güncelleme (Update)
router.put('/categories/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;
        const {name, description, Image} = req.body;


        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({message: 'Geçersiz kategori ID.'});
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            {name, description, Image},
            {new: true, runValidators: true}
        );

        if (!updatedCategory) {
            return res.status(404).json({message: 'Kategori bulunamadı.'});
        }
        res.status(200).json({message: 'Kategori başarıyla güncellendi.', category: updatedCategory});
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({message: 'Bu isimde bir kategori zaten var.'});
        }
        res.status(500).json({message: 'Kategori güncellenirken bir hata oluştu.', error: error.message});
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { ownerId } = req.body; // ownerId, istek body'sinden alınır

        // Kategori ID'sinin geçerli olup olmadığını kontrol etme
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({ message: 'Geçersiz kategori ID.' });
        }

        // ownerId'nin geçerli olup olmadığını kontrol etme
        if (!mongoose.Types.ObjectId.isValid(ownerId)) {
            return res.status(400).json({ message: 'Geçersiz ownerId.' });
        }

        // Kategoriyi bul ve ownerId'yi kontrol et
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Kategori bulunamadı.' });
        }

        // Kategoriyi sadece sahibi silebilir
        if (category.ownerId.toString() !== ownerId) {
            return res.status(403).json({ message: 'Bu kategoriyi silme yetkiniz yok.' });
        }

        // Kategoriyi sil
        const deletedCategory = await Category.findByIdAndDelete(categoryId);
        res.status(200).json({ message: 'Kategori başarıyla silindi.', category: deletedCategory });
    } catch (error) {
        res.status(500).json({ message: 'Kategori silinirken bir hata oluştu.', error: error.message });
    }
});

module.exports = router;