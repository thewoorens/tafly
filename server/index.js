const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const apiServices = false;

app.get('/', (req, res) => {
    res.send({ API_Status: apiServices });
});

app.listen(port, () => {
    console.log(`Backend services running http://localhost:${port}`);
});