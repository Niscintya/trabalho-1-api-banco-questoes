const repository = require('../repositories/disciplinas.repository');

// Lista todas as disciplinas
async function listarDisciplinas() {
    return await repository.listarTodas();
}

// Busca uma disciplina pelo ID
async function buscarDisciplinaPorId(id) {
    const disciplina = await repository.buscarPorId(id);

    if (!disciplina) {
        const erro = new Error('Disciplina não encontrada');
        erro.statusCode = 404;
        throw erro;
    }

    return disciplina;
}

// Cria uma disciplina
async function criarDisciplina(dados) {
    if (!dados.nome) {
        const erro = new Error('O nome é obrigatório');
        erro.statusCode = 400;
        throw erro;
    }

    return await repository.criar(dados);
}

// Atualiza uma disciplina
async function atualizarDisciplina(id, dados) {
    const disciplina = await repository.atualizar(id, dados);

    if (!disciplina) {
        const erro = new Error('Disciplina não encontrada');
        erro.statusCode = 404;
        throw erro;
    }

    return disciplina;
}

// Exclui uma disciplina
async function excluirDisciplina(id) {
    const disciplina = await repository.excluir(id);

    if (!disciplina) {
        const erro = new Error('Disciplina não encontrada');
        erro.statusCode = 404;
        throw erro;
    }

    return disciplina;
}

// Lista as questões pertencentes a uma disciplina
async function listarQuestoesDaDisciplina(id) {
    const disciplina = await repository.buscarPorId(id);

    if (!disciplina) {
        const erro = new Error('Disciplina não encontrada');
        erro.statusCode = 404;
        throw erro;
    }

    return await repository.listarQuestoes(id);
}

module.exports = {
    listarDisciplinas,
    buscarDisciplinaPorId,
    criarDisciplina,
    atualizarDisciplina,
    excluirDisciplina,
    listarQuestoesDaDisciplina
};