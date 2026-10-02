function criarAssuntosService(repository) {

    async function listarAssuntos() {
        return await repository.listarTodas();
    }

    async function buscarAssuntoPorId(id) {
        const assunto = await repository.buscarPorId(id);

        if (!assunto) {
            const erro = new Error('Assunto não encontrado');
            erro.statusCode = 404;
            throw erro;
        }

        return assunto;
    }

    async function criarAssunto(dados) {
        if (!dados.nome) {
            const erro = new Error('O nome é obrigatório');
            erro.statusCode = 400;
            throw erro;
        }

        return await repository.criar(dados);
    }

    async function atualizarAssunto(id, dados) {
        const assunto = await repository.atualizar(id, dados);

        if (!assunto) {
            const erro = new Error('Assunto não encontrado');
            erro.statusCode = 404;
            throw erro;
        }

        return assunto;
    }

    async function excluirAssunto(id) {
        const assunto = await repository.excluir(id);

        if (!assunto) {
            const erro = new Error('Assunto não encontrado');
            erro.statusCode = 404;
            throw erro;
        }

        return assunto;
    }

    return {
        listarAssuntos,
        buscarAssuntoPorId,
        criarAssunto,
        atualizarAssunto,
        excluirAssunto
    };
}

module.exports = criarAssuntosService;