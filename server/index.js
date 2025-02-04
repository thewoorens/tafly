const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Vue uygulamasını sunmak için static dosyaları servis et
app.use(express.static(path.join(__dirname, '../dist')));

// Tüm istekleri Vue uygulamasına yönlendir
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});