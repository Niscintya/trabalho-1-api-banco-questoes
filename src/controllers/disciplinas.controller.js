const repository = require('../repositories/disciplinas.repository');

// GET /disciplinas
async function listarDisciplinas(req, res, next) {
    try {
        const disciplinas = await repository.listarTodas();

        res.status(200).json(disciplinas);
    } catch (erro) {
        next(erro);
    }
}

// GET /disciplinas/:id
async function buscarDisciplinaPorId(req, res, next) {
    try {
        const id = Number(req.params.id);

        const disciplina = await repository.buscarPorId(id);

        if (!disciplina) {
            return res.status(404).json({
                erro: 'Disciplina não encontrada'
            });
        }

        res.status(200).json(disciplina);
    } catch (erro) {
        next(erro);
    }
}

// POST /disciplinas
async function criarDisciplina(req, res, next) {
    try {
        if (!req.body || !req.body.nome) {
            return res.status(400).json({
                erro: 'O nome é obrigatório'
            });
        }

        const novaDisciplina = await repository.criar({
            nome: req.body.nome
        });

        res.status(201).json(novaDisciplina);
    } catch (erro) {
        next(erro);
    }
}

// PUT /disciplinas/:id
async function substituirDisciplina(req, res, next) {
    try {
        const id = Number(req.params.id);

        if (!req.body || !req.body.nome) {
            return res.status(400).json({
                erro: 'O nome é obrigatório'
            });
        }

        const disciplina = await repository.atualizar(id, {
            nome: req.body.nome
        });

        if (!disciplina) {
            return res.status(404).json({
                erro: 'Disciplina não encontrada'
            });
        }

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

        const disciplina = await repository.atualizar(id, dados);

        if (!disciplina) {
            return res.status(404).json({
                erro: 'Disciplina não encontrada'
            });
        }

        res.status(200).json(disciplina);
    } catch (erro) {
        next(erro);
    }
}

// DELETE /disciplinas/:id
async function excluirDisciplina(req, res, next) {
    try {
        const id = Number(req.params.id);

        const disciplina = await repository.excluir(id);

        if (!disciplina) {
            return res.status(404).json({
                erro: 'Disciplina não encontrada'
            });
        }

        res.status(204).send();
    } catch (erro) {
        next(erro);
    }
}

// GET /disciplinas/:id/questoes
async function listarQuestoesDaDisciplina(req, res, next) {
    try {
        const id = Number(req.params.id);

        const disciplina = await repository.buscarPorId(id);

        if (!disciplina) {
            return res.status(404).json({
                erro: 'Disciplina não encontrada'
            });
        }

        const questoes = await repository.listarQuestoes(id);

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