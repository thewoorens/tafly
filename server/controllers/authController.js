const jwt = require('jsonwebtoken');
const {supabase} = require('../utils/supabase');
const {JWT_SECRET} = require('../utils/jwt');

async function login(req, res) {
    const { email, password } = req.body;

    try {
        // Supabase Auth ile giriş yap
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error || !data.user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // JWT token oluştur
        const token = jwt.sign({ userId: data.user.id }, JWT_SECRET, { expiresIn: '1h' });

        // Kullanıcı bilgilerini `users` tablosundan çek
        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('userId', data.user.id) // `userId` ile eşleştir
            .single();

        if (userError || !userData) {
            return res.status(500).json({ error: 'Failed to fetch user data', details: userError?.message });
        }

        // Token'ı cookie olarak ayarla
        res.cookie('auth-token', token, { httpOnly: true, secure: false, sameSite: 'Strict', maxAge: 604800 });

        // Başarılı yanıt
        res.json({
            success: true,
            token,
            user: {
                id: userData.userId,
                email: userData.email,
                business_name: userData.business_name,
                business_type: userData.business_type,
                owner_first_name: userData.owner_first_name,
                owner_last_name: userData.owner_last_name,
            },
        });
    } catch (err) {
        console.error("❌ Unexpected error:", err);
        res.status(500).json({ error: 'An unexpected error occurred', details: err.message });
    }
}
async function register(req, res) {
    const {email, password, ownerFirstName, ownerLastName} = req.body;

    if (!email || !password) {
        return res.status(400).json({error: 'Email and password are required'});
    }

    try {
        // Supabase Auth ile kullanıcı kaydı
        const {data: authData, error: authError} = await supabase.auth.signUp({email, password});

        if (authError) {
            return res.status(500).json({error: 'Failed to register user', details: authError.message});
        }

        const userId = authData.user?.id;

        if (!userId) {
            return res.status(500).json({error: 'User ID not found after registration'});
        }

        // Kullanıcı bilgilerini `users` tablosuna kaydet
        const {data: userData, error: userError} = await supabase
            .from('users')
            .insert([{
                userId, // Supabase Auth'tan gelen UUID
                email,
                owner_first_name: ownerFirstName,
                owner_last_name: ownerLastName
            }])
            .select();

        if (userError) {
            return res.status(500).json({error: 'Failed to save user data', details: userError.message});
        }

        res.json({authData, userData});
    } catch (err) {
        res.status(500).json({error: 'An unexpected error occurred', details: err.message});
    }
}

function logout(req, res) {
    res.clearCookie('auth-token');
    res.json({success: true, message: 'Logged out successfully'});
}

module.exports = {login, register, logout};