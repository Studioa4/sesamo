import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import setupRoutes from './routes/setup.js';
import loginRoutes from './routes/login.js';
import accessiRoutes from './routes/accessi.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/setup', setupRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/accessi', accessiRoutes);

app.get('/', (req, res) => {
  res.send('Sesamo API REST è attiva');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sesamo API REST avviata su http://localhost:${PORT}`);
});