const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');

//CFG PORT
const PORT = process.env.PORT || 3002;

app.use(cors());

const bookJson = "booking.json";
const bookingJson = require(`./${bookJson}`);

app.get("/booking", (req, res) => {
    try {
        res.status(200).json(bookingJson);
    } catch (error) {
        res.status(400);
    }
});

app.get("/booking/:id", (req, res) => {
    try {
        var id = req.params.id;
        var data = bookingJson.soirees.find(s => s.id == id);
        res.status(200).json(data);
    } catch (error) {
        res.status(400);
        console.log(error);
    }
});

app.post("/booking", express.json(), (req, res) => {
    try {
        bookingJson.soirees.push(req.body)
        fs.writeFile(bookJson, JSON.stringify(bookingJson), (err) => {
            if (err) {
                console.log(`L'écriture dans le JSON a échoué, sa mère la teup: ${err}`);
                throw err;
            }
            console.log("L'écriture dans le JSON s'est bien passé");
        })
        res.status(200).json(bookingJson);
    } catch (error) {
        res.status(400);
        console.log(error);
    }
});

app.put("/booking/:id", express.json(), (req, res) => {
    try {
        const id = req.params.id;
        var soireeToModify = bookingJson.soirees.find(s => s.id == id);
        soireeToModify.nom = req.body.nom;
        soireeToModify.date = req.body.date;
        soireeToModify.playliste = req.body.playliste;
        soireeToModify.client = req.body.client;
        res.status(200).json(soireeToModify);
    } catch (error) {
        res.status(400);
        console.log(error);
    }
});

app.patch('/booking/:id', express.json(), (req, res) => {
    try {
        const id = req.params.id;
        console.log(req.params)
        var soireeToPatch = bookingJson.soirees.find(s => s.id == id);
        soireeToPatch.playliste = req.body.playliste;
        fs.writeFile(bookJson, JSON.stringify(bookingJson), (err) => {
            if (err) {
                console.log(`L'écriture dans le JSON a échoué, sa mère la teup: ${err}`);
                throw err;
            }
            console.log("L'écriture dans le JSON s'est bien passé");
        })
        res.status(200).json(bookingJson);
    } catch (error) {
        res.status(400);
        console.log(`T'as fait de la merde, connard : ${error}`);
    }
});

app.delete("/booking/:id", (req, res) => {

});

app.listen(PORT, () => {
    console.log("serveur à l'écoute");
});