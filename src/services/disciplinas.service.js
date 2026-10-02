function criarDisciplinasService(repository) {

    async function listarDisciplinas() {
        return await repository.listarTodas();
    }

    async function buscarDisciplinaPorId(id) {
        const disciplina = await repository.buscarPorId(id);

        if (!disciplina) {
            const erro = new Error('Disciplina não encontrada');
            erro.statusCode = 404;
            throw erro;
        }

        return disciplina;
    }

    async function criarDisciplina(dados) {
        if (!dados.nome) {
            const erro = new Error('O nome é obrigatório');
            erro.statusCode = 400;
            throw erro;
        }

        return await repository.criar(dados);
    }

    async function atualizarDisciplina(id, dados) {
        const disciplina = await repository.atualizar(id, dados);

        if (!disciplina) {
            const erro = new Error('Disciplina não encontrada');
            erro.statusCode = 404;
            throw erro;
        }

        return disciplina;
    }

    async function excluirDisciplina(id) {
        const disciplina = await repository.excluir(id);

        if (!disciplina) {
            const erro = new Error('Disciplina não encontrada');
            erro.statusCode = 404;
            throw erro;
        }

        return disciplina;
    }

    async function listarQuestoesDaDisciplina(id) {
        const disciplina = await repository.buscarPorId(id);

        if (!disciplina) {
            const erro = new Error('Disciplina não encontrada');
            erro.statusCode = 404;
            throw erro;
        }

        return await repository.listarQuestoes(id);
    }

    return {
        listarDisciplinas,
        buscarDisciplinaPorId,
        criarDisciplina,
        atualizarDisciplina,
        excluirDisciplina,
        listarQuestoesDaDisciplina
    };
}

module.exports = criarDisciplinasService;