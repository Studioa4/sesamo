const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Route principale
app.get('/', (req, res) => {
  res.send('Sesamo API è attiva');
});

// Avvio server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sesamo backend API in ascolto su http://localhost:${PORT}`);
});