import Venda from '../models/Venda.js';
import Produto from '../models/Produto.js';
import Cliente from '../models/Cliente.js';

// Buscar todas as vendas
export const getVendas = async (req, res) => {
  try {
    const vendas = await Venda.find({})
      .populate('clientId', 'name email')
      .populate('items.productId', 'name');
    res.json(vendas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar venda por ID
export const getVendaById = async (req, res) => {
  try {
    const venda = await Venda.findById(req.params.id)
      .populate('clientId', 'name email')
      .populate('items.productId', 'name price');
      
    if (!venda) {
      return res.status(404).json({ error: 'Venda não encontrada' });
    }
    res.json(venda);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Criar nova venda
export const createVenda = async (req, res) => {
  try {
    // Verificar se o cliente existe
    const cliente = await Cliente.findById(req.body.clientId);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    
    // Validar e processar cada item da venda
    let total = 0;
    for (const item of req.body.items) {
      // Verificar se o produto existe
      const produto = await Produto.findById(item.productId);
      if (!produto) {
        return res.status(404).json({ 
          error: `Produto com ID ${item.productId} não encontrado` 
        });
      }
      
      // Verificar estoque
      if (produto.stock < item.quantity) {
        return res.status(400).json({ 
          error: `Estoque insuficiente para o produto ${produto.name}. Disponível: ${produto.stock}` 
        });
      }
      
      // Use o preço atual do produto se não for fornecido
      if (!item.price) {
        item.price = produto.price;
      }
      
      // Somar ao total
      total += item.price * item.quantity;
      
      // Atualizar estoque
      produto.stock -= item.quantity;
      await produto.save();
    }
    
    // Criar a venda
    const venda = new Venda({
      clientId: req.body.clientId,
      items: req.body.items,
      total,
      date: new Date()
    });
    
    const novaVenda = await venda.save();
    
    res.status(201).json(novaVenda);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};