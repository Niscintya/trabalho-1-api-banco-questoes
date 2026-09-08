const { disciplinas, questoes } = require('../data/db-memoria');

// GET /disciplinas
function listarDisciplinas(req, res) {
    res.status(200).json(disciplinas);
}

// GET /disciplinas/:id
function buscarDisciplinaPorId(req, res) {
    const id = Number(req.params.id);

    const disciplina = disciplinas.find(d => d.id === id);

    if (!disciplina) {
        return res.status(404).json({
            erro: 'Disciplina não encontrada'
        });
    }

    res.status(200).json(disciplina);
}

// POST /disciplinas
function criarDisciplina(req, res) {
    if (!req.body || !req.body.nome) {
        return res.status(400).json({
            erro: 'O nome é obrigatório'
        });
    }

    const existe = disciplinas.some(
        d => d.nome.toLowerCase() === req.body.nome.toLowerCase()
    );

    if (existe) {
        return res.status(409).json({
            erro: 'Disciplina já cadastrada'
        });
    }

    const novaDisciplina = {
        id: disciplinas.length + 1,
        nome: req.body.nome
    };

    disciplinas.push(novaDisciplina);

    res.status(201).json(novaDisciplina);
}

// PUT /disciplinas/:id
function substituirDisciplina(req, res) {
    const id = Number(req.params.id);

    const indice = disciplinas.findIndex(d => d.id === id);

    if (indice === -1) {
        return res.status(404).json({
            erro: 'Disciplina não encontrada'
        });
    }

    if (!req.body || !req.body.nome) {
        return res.status(400).json({
            erro: 'O nome é obrigatório'
        });
    }

    disciplinas[indice] = {
        id: id,
        nome: req.body.nome
    };

    res.status(200).json(disciplinas[indice]);
}

// PATCH /disciplinas/:id
function atualizarDisciplina(req, res) {
    const id = Number(req.params.id);

    const disciplina = disciplinas.find(d => d.id === id);

    if (!disciplina) {
        return res.status(404).json({
            erro: 'Disciplina não encontrada'
        });
    }

    if (req.body.nome !== undefined) {
        disciplina.nome = req.body.nome;
    }

    res.status(200).json(disciplina);
}

// DELETE /disciplinas/:id
function excluirDisciplina(req, res) {
    const id = Number(req.params.id);

    const indice = disciplinas.findIndex(d => d.id === id);

    if (indice === -1) {
        return res.status(404).json({
            erro: 'Disciplina não encontrada'
        });
    }

    disciplinas.splice(indice, 1);

    res.status(204).send();
}

// GET /disciplinas/:id/questoes
function listarQuestoesDaDisciplina(req, res) {
    const id = Number(req.params.id);

    const disciplina = disciplinas.find(d => d.id === id);

    if (!disciplina) {
        return res.status(404).json({
            erro: 'Disciplina não encontrada'
        });
    }

    const questoesDaDisciplina = questoes.filter(
        q => q.disciplinaId === id
    );

    res.status(200).json(questoesDaDisciplina);
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