import mongoose from 'mongoose';

const clienteSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Nome do cliente é obrigatório']
    },
    email: {
      type: String,
      required: [true, 'Email é obrigatório'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Email inválido'
      ]
    },
    phone: {
      type: String,
      required: [true, 'Telefone é obrigatório']
    },
    address: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

const Cliente = mongoose.model('Cliente', clienteSchema);

export default Cliente;