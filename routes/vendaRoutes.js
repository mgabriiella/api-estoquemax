import express from 'express';
import {
    getVendas,
    getVendaById,
    createVenda
} from '../controllers/vendaController.js';
const router = express.Router();
// CRUD Routes
router.get('/', getVendas); // Get all sales
router.get('/:id', getVendaById); // Get sale by ID
router.post('/', createVenda); // Create new sale

export default router;