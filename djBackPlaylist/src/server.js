const express = require('express');
const cors = require('cors');
const playlistRoutes = require('./router/playlist');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const app = express();


// const axios = require('axios');

const PORT = process.env.PORT || 3001;
// CFG static files
app.use(express.static(path.join(__dirname, 'public')));

// CFG CORS
app.use(cors());
app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());
app.use('/playlists', playlistRoutes);

const Consul = require('consul');
const consulName = "api-playlist";
const os = require('os');
const networkAdress = os.networkInterfaces();
const containerIp = networkAdress['eth0'][0].address;

const registerAPI = async () => {
  var id = uuidv4();
  const consul = new Consul({ host: 'consul' });
  await consul.agent.service.register(
    {
      name: consulName,
      id: id,
      address: containerIp,
      port: 3001,
      check: {
        http: `http://${containerIp}:3001/check`,
        interval: "15s",
        timeout: "45s"
      }
    });
}

app.get('/', (req, res) => {
  res.sendFile(patch.join(__dirname, 'public', 'index.html'));
});

//check if server is running
app.get('/check', (req, res) => {
  try {
    res.status(200).json({ status: '200' });

  } catch (error) {
    res.status(500).json({ status: '500' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  registerAPI();
});