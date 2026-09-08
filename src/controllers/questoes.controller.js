const { questoes } = require('../data/db-memoria');

// GET /questoes
function listarQuestoes(req, res) {
    let resultado = [...questoes];

    // Filtro por dificuldade
    if (req.query.dificuldade) {
        resultado = resultado.filter(
            q => q.dificuldade === req.query.dificuldade
        );
    }

    // Busca por palavra no enunciado
    if (req.query.busca) {
        const busca = req.query.busca.toLowerCase();

        resultado = resultado.filter(
            q => q.enunciado.toLowerCase().includes(busca)
        );
    }

    // Paginação
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const total = resultado.length;
    const inicio = (page - 1) * limit;

    resultado = resultado.slice(inicio, inicio + limit);

    res.status(200).json({
        dados: resultado,
        paginacao: {
            page: page,
            limit: limit,
            total: total,
            totalPaginas: Math.ceil(total / limit)
        }
    });
}


// GET /questoes/:id
function buscarQuestaoPorId(req, res) {
    const id = Number(req.params.id);

    const questao = questoes.find(q => q.id === id);

    if (!questao) {
        return res.status(404).json({
            erro: 'Questão não encontrada'
        });
    }

    res.status(200).json(questao);
}


// POST /questoes
function criarQuestao(req, res) {
    if (!req.body || !req.body.enunciado) {
        return res.status(400).json({
            erro: 'O enunciado é obrigatório'
        });
    }

    const novaQuestao = {
        id: questoes.length + 1,
        enunciado: req.body.enunciado,
        disciplinaId: req.body.disciplinaId,
        categoriaId: req.body.categoriaId,
        dificuldade: req.body.dificuldade
    };

    questoes.push(novaQuestao);

    res.status(201).json(novaQuestao);
}


// PUT /questoes/:id
function substituirQuestao(req, res) {
    const id = Number(req.params.id);

    const indice = questoes.findIndex(q => q.id === id);

    if (indice === -1) {
        return res.status(404).json({
            erro: 'Questão não encontrada'
        });
    }

    if (!req.body || !req.body.enunciado) {
        return res.status(400).json({
            erro: 'O enunciado é obrigatório'
        });
    }

    questoes[indice] = {
        id: id,
        enunciado: req.body.enunciado,
        disciplinaId: req.body.disciplinaId,
        categoriaId: req.body.categoriaId,
        dificuldade: req.body.dificuldade
    };

    res.status(200).json(questoes[indice]);
}


// PATCH /questoes/:id
function atualizarQuestao(req, res) {
    const id = Number(req.params.id);

    const questao = questoes.find(q => q.id === id);

    if (!questao) {
        return res.status(404).json({
            erro: 'Questão não encontrada'
        });
    }

    if (req.body.enunciado !== undefined) {
        questao.enunciado = req.body.enunciado;
    }

    if (req.body.dificuldade !== undefined) {
        questao.dificuldade = req.body.dificuldade;
    }

    if (req.body.disciplinaId !== undefined) {
        questao.disciplinaId = req.body.disciplinaId;
    }

    if (req.body.categoriaId !== undefined) {
        questao.categoriaId = req.body.categoriaId;
    }

    res.status(200).json(questao);
}


// DELETE /questoes/:id
function excluirQuestao(req, res) {
    const id = Number(req.params.id);

    const indice = questoes.findIndex(q => q.id === id);

    if (indice === -1) {
        return res.status(404).json({
            erro: 'Questão não encontrada'
        });
    }

    questoes.splice(indice, 1);

    res.status(204).send();
}


module.exports = {
    listarQuestoes,
    buscarQuestaoPorId,
    criarQuestao,
    substituirQuestao,
    atualizarQuestao,
    excluirQuestao
};