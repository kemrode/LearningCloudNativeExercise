const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const playlistsFilePath = path.join(__dirname, '../data/playlist.json');

const readPlaylistsFromFile = () => {
    try {
        const data = fs.readFileSync(playlistsFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading file from disk: ${error}`);
        return [];
    }
};

const writePlaylistsToFile = (playLists) => {
    try {
        fs.writeFileSync(playlistsFilePath, JSON.stringify(playLists, null, 2));
    } catch (error) {
        console.error(`Error writing file to disk: ${error}`);
    }
};

router.post('/', (req, res) => {
    try {
        const playLists = readPlaylistsFromFile();
        const newPlaylist = { id: uuidv4(), ...req.body };
        playLists.push(newPlaylist);
        writePlaylistsToFile(playLists);
        res.status(201).send(newPlaylist);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Obter todos os clientes
router.get('/', (req, res) => {
    try {
        const playLists = readPlaylistsFromFile();
        res.status(200).send(playLists);
        console.log('Client GET - listed');

    } catch (error) {
        res.status(500).send(error);
    }
});

// Obter um cliente por ID
router.get('/:id', (req, res) => {
    try {
        const playLists = readPlaylistsFromFile();
        const playlist = playLists.playlists.find(c => c.id === parseInt(req.params.id));
        if (!playlist) {
            return res.status(404).send();
        }
        res.status(200).json(playlist);
    } catch (error) {
        console.log(`L'erreur remontée est: ${error}`)
        res.status(500).send(error);
    }
});

// Atualizar um cliente por ID
router.put('/:id', (req, res) => {
    try {
        const playLists = readPlaylistsFromFile();
        const index = playLists.findIndex(c => c.id === req.params.id);
        if (index === -1) {
            return res.status(404).send();
        }
        playLists[index] = { ...playLists[index], ...req.body };
        writePlaylistsToFile(playLists);
        res.status(200).send(playLists[index]);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Deletar um cliente por ID
router.delete('/:id', (req, res) => {
    try {
        const playLists = readPlaylistsFromFile();
        const index = playLists.findIndex(c => c.id === req.params.id);
        if (index === -1) {
            return res.status(404).send();
        }
        const deletedPlaylist = playLists.splice(index, 1);
        writeClientsToFile(playLists);
        res.status(200).send(deletedPlaylist);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;