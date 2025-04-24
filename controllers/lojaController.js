import Loja from '../models/Loja.js';

// Criar loja
export const createLoja = async (req, res) => {
    try {
        const { storeName, responsibleName, email } = req.body;
        const loja = new Loja({ storeName, responsibleName, email });
        const novaLoja = await loja.save();
        res.status(201).json(novaLoja);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Buscar loja
export const getLoja = async (req, res) => {
    try {
        const loja = await Loja.findOne(); // Assume apenas uma loja
        if (!loja) {
            return res.status(404).json({ error: 'Loja não encontrada' });
        }
        res.json(loja);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};