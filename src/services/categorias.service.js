const repository = require('../repositories/categorias.repository');

// Lista todas as categorias
async function listarCategorias() {
    return await repository.listarTodas();
}

// Busca uma categoria pelo ID
async function buscarCategoriaPorId(id) {
    const categoria = await repository.buscarPorId(id);

    if (!categoria) {
        const erro = new Error('Categoria não encontrada');
        erro.statusCode = 404;
        throw erro;
    }

    return categoria;
}

// Cria uma categoria
async function criarCategoria(dados) {
    if (!dados.nome) {
        const erro = new Error('O nome é obrigatório');
        erro.statusCode = 400;
        throw erro;
    }

    return await repository.criar(dados);
}

// Atualiza uma categoria
async function atualizarCategoria(id, dados) {
    const categoria = await repository.atualizar(id, dados);

    if (!categoria) {
        const erro = new Error('Categoria não encontrada');
        erro.statusCode = 404;
        throw erro;
    }

    return categoria;
}

// Exclui uma categoria
async function excluirCategoria(id) {
    const categoria = await repository.excluir(id);

    if (!categoria) {
        const erro = new Error('Categoria não encontrada');
        erro.statusCode = 404;
        throw erro;
    }

    return categoria;
}

module.exports = {
    listarCategorias,
    buscarCategoriaPorId,
    criarCategoria,
    atualizarCategoria,
    excluirCategoria
};