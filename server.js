const express = require('express');
const cors = require('cors');
require('dotenv').config();

const setupRoutes = require('./routes/setup');
const loginRoutes = require('./routes/login');
const accessiRoutes = require('./routes/accessi');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/setup', setupRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/accessi', accessiRoutes);

app.get('/', (req, res) => {
  res.send('Sesamo API è attiva');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sesamo API avviata su http://localhost:${PORT}`);
});