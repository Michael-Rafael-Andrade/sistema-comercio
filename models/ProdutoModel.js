// Array privado em memória que simula a tabela "produtos" do banco
const produtosEmMemoria = [];

// Variável para simular a chave primária auto-incremento do ID
let proximoId = 1;

class ProdutoModel {
  // Construtor para estruturar o objeto do produto
  constructor(id, titulo, categoria, preco, quantidade, status) {
    // Atribui o ID único
    this.id = id;
    // Atribui o título do produto
    this.titulo = titulo;
    // Atribui a categoria
    this.categoria = categoria;
    // Atribui o preço convertido para número
    this.preco = Number(preco);
    // Atribui a quantidade convertida para número
    this.quantidade = Number(quantidade);
    // Atribui o status (padrão: "Disponível")
    this.status = status || 'Disponível';
  }

  // Método estático para cadastrar um novo produto
  static criar(dados) {
    // Validação básica de regra de negócio
    if (!dados.titulo || dados.titulo.trim() === '') {
      throw new Error('O título do produto é obrigatório.');
    }
    if (dados.preco === undefined || Number(dados.preco) < 0) {
      throw new Error('O preço não pode ser negativo.');
    }
    if (dados.quantidade === undefined || Number(dados.quantidade) < 0) {
      throw new Error('A quantidade não pode ser negativa.');
    }

    // Instancia o novo produto com ID auto-incrementado
    const novoProduto = new ProdutoModel(
      proximoId++,
      dados.titulo,
      dados.categoria,
      dados.preco,
      dados.quantidade,
      dados.status
    );

    // Adiciona o novo produto ao array em memória
    produtosEmMemoria.push(novoProduto);

    // Retorna o produto recém-criado
    return novoProduto;
  }

  // Método estático para listar todos os produtos registrados
  static listarTodos() {
    // Retorna uma cópia do array para evitar manipulação direta externa
    return [...produtosEmMemoria];
  }

  // Método estático para buscar um produto pelo ID
  static buscarPorId(id) {
    // Procura no array o produto com ID correspondente
    const produto = produtosEmMemoria.find(p => p.id === Number(id));
    // Retorna o produto encontrado ou null
    return produto || null;
  }

  // Método estático para atualizar os dados de um produto existente
  static atualizar(id, dadosAtualizados) {
    // Busca o produto pelo ID
    const produto = ProdutoModel.buscarPorId(id);

    // Se não encontrar o produto, lança um erro
    if (!produto) {
      throw new Error('Produto não encontrado para atualização.');
    }

    // Atualiza apenas os campos enviados, caso fornecidos
    if (dadosAtualizados.titulo !== undefined) {
      produto.titulo = dadosAtualizados.titulo;
    }
    if (dadosAtualizados.categoria !== undefined) {
      produto.categoria = dadosAtualizados.categoria;
    }
    if (dadosAtualizados.preco !== undefined) {
      produto.preco = Number(dadosAtualizados.preco);
    }
    if (dadosAtualizados.quantidade !== undefined) {
      produto.quantidade = Number(dadosAtualizados.quantidade);
    }
    if (dadosAtualizados.status !== undefined) {
      produto.status = dadosAtualizados.status;
    }

    // Retorna o objeto atualizado
    return produto;
  }

  // Método estático para remover um produto pelo ID
  static deletar(id) {
    // Busca o índice do produto no array
    const indice = produtosEmMemoria.findIndex(p => p.id === Number(id));

    // Se o produto não for encontrado, lança erro
    if (indice === -1) {
      throw new Error('Produto não encontrado para exclusão.');
    }

    // Remove o item do array em memória
    const [produtoRemovido] = produtosEmMemoria.splice(indice, 1);

    // Retorna o produto removido
    return produtoRemovido;
  }

  // Adicione este método dentro da classe ProdutoModel no arquivo models/ProdutoModel.js

  // Método estático para calcular indicadores/métricas do Dashboard
  static obterEstatisticas() {
    // Quantidade total de registros/produtos no sistema
    const totalProdutos = produtosEmMemoria.length;

    // Soma total de unidades físicas no estoque
    const totalEstoque = produtosEmMemoria.reduce(
      (acumulador, prod) => acumulador + prod.quantidade, 0
    );

    // Valor financeiro total do estoque (preço * quantidade)
    const valorTotalEstoque = produtosEmMemoria.reduce(
      (acumulador, prod) => acumulador + (prod.preco * prod.quantidade), 0
    );

    // Contagem de itens sem estoque (quantidade zerada)
    const itensEsgotados = produtosEmMemoria.filter(
      prod => prod.quantidade <= 0
    ).length;

    // Retorna o objeto consolidado com as métricas
    return {
      totalProdutos,
      totalEstoque,
      valorTotalEstoque: valorTotalEstoque.toFixed(2),
      itensEsgotados
    };
  }
}



// Exporta a classe para ser utilizada pelos Controllers
module.exports = ProdutoModel;