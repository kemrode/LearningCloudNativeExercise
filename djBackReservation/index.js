const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');
const internal = require('stream');
let fetch;
(async () => {
    fetch = (await import('node-fetch')).default;
})();

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

// Endpoint POST pour ajouter une réservation
app.post("/booking", express.json(), async (req, res) => {
    try {
        const playlist = await GetPlaylist(req.body.playlist);
        // Pousser la nouvelle réservation dans le tableau "soirees"
        const nouvelleSoiree = req.body;
        nouvelleSoiree.playlist = playlist;
        console.log(`Notre nouvelle soirée est: ${nouvelleSoiree}`);
        bookingJson.soirees.push(nouvelleSoiree);
        // Écrire dans le fichier booking.json
        fs.writeFile(bookJson, JSON.stringify(bookingJson, null, 2), (err) => {
            if (err) {
                console.error(`Erreur d'écriture dans le JSON : ${err}`);
                throw err;
            }
            console.log("Réservation ajoutée avec succès dans le JSON");
        });

        // Retourner les données à jour
        res.status(200).json(bookingJson);
    } catch (error) {
        console.error("Erreur lors de l'ajout de la réservation : ", error);
        res.status(400).send('Erreur lors de l\'ajout de la réservation');
    }
});

app.put("/booking/:id", express.json(), (req, res) => {
    try {
        const id = req.params.id;
        var soireeToModify = bookingJson.soirees.find(s => s.id == id);
        soireeToModify.playlist = req.body.playlist;
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

async function GetPlaylist(id) {
    return await fetch(`http://api-playlist:3001/playlists/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        console.log(JSON.stringify(res))
        return res.json();
    }).catch((error) => {
        console.log(`Une erreur est survenue: ${error}`);
        return 0;
    })
}

app.listen(PORT, () => {
    console.log("serveur à l'écoute");
});