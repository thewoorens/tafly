const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs');
const path = require('path');
app.use(cors());

const serverStatus = true;


app.get('/', (req, res) => {
    res.send({merhaba: "dost"});
});

app.get('/api/get/server-status', (req, res) => {
    res.send({ server: serverStatus });
});

app.get('/api/get/', (req, res) => {
    const userId = req.query.userId;
    const usersFilePath = path.join(__dirname, 'data/users.json');

    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send({ error: 'Failed to read users file' });
            return;
        }

        const users = JSON.parse(data);
        const user = users.userslist.find(u => u.id === parseInt(userId));

        if (user) {
            res.send(user);
        } else {
            res.status(404).send({ error: 'User not found' });
        }
    });
});

app.get('/api/get/version', (req, res) => {
    res.send({ version: '1.0.1', time: new Date });
});

app.listen(port, () => {
    console.log(`Backend services running http://localhost:${port}`);
});