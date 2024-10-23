const express = require('express');
const fs = require('fs');
const app = express();

//CFG PORT
const PORT = process.env.PORT || 3002;

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
        var data = bookingJson[id];
        console.log(data);
        res.status(200).json(data);
    } catch (error) {
        res.status(400);
        console.log(error);
    }
});

app.post("/booking", express.json(), (req, res) => {
    try {
        console.log(req.body);
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

app.put("/booking/{id}", express.json(), (req, res) => {

});

app.delete("/booking/{id}", (req, res) => {

});

app.listen(PORT, () => {
    console.log("serveur à l'écoute");
});