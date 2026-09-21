const repository = require('../repositories/questoes.repository');

// Lista as questões com filtros, paginação e ordenação
async function listarQuestoes(filtros) {
    return await repository.listarTodas(filtros);
}

// Busca uma questão pelo ID
async function buscarQuestaoPorId(id) {
    const questao = await repository.buscarPorId(id);

    if (!questao) {
        const erro = new Error('Questão não encontrada');
        erro.statusCode = 404;
        throw erro;
    }

    return questao;
}

// Cria uma nova questão
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

// Substitui completamente uma questão
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

// Atualiza parcialmente uma questão
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

// Exclui uma questão
async function excluirQuestao(id) {
    const questao = await repository.excluir(id);

    if (!questao) {
        const erro = new Error('Questão não encontrada');
        erro.statusCode = 404;
        throw erro;
    }

    return questao;
}

module.exports = {
    listarQuestoes,
    buscarQuestaoPorId,
    criarQuestao,
    substituirQuestao,
    atualizarQuestao,
    excluirQuestao
};