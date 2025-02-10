const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const fs = require("fs");
const multer = require("multer");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const JWT_SECRET = process.env.JWT_SECRET || 'SECRET_KEY';

const {createClient} = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

function log2(req, res, next) {
    console.log(`📡 [${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    console.log(`📨 Body: `, req.body);
    console.log(`📝 Headers: `, req.headers);
    next();
}

app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(log2);

const serverStatus = true;

app.get('/', (req, res) => {
    res.send({merhaba: "dost"});
});

app.get('/api/get/server-status', (req, res) => {
    console.log("✅ Server status endpoint called");
    res.send({server: serverStatus});
});

app.get('/api/get/version', (req, res) => {
    console.log("✅ Version endpoint called");
    res.send({version: '1.0.0', time: new Date()});
});

app.get('/api/get/user', async (req, res) => {
    console.log("🔍 User fetch endpoint called");
    const {userId} = req.query;

    try {
        const {data, error} = await supabase
            .from('users')
            .select('*')
            .eq('userId', userId);

        if (error) {
            console.error("❌ User fetch error:", error);
            return res.status(500).json({error: 'Failed to fetch user data'});
        }

        if (data.length === 0) {
            return res.status(404).json({error: 'User not found'});
        }

        console.log("✅ User data fetched:", data);
        res.json(data);
    } catch (err) {
        console.error("❌ Unexpected error:", err);
        res.status(500).json({error: 'An unexpected error occurred'});
    }
});

app.get('/api/get/editCategory/:id', async (req, res) => {
    const categoryId = req.params.id; // URL'den kategori ID'sini al
    const {ownerId} = req.query; // Query parametresinden ownerId'yi al

    console.log("📂 Edit category fetch endpoint called");

    // Gerekli parametrelerin kontrolü
    if (!categoryId || !ownerId) {
        return res.status(400).json({error: 'Kategori ID ve ownerId gereklidir.'});
    }

    try {
        // Supabase'den kategoriyi çek
        const {data, error} = await supabase
            .from('category') // Tablo adı
            .select('*') // Tüm sütunları seç
            .eq('id', categoryId) // Kategori ID'sine göre filtrele
            .eq('ownerId', ownerId); // ownerId'ye göre filtrele

        // Hata kontrolü
        if (error) {
            console.error("❌ Category fetch error:", error.message);
            return res.status(500).json({error: 'Kategori çekilirken bir hata oluştu.'});
        }

        // Kategori bulunamazsa
        if (!data || data.length === 0) {
            return res.status(404).json({error: 'Kategori bulunamadı.'});
        }

        // Kategori verilerini döndür
        console.log("✅ Category fetched successfully:", data[0]);
        res.status(200).json({success: true, data: data[0]});
    } catch (err) {
        console.error("❌ Unexpected error:", err.message);
        res.status(500).json({error: 'Beklenmeyen bir hata oluştu.'});
    }
});

app.post('/api/post/register', async (req, res) => {
    console.log("🔑 Register endpoint called");
    const {email, password, businessName, businessType, ownerFirstName, ownerLastName} = req.body;

    try {
        const {data: authData, error: authError} = await supabase.auth.signUp({email, password});

        if (authError) {
            console.error("❌ Register error:", authError);
            return res.status(500).json({error: 'Failed to register user'});
        }

        console.log("✅ User registered successfully:", authData.user.id);
        const userId = authData.user.id;

        const {data: userData, error: userError} = await supabase
            .from('users')
            .insert([{
                userId,
                email,
                business_name: businessName,
                business_type: businessType,
                owner_first_name: ownerFirstName,
                owner_last_name: ownerLastName
            }])
            .select();

        if (userError) {
            console.error("❌ User data save error:", userError);
            return res.status(500).json({error: 'Failed to save user data'});
        }

        console.log("✅ User data saved:", userData);
        res.json({authData, userData});
    } catch (err) {
        console.error("❌ Unexpected error:", err);
        res.status(500).json({error: 'An unexpected error occurred'});
    }
});

app.get('/api/get/categories', async (req, res) => {
    console.log("📂 Category fetch endpoint called");

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
            console.error("❌ Category fetch error:", error.message);
            return res.status(500).json({error: 'Failed to fetch categories'});
        }

        if (!data || data.length === 0) {
            return res.status(200).json({});
        }

        console.log("✅ Categories fetched successfully:", data);
        res.json({success: true, data});

    } catch (err) {
        console.error("❌ Unexpected error:", err.message);
        res.status(500).json({error: 'An unexpected error occurred'});
    }
});

const upload = multer({dest: "uploads/"});

app.post('/api/post/createCategory', upload.single("image"), async (req, res) => {
    console.log("📂 Category creation endpoint called");

    const {name, description, ownerId} = req.body;
    const file = req.file;

    console.log("📥 Received Data:", req.body);

    if (!name || !description || !file || !ownerId) {
        return res.status(400).json({error: 'Eksik alanlar var!'});
    }

    try {
        // Kullanıcı kontrolü
        const {data: userData, error: userError} = await supabase
            .from('users')
            .select('*')
            .eq('userId', ownerId);

        if (userError) {
            console.error("❌ User fetch error:", userError);
            return res.status(500).json({error: 'Failed to fetch user data'});
        }

        if (!userData || userData.length === 0) {
            return res.status(404).json({error: 'User not found'});
        }

        const filePath = `categories/${Date.now()}_${file.originalname}`;
        const fileBuffer = fs.readFileSync(file.path);

        const {error: uploadError} = await supabase
            .storage
            .from("uploads")
            .upload(filePath, fileBuffer, {contentType: file.mimetype});

        if (uploadError) {
            console.error("❌ Image upload error:", uploadError.message);
            return res.status(500).json({error: 'Failed to upload image'});
        }

        // 📎 Yüklenen resmin URL’sini al
        const imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/uploads/${filePath}`;

        // 📝 Kategoriyi oluştur
        const {data, error} = await supabase
            .from('category')
            .insert([{name, description, image: imageUrl, ownerId}])
            .select();

        if (error) {
            console.error("❌ Category creation error:", error.message);
            return res.status(500).json({error: 'Failed to create category'});
        }

        console.log("✅ Category created successfully:", data);
        res.json({success: true, data});

    } catch (err) {
        console.error("❌ Unexpected error:", err.message);
        res.status(500).json({error: 'An unexpected error occurred'});
    }
});

app.delete('/api/delete/deleteCategory', async (req, res) => {
    console.log("🗑️ Category deletion endpoint called");

    const {id, ownerId} = req.query;

    console.log("📥 Received Data:", {id, ownerId});

    if (!id || !ownerId) {
        return res.status(400).json({error: 'Eksik alanlar var! (id veya ownerId)'});
    }

    try {
        const {data: categoryData, error: categoryError} = await supabase
            .from('category')
            .select('*')
            .eq('id', id)
            .eq('ownerId', ownerId);

        if (categoryError) {
            console.error("❌ Category fetch error:", categoryError);
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
            console.error("❌ Image deletion error:", deleteImageError.message);
            return res.status(500).json({error: 'Failed to delete image'});
        }

        const {error: deleteCategoryError} = await supabase
            .from('category')
            .delete()
            .eq('id', id)
            .eq('ownerId', ownerId);

        if (deleteCategoryError) {
            console.error("❌ Category deletion error:", deleteCategoryError.message);
            return res.status(500).json({error: 'Failed to delete category'});
        }

        console.log("✅ Category deleted successfully");
        res.json({success: true, message: 'Category deleted successfully'});

    } catch (err) {
        console.error("❌ Unexpected error:", err.message);
        res.status(500).json({error: 'An unexpected error occurred'});
    }
});

function authenticateToken(req, res, next) {
    const token = req.cookies['auth-token'] || req.headers['authorization']?.split(' ')[1];

    console.log("🔍 Token received:", token);  // Debug için ekledik

    if (!token) {
        console.warn("⚠️ Access Denied: No token provided");
        return res.status(401).json({error: "Access Denied: No Token"});
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Token verified:", req.user);
        next();
    } catch (err) {
        console.error("❌ Invalid Token:", err);
        return res.status(403).json({error: "Invalid Token"});
    }
}


// 🛠️ Protected Route
app.get('/api/protected', authenticateToken, (req, res) => {
    console.log("✅ Protected route accessed by:", req.user);
    res.json({message: 'Protected data', user: req.user});
});


app.post('/api/logout', (req, res) => {
    res.clearCookie('auth-token');
    console.log("✅ User logged out");
    res.json({success: true, message: 'Logged out successfully'});
});

app.post('/api/post/login', async (req, res) => {
    console.log("🔑 Login endpoint called");
    const {email, password} = req.body;

    try {
        const {data, error} = await supabase.auth.signInWithPassword({email, password});

        if (error || !data.user) {
            console.warn("❌ Invalid credentials:", error);
            return res.status(401).json({error: 'Invalid credentials'});
        }

        const token = jwt.sign({id: data.user.id}, JWT_SECRET, {expiresIn: '1h'});

        res.cookie('auth-token', token, {
            httpOnly: true,
            secure: false, //TODO: 🚨 Localhost'ta false, prod ortamda true olmalı
            sameSite: 'Strict',
            maxAge: 604800 // 7 gün
        });

        console.log("✅ Login successful, token generated");
        res.json({success: true, token});
    } catch (err) {
        console.error("❌ Unexpected error:", err);
        res.status(500).json({error: 'An unexpected error occurred'});
    }
});


app.listen(port, () => {
    console.log(`🚀 Backend services running at http://localhost:${port}`);
});
