// controllers/authController.js
const jwt = require('jsonwebtoken');
const {supabase} = require('../utils/supabase');
const {JWT_SECRET} = require('../utils/jwt');

async function login(req, res) {
    const {email, password} = req.body;

    try {
        const {data, error} = await supabase.auth.signInWithPassword({email, password});

        if (error || !data.user) {
            return res.status(401).json({error: 'Invalid credentials'});
        }

        const token = jwt.sign({userId: data.user.id}, JWT_SECRET, {expiresIn: '1h'});

        const {data: userData, error: userError} = await supabase
            .from('users')
            .select('*')
            .eq('userId', data.user.id)
            .single();

        if (userError || !userData) {
            return res.status(500).json({error: 'Failed to fetch user data'});
        }

        res.cookie('auth-token', token, {httpOnly: true, secure: false, sameSite: 'Strict', maxAge: 604800});
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
        res.status(500).json({error: 'An unexpected error occurred'});
    }
}

async function register(req, res) {
    const {email, password, businessName, businessType, ownerFirstName, ownerLastName} = req.body;

    try {
        const {data: authData, error: authError} = await supabase.auth.signUp({email, password});

        if (authError) {
            return res.status(500).json({error: 'Failed to register user'});
        }

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
            return res.status(500).json({error: 'Failed to save user data'});
        }

        res.json({authData, userData});
    } catch (err) {
        res.status(500).json({error: 'An unexpected error occurred'});
    }
}

function logout(req, res) {
    res.clearCookie('auth-token');
    res.json({success: true, message: 'Logged out successfully'});
}

module.exports = {login, register, logout};