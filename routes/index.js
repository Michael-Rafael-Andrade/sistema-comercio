// Importa o framework Express
var express = require('express');
// Instancia o roteador
var router = express.Router();

// Importa o Controller do Dashboard
var IndexController = require('../controllers/IndexController');

// Rota GET / -> Exibe o Dashboard principal
router.get('/', IndexController.exibirDashboard);

// Exporta o roteador
module.exports = router;