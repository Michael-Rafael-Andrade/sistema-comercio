// Importa o framework Express
const express = require('express');

// Cria o roteador do Express
const router = express.Router();

// Importa o Controller correspondente
const ProdutoController = require('../controllers/ProdutoController');

// Rota GET /produtos -> Lista todos os produtos
router.get('/', ProdutoController.listar);

// Rota GET /produtos -> Exibe o formulário de cadastro
router.get('/novo', ProdutoController.exibirFormularioCadastro);

// Rota POST /produtos -> Processa o cadastro
router.post('/novo', ProdutoController.salvar);

// Rota GET /produtos/:id/editar -> Exibe o formulário de edição
router.get('/:id/editar', ProdutoController.exibirFormularioEdicao);

// Rota POST /produtos/:id/editar -> Processa a alteração
router.post('/:id/editar', ProdutoController.atualizar);

// Rota POST /produtos/:id/excluir -> Processa a exclusão
router.post('/:id/excluir', ProdutoController.excluir);

// exportar o module router
module.exports = router;
