import express from 'express';
import { getStorico } from '../controllers/storicoController.js';

const router = express.Router();

router.get('/', getStorico);

export default router;
