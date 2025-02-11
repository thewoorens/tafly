// utils/multer.js
const multer = require('multer');
const path = require('path');

// Dosya depolama ayarları
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Dosyaların kaydedileceği klasör
    },
    filename: (req, file, cb) => {
        // Dosya adını benzersiz hale getir (timestamp + orijinal uzantı)
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Multer middleware'ini oluştur
const upload = multer({ storage });

// Multer middleware'ini export et
module.exports = upload;