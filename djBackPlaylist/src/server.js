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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});