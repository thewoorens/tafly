const fs = require('fs');
const {supabase} = require('../utils/supabase');

async function getCategories(req, res) {
    const {ownerId} = req.query;

    if (!ownerId) {
        return res.status(400).json({error: 'ownerId is required'});
    }

    try {
        const {data, error} = await supabase
            .from('category')
            .select('*')
            .eq('ownerId', ownerId);

        if (error) {
            return res.status(500).json({error: 'Failed to fetch categories'});
        }

        res.json({success: true, data});
    } catch (err) {
        res.status(500).json({error: 'An unexpected error occurred'});
    }
}

async function createCategory(req, res) {
    const {name, description, ownerId} = req.body;
    const file = req.file;

    if (!name || !description || !file || !ownerId) {
        return res.status(400).json({error: 'Missing fields'});
    }

    try {
        const filePath = `categories/${Date.now()}_${file.originalname}`;
        const fileBuffer = fs.readFileSync(file.path);

        const {error: uploadError} = await supabase
            .storage
            .from('uploads')
            .upload(filePath, fileBuffer, {contentType: file.mimetype});

        if (uploadError) {
            return res.status(500).json({error: 'Failed to upload image'});
        }

        const imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/uploads/${filePath}`;

        const {data, error} = await supabase
            .from('category')
            .insert([{name, description, image: imageUrl, ownerId}])
            .select();

        if (error) {
            return res.status(500).json({error: 'Failed to create category'});
        }

        res.json({success: true, data});
    } catch (err) {
        res.status(500).json({error: 'An unexpected error occurred'});
    }
}

async function deleteCategory(req, res) {
    const {id} = req.query;
    const ownerId = req.user.userId; // authenticateToken tarafından eklenen kullanıcı bilgisi

    if (!id || !ownerId) {
        return res.status(400).json({error: 'Missing fields (id or ownerId)'});
    }

    try {
        const {data: categoryData, error: categoryError} = await supabase
            .from('category')
            .select('*')
            .eq('id', id)
            .eq('ownerId', ownerId);

        if (categoryError) {
            return res.status(500).json({error: 'Failed to fetch category data'});
        }

        if (!categoryData || categoryData.length === 0) {
            return res.status(404).json({error: 'Category not found'});
        }

        const category = categoryData[0];
        const filePath = category.image.split('/storage/v1/object/public/uploads/')[1];

        const {error: deleteImageError} = await supabase
            .storage
            .from('uploads')
            .remove([filePath]);

        if (deleteImageError) {
            return res.status(500).json({error: 'Failed to delete image'});
        }

        const {error: deleteCategoryError} = await supabase
            .from('category')
            .delete()
            .eq('id', id)
            .eq('ownerId', ownerId);

        if (deleteCategoryError) {
            return res.status(500).json({error: 'Failed to delete category'});
        }

        res.json({success: true, message: 'Category deleted successfully'});
    } catch (err) {
        console.error("❌ Unexpected error:", err);
        res.status(500).json({error: 'An unexpected error occurred'});
    }
}

async function getCategoryById(req, res) {
    const categoryId = req.params.id;
    const {ownerId} = req.query;

    if (!categoryId || !ownerId) {
        return res.status(400).json({error: 'Missing fields (categoryId or ownerId)'});
    }

    try {
        const {data, error} = await supabase
            .from('category')
            .select('*')
            .eq('id', categoryId)
            .eq('ownerId', ownerId);

        if (error) {
            return res.status(500).json({error: 'Failed to fetch category'});
        }

        if (!data || data.length === 0) {
            return res.status(404).json({error: 'Category not found'});
        }

        res.json({success: true, data: data[0]});
    } catch (err) {
        res.status(500).json({error: 'An unexpected error occurred'});
    }
}

module.exports = {getCategories, createCategory, deleteCategory, getCategoryById};