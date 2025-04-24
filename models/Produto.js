import mongoose from 'mongoose';

const produtoSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Nome do produto é obrigatório']
    },
    price: {
      type: Number,
      required: [true, 'Preço do produto é obrigatório'],
      min: [0.01, 'Preço do produto deve ser um número positivo']
    },
    stock: {
      type: Number,
      required: [true, 'Estoque é obrigatório'],
      min: [0, 'Estoque deve ser um número não negativo']
    },
    description: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

const Produto = mongoose.model('Produto', produtoSchema);

export default Produto;