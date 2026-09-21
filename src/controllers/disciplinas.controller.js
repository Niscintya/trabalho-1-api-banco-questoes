const service = require('../services/disciplinas.service');

// GET /disciplinas
async function listarDisciplinas(req, res, next) {
    try {
        const disciplinas = await service.listarDisciplinas();

        res.status(200).json(disciplinas);
    } catch (erro) {
        next(erro);
    }
}

// GET /disciplinas/:id
async function buscarDisciplinaPorId(req, res, next) {
    try {
        const id = Number(req.params.id);

        const disciplina = await service.buscarDisciplinaPorId(id);

        res.status(200).json(disciplina);
    } catch (erro) {
        next(erro);
    }
}

// POST /disciplinas
async function criarDisciplina(req, res, next) {
    try {
        const dados = {
            nome: req.body.nome
        };

        const novaDisciplina = await service.criarDisciplina(dados);

        res.status(201).json(novaDisciplina);
    } catch (erro) {
        next(erro);
    }
}

// PUT /disciplinas/:id
async function substituirDisciplina(req, res, next) {
    try {
        const id = Number(req.params.id);

        const dados = {
            nome: req.body.nome
        };

        const disciplina = await service.atualizarDisciplina(
            id,
            dados
        );

        res.status(200).json(disciplina);
    } catch (erro) {
        next(erro);
    }
}

// PATCH /disciplinas/:id
async function atualizarDisciplina(req, res, next) {
    try {
        const id = Number(req.params.id);

        const dados = {};

        if (req.body.nome !== undefined) {
            dados.nome = req.body.nome;
        }

        const disciplina = await service.atualizarDisciplina(
            id,
            dados
        );

        res.status(200).json(disciplina);
    } catch (erro) {
        next(erro);
    }
}

// DELETE /disciplinas/:id
async function excluirDisciplina(req, res, next) {
    try {
        const id = Number(req.params.id);

        await service.excluirDisciplina(id);

        res.status(204).send();
    } catch (erro) {
        next(erro);
    }
}

// GET /disciplinas/:id/questoes
async function listarQuestoesDaDisciplina(req, res, next) {
    try {
        const id = Number(req.params.id);

        const questoes =
            await service.listarQuestoesDaDisciplina(id);

        res.status(200).json(questoes);
    } catch (erro) {
        next(erro);
    }
}

module.exports = {
    listarDisciplinas,
    buscarDisciplinaPorId,
    criarDisciplina,
    substituirDisciplina,
    atualizarDisciplina,
    excluirDisciplina,
    listarQuestoesDaDisciplina
};