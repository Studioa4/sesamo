import express from 'express';
import { configuraAccesso } from '../controllers/accessiConfiguraController.js';
import { abilitaAccesso } from '../controllers/accessiAbilitaController.js';

const router = express.Router();

// Route per configurare un varco
router.post('/configura', configuraAccesso);

// Route per abilitare un utente ad aprire un varco
router.post('/abilita', abilitaAccesso);

export default router;
