import mongoose from 'mongoose';

const vendaSchema = mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cliente',
      required: [true, 'Cliente é obrigatório']
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Produto',
          required: [true, 'ID do produto é obrigatório']
        },
        quantity: {
          type: Number,
          required: [true, 'Quantidade é obrigatória'],
          min: [1, 'Quantidade deve ser um número positivo']
        },
        price: {
          type: Number,
          required: [true, 'Preço é obrigatório'],
          min: [0.01, 'Preço deve ser um número positivo']
        }
      }
    ],
    total: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

const Venda = mongoose.model('Venda', vendaSchema);

export default Venda;
