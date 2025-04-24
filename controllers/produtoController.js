import Produto from '../models/Produto.js';

// Buscar todos os produtos
export const getProdutos = async (req, res) => {
  try {
    const produtos = await Produto.find({});
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar produto por ID
export const getProdutoById = async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.json(produto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Criar novo produto
export const createProduto = async (req, res) => {
  try {
    const produto = new Produto(req.body);
    const novoProduto = await produto.save();
    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Atualizar produto
export const updateProduto = async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    
    // Atualizar campos
    produto.name = req.body.name || produto.name;
    produto.price = req.body.price || produto.price;
    produto.stock = req.body.stock !== undefined ? req.body.stock : produto.stock;
    produto.description = req.body.description || produto.description;
    
    const updatedProduto = await produto.save();
    res.json(updatedProduto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Deletar produto
export const deleteProduto = async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    
    await produto.deleteOne();
    res.json({ message: 'Produto removido' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};