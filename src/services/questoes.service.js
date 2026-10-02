function criarQuestoesService(repository) {

    async function listarQuestoes(filtros) {
        return await repository.listarTodas(filtros);
    }

    async function buscarQuestaoPorId(id) {
        const questao = await repository.buscarPorId(id);

        if (!questao) {
            const erro = new Error('Questão não encontrada');
            erro.statusCode = 404;
            throw erro;
        }

        return questao;
    }

    async function criarQuestao(dados, assuntoIds = []) {
        if (!dados.enunciado) {
            const erro = new Error('O enunciado é obrigatório');
            erro.statusCode = 400;
            throw erro;
        }

        return await repository.criarComAssuntos(
            dados,
            assuntoIds
        );
    }

    async function substituirQuestao(id, dados, assuntoIds = []) {
        if (!dados.enunciado) {
            const erro = new Error('O enunciado é obrigatório');
            erro.statusCode = 400;
            throw erro;
        }

        const questao = await repository.atualizarComAssuntos(
            id,
            dados,
            assuntoIds
        );

        if (!questao) {
            const erro = new Error('Questão não encontrada');
            erro.statusCode = 404;
            throw erro;
        }

        return questao;
    }

    async function atualizarQuestao(id, dados, assuntoIds) {
        const questao = await repository.atualizarComAssuntos(
            id,
            dados,
            assuntoIds
        );

        if (!questao) {
            const erro = new Error('Questão não encontrada');
            erro.statusCode = 404;
            throw erro;
        }

        return questao;
    }

    async function excluirQuestao(id) {
        const questao = await repository.excluir(id);

        if (!questao) {
            const erro = new Error('Questão não encontrada');
            erro.statusCode = 404;
            throw erro;
        }

        return questao;
    }

    return {
        listarQuestoes,
        buscarQuestaoPorId,
        criarQuestao,
        substituirQuestao,
        atualizarQuestao,
        excluirQuestao
    };
}

module.exports = criarQuestoesService;