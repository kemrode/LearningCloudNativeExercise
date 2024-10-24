const express = require('express');
const cors = require('cors');
const clientRoutes = require('./router/client');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;
// CFG static files
app.use(express.static(path.join(__dirname, 'public')));

// CFG CORS
app.use(cors());

app.use(express.json());
app.use('/clients', clientRoutes);

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