import mongoose from 'mongoose';

const lojaSchema = mongoose.Schema({
    storeName: {
        type: String,
        required: [true, 'Nome da loja é obrigatório']
    },
    responsibleName: {
        type: String,
        required: [true, 'Nome do responsável é obrigatório']
    },
    email: {
        type: String,
        required: [true, 'Email é obrigatório']
    }
}, {
    timestamps: true
});

const Loja = mongoose.model('Loja', lojaSchema);

export default Loja;