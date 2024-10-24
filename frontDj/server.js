const express = require('express');
const app = express();

app.use(express.static('.'));
//CHECK IF SERVER IS RUNNING
app.get('/check', (req, res) => {
    try {
        res.status(200).json({ status: '200' });

    } catch (error) {
        res.status(500).json({ status: '500' });
    }
});

app.listen(3004, () => {
    console.log('lancement du serveur.');
});