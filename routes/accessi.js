import express from 'express';
import { logAccesso, getAccessi } from '../controllers/accessiController.js';

const router = express.Router();

router.post('/', logAccesso);
router.get('/', getAccessi);

export default router;