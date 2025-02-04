const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send({ message: 'Hello !' });
});

app.listen(port, () => {
    console.log(`Backend services running http://localhost:${port}`);
});