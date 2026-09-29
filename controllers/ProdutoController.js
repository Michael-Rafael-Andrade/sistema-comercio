// Importa o Model de Produto para acessar os dados e regras
const ProdutoModel = require('../models/ProdutoModel');

class ProdutoController {
    // Exibe a lista principal com todos os produtos
    static listar(req, res) {
        try {
            // Solicita ao Model a lista completa de produtos
            const produtos = ProdutoModel.listarTodos();

            // Renderiza a view 'produtos/index' passando os dados obtidos
            res.render('produtos/index', {
                title: 'Acervo de Produtos',
                produtos: produtos
            });
        } catch (erro) {
            // Em caso de falha, exibe mensagem amigável no console e tela
            console.error('Erro ao listar produtos: ', erro.message);
            res.status(500).send('Erro interno ao carregar os produtos.');
        }
    }


    // Renderiza o formulário para cadastro de um novo produto
    static exibirFormularioCadastro(req, res) {
        // Renderiza o template Handlebars do formulário
        res.render('produtos/novo', {
            title: 'Cadastrar Novo Produto'
        });
    }

    // Processa o envio do formulário de cadastro (POST)
    static salvar(req, res) {
        try {
            // Extrai os campos enviados pelo formulário no corpo da requisição
            const {
                titulo,
                categoria,
                preco,
                quantidade
            } = req.body;

            // Chama o método do Model para criar o registro
            ProdutoModel.criar({
                titulo,
                categoria,
                preco,
                quantidade
            });

            // Redireciona o usuário de volta para a lista de produtos
            res.redirect('./produtos');
        } catch (erro) {
            // Em caso de validação inválida,   reexibe o formulário com o erro
            res.render('produtos/novo', {
                title: 'Cadastrar Novo Produto',
                erro: erro.message
            });
        }
    }

    // Exibe o formulário com os dados do produto preenchidos para edição
    static exibirFormularioEdicao(req, res) {
        try {
            // Obtém o ID enviado na URL (ex: /produtos/1/editar)
            const { id } = req.params;

            // Busca o produto pelo ID no Model
            const produto = ProdutoModel.buscarPorId(id);

            // Se o produto não for encontrado, lança erro
            if (!produto) {
                return res.status(404).send('Produto não encontrado.');
            }

            // Renderiza o formulário de edição com os dados atuais
            res.render('produtos/editar', {
                title: 'Editar Produto',
                produto: produto
            });
        } catch (erro) {
            res.status(500).send('Erro ao buscar produto para edição.');
        }
    }

    // Processa as alterações enviadas pelo formulário de edição (POST)
    static atualizar(req, res) {
        try {
            // Obtém o ID da URL e os novos dados do corpo da requisição
            const { id } = req.params;
            const { titulo, categoria, preco, quantidade, status } = req.body;

            // Solicita a atualização ao Model
            ProdutoModel.atualizar(id, {
                titulo,
                categoria,
                preco,
                quantidade,
                status
            });

            // Redireciona para a listagem
            res.redirect('/produtos');
        } catch (erro) {
            res.status(500).send('Erro ao atualizar produto.');
        }
    }

    // Processa a exclusão de um produto pelo ID
    static excluir(req, res) {
        try {
            // Obtém o ID do produto a ser removido
            const { id } = req.params;

            // Executa a remoção no Model
            ProdutoModel.deletar(id);

            // Redireciona para a lista atualizada
            res.redirect('/produtos');
        } catch (erro) {
            res.status(500).send('Erro ao excluir produto.');
        }
    }
}

// Exporta a classe do Controller
module.exports = ProdutoController;
