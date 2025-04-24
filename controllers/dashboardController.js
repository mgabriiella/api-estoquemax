import Venda from '../models/Venda.js';
import Produto from '../models/Produto.js';
import Cliente from '../models/Cliente.js';

export const getDashboardData = async (req, res) => {
    try {
        // Calculate date filters
        const hoje = new Date();
        const primeiroDiaMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
        const primeiroDiaMesAnterior = new Date(
            hoje.getFullYear(),
            hoje.getMonth() - 1,
            1
        );
        const ultimoDiaMesAnterior = new Date(
            hoje.getFullYear(),
            hoje.getMonth(),
            0
        );

        // Calculate current month revenue
        const vendasDoMes = await Venda.find({
            date: { $gte: primeiroDiaMes }
        });

        const receitaMes = vendasDoMes.reduce(
            (total, venda) => total + venda.total,
            0
        );

        // Calculate previous month revenue
        const vendasMesAnterior = await Venda.find({
            date: {
                $gte: primeiroDiaMesAnterior,
                $lte: ultimoDiaMesAnterior
            }
        });

        const receitaMesAnterior = vendasMesAnterior.reduce(
            (total, venda) => total + venda.total,
            0
        );

        // Calculate revenue variation
        let variacaoReceita = 0;
        if (receitaMesAnterior > 0) {
            variacaoReceita =
                ((receitaMes - receitaMesAnterior) / receitaMesAnterior) * 100;
        }

        // Products with low stock
        const produtosBaixoEstoque = await Produto.find({ stock: { $lt: 5 } })
            .select('_id name stock');

        // Recent sales
        const vendasRecentes = await Venda.find({})
            .sort({ date: -1 })
            .limit(5)
            .populate('clientId', 'name')
            .select('_id clientId date total');

        // Format recent sales
        const vendasRecentesFormatadas = vendasRecentes.map(v => ({
            _id: v._id,
            clientName: v.clientId ? v.clientId.name : 'Cliente não encontrado',
            date: v.date,
            total: v.total
        }));

        // Total counts
        const totalProdutos = await Produto.countDocuments();
        const totalClientes = await Cliente.countDocuments();

        res.json({
            receitaMes,
            variacaoReceita,
            totalProdutos,
            totalClientes,
            produtosBaixoEstoque,
            vendasRecentes: vendasRecentesFormatadas
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};