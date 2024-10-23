const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const clientsFilePath = path.join(__dirname, '../data/client.json');

// Helper function to read clients from the JSON file
const readClientsFromFile = () => {
    try {
        const data = fs.readFileSync(clientsFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading file from disk: ${error}`);
        return [];
    }
};

// Helper function to write clients to the JSON file
const writeClientsToFile = (clients) => {
    try {
        fs.writeFileSync(clientsFilePath, JSON.stringify(clients, null, 2));
    } catch (error) {
        console.error(`Error writing file to disk: ${error}`);
    }
};

// Criar um novo cliente
router.post('/', (req, res) => {
    try {
        const clients = readClientsFromFile();
        const newClient = { id: uuidv4(), ...req.body };
        clients.push(newClient);
        writeClientsToFile(clients);
        res.status(201).send(newClient);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Obter todos os clientes
router.get('/', (req, res) => {
    try {
        const clients = readClientsFromFile();
        res.status(200).send(clients);
        console.log('Client GET - listed');

    } catch (error) {
        res.status(500).send(error);
    }
});

// Obter um cliente por ID
router.get('/:id', (req, res) => {
    try {
        const clients = readClientsFromFile();
        const client = clients.find(c => c.id === req.params.id);
        if (!client) {
            return res.status(404).send();
        }
        res.status(200).send(client);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Atualizar um cliente por ID
router.put('/:id', (req, res) => {
    try {
        const clients = readClientsFromFile();
        const index = clients.findIndex(c => c.id === req.params.id);
        if (index === -1) {
            return res.status(404).send();
        }
        clients[index] = { ...clients[index], ...req.body };
        writeClientsToFile(clients);
        res.status(200).send(clients[index]);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Deletar um cliente por ID
router.delete('/:id', (req, res) => {
    try {
        const clients = readClientsFromFile();
        const index = clients.findIndex(c => c.id === req.params.id);
        if (index === -1) {
            return res.status(404).send();
        }
        const deletedClient = clients.splice(index, 1);
        writeClientsToFile(clients);
        res.status(200).send(deletedClient);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;