function criarCategoriasService(repository) {

    async function listarCategorias() {
        return await repository.listarTodas();
    }

    async function buscarCategoriaPorId(id) {
        const categoria = await repository.buscarPorId(id);

        if (!categoria) {
            const erro = new Error('Categoria não encontrada');
            erro.statusCode = 404;
            throw erro;
        }

        return categoria;
    }

    async function criarCategoria(dados) {
        if (!dados.nome) {
            const erro = new Error('O nome é obrigatório');
            erro.statusCode = 400;
            throw erro;
        }

        return await repository.criar(dados);
    }

    async function atualizarCategoria(id, dados) {
        const categoria = await repository.atualizar(id, dados);

        if (!categoria) {
            const erro = new Error('Categoria não encontrada');
            erro.statusCode = 404;
            throw erro;
        }

        return categoria;
    }

    async function excluirCategoria(id) {
        const categoria = await repository.excluir(id);

        if (!categoria) {
            const erro = new Error('Categoria não encontrada');
            erro.statusCode = 404;
            throw erro;
        }

        return categoria;
    }

    return {
        listarCategorias,
        buscarCategoriaPorId,
        criarCategoria,
        atualizarCategoria,
        excluirCategoria
    };
}

module.exports = criarCategoriasService;