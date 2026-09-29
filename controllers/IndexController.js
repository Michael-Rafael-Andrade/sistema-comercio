// Importa o Model de Produtos para consultar o acervo
const ProdutoModel = require('../models/ProdutoModel');

class IndexController {
  // Renderiza a tela principal (Dashboard) na rota '/'
  static exibirDashboard(req, res) {
    try {
      // Solicita ao Model o cálculo das estatísticas
      const estatisticas = ProdutoModel.obterEstatisticas();

      // Busca todos os produtos para listar os últimos cadastros
      const todosProdutos = ProdutoModel.listarTodos();

      // Recorta os 5 produtos mais recentes
      const ultimosProdutos = todosProdutos.slice(-5).reverse();

      // Renderiza a view 'index.hbs' enviando o objeto de contexto
      res.render('produtos/index.hbs', {
        title: 'Sistema de Gerenciamento - Frente de Caixa',
        estatisticas: estatisticas,
        ultimosProdutos: ultimosProdutos
      });
    } catch (erro) {
      console.error('Erro ao carregar Dashboard:', erro.message);
      res.status(500).send('Erro interno ao carregar o painel.');
    }
  }
}

// Exporta o Controller
module.exports = IndexController;