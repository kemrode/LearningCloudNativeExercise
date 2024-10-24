const express = require('express');
const cors = require('cors');
const playlistRoutes = require('./router/playlist');
const path = require('path');

const app = express();

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

const consul = require('consul');
const consulName = "api-playlist";

await consul.Agent.Service.register({ name: consulName, id: 123456789, address: "http://api-playlist", port: 3001 });

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
});