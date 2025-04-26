// /routes/createTestUser.js

import express from 'express';
import { createTestUser } from '../controllers/createTestUserController.js';

const router = express.Router();

router.post('/', createTestUser);

export default router;
