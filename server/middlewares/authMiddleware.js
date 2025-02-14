const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/jwt');

function authenticateToken(req, res, next) {
    const token = req.cookies['auth-token'] || (req.headers['authorization'] && req.headers['authorization'].split(' ')[1]);

    if (!token) {
        return res.status(401).json({ error: 'Access Denied: No Token' });
    }

    try {
        req.user = jwt.verify(token, JWT_SECRET);
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Invalid Token' });
    }
}

module.exports = { authenticateToken };