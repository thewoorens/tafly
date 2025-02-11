const { supabase } = require('../utils/supabase');

async function getUser(req, res) {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
    }

    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('userId', userId);

        if (error) {
            return res.status(500).json({ error: 'Failed to fetch user data' });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
}

module.exports = { getUser };