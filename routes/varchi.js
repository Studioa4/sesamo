import express from 'express';
import { getVarchi } from '../controllers/varchiController.js';

const router = express.Router();

router.get('/', getVarchi);

export default router;
