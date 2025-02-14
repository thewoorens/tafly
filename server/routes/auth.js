const express = require('express');
const router = express.Router();
const {login, logout, register} = require('../controllers/authController'); // Controller fonksiyonlarını import et
const {authenticateToken} = require('../middlewares/authMiddleware');

router.post('/post/login', login);
router.post('/post/register', register);
router.post('/logout', authenticateToken, logout);
router.get('/protected', authenticateToken, (req, res) => {
    try {
        console.log("✅ Protected route accessed by:", req.user);
        res.status(200).json({message: 'Protected data', user: req.user});
    } catch (err) {
        console.error("❌ Error in protected route:", err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


module.exports = router;