// /routes/testBcrypt.js

import express from 'express';
import { testBcrypt } from '../controllers/testBcryptController.js';

const router = express.Router();

router.post('/', testBcrypt);

export default router;
