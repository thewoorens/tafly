const {supabase} = require('../utils/supabase');

async function getUser(req, res) {
    const {userId} = req.query;

    if (!userId) {
        return res.status(400).json({error: 'userId is required'});
    }

    try {
        const {data, error} = await supabase
            .from('users')
            .select('*')
            .eq('userId', userId);

        if (error) {
            return res.status(500).json({error: 'Failed to fetch user data'});
        }

        if (!data || data.length === 0) {
            return res.status(404).json({error: 'User not found'});
        }

        res.json(data);
    } catch (err) {
        res.status(500).json({error: 'An unexpected error occurred'});
    }
}

async function saveBusinessInfo(req, res) {
    const {userId, business_name, business_type, setup_status, business_address, phone, email, socialMedia} = req.body;

    // Zorunlu alanların kontrolü
    if (!userId || !business_name || !business_address || !phone || !email || !business_type || setup_status === undefined) {
        return res.status(400).json({error: 'Missing required fields'});
    }

    try {
        // Sadece işletme bilgilerini güncelle
        const {data, error} = await supabase
            .from('users')
            .upsert([
                {
                    userId, // userId'ye göre güncelleme yap
                    email,
                    business_name,
                    business_type,
                    setup_status,
                    business_address,
                    phone_number: phone, // phone_number sütunu ile eşleştir
                    social_media: socialMedia // JSON formatında
                }
            ])
            .eq('userId', userId) // userId'ye göre eşleştir
            .select();

        if (error) {
            return res.status(500).json({error: 'Failed to save business data', details: error.message});
        }

        res.json(data);
    } catch (err) {
        res.status(500).json({error: 'An unexpected error occurred', details: err.message});
    }
}


module.exports = {getUser, saveBusinessInfo};