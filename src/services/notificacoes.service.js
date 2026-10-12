function criarNotificacoesService(repository) {
    async function listarNotificacoes(filtros) {
        return await repository.listarTodas(filtros);
    }

    async function buscarNotificacaoPorId(id) {
        const notificacao = await repository.buscarPorId(id);

        if (!notificacao) {
            const erro = new Error('Notificação não encontrada');
            erro.statusCode = 404;
            throw erro;
        }

        return notificacao;
    }

    async function criarNotificacao(dados) {
        if (!dados.mensagem) {
            const erro = new Error('A mensagem é obrigatória');
            erro.statusCode = 400;
            throw erro;
        }

        if (!dados.tipo) {
            const erro = new Error('O tipo da notificação é obrigatório');
            erro.statusCode = 400;
            throw erro;
        }

        if (!dados.disciplinaId) {
            const erro = new Error('A disciplina é obrigatória');
            erro.statusCode = 400;
            throw erro;
        }

        return await repository.criar(dados);
    }

    async function marcarComoLida(id) {
        const notificacao = await repository.marcarComoLida(id);

        if (!notificacao) {
            const erro = new Error('Notificação não encontrada');
            erro.statusCode = 404;
            throw erro;
        }

        return notificacao;
    }

    async function marcarTodasComoLidas(disciplinaId) {
        return await repository.marcarTodasComoLidas(
            disciplinaId
        );
    }

    async function excluirNotificacao(id) {
        const notificacao = await repository.excluir(id);

        if (!notificacao) {
            const erro = new Error('Notificação não encontrada');
            erro.statusCode = 404;
            throw erro;
        }

        return notificacao;
    }

    return {
        listarNotificacoes,
        buscarNotificacaoPorId,
        criarNotificacao,
        marcarComoLida,
        marcarTodasComoLidas,
        excluirNotificacao
    };
}

module.exports = criarNotificacoesService;