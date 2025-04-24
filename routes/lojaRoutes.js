import express from 'express';
import { createLoja, getLoja } from '../controllers/lojaController.js';

const router = express.Router();

router.post('/', createLoja);
router.get('/', getLoja);

export default router;