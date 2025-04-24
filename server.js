import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import clienteRoutes from './routes/clienteRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import produtoRoutes from './routes/produtoRoutes.js';
import vendaRoutes from './routes/vendaRoutes.js';
import lojaRoutes from './routes/lojaRoutes.js';

const app = express();

// Carrega variáveis de ambiente
dotenv.config();

// Configura o CORS
const frontEndUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
app.use(cors({
  origin: frontEndUrl,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middlewares
app.use(express.json());

// Conectando ao MongoDB
connectDB();

// Rotas
app.use('/api/clientes', clienteRoutes);
app.use('/api/vendas', vendaRoutes);
app.use('/api/produtos', produtoRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/loja', lojaRoutes);

// Middleware de erro global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo deu errado!' });
  });
  
  // Inicia o servidor
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });