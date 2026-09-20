const repository = require('../repositories/questoes.repository');

// GET /questoes
async function listarQuestoes(req, res, next) {
    try {
        const resultado = await repository.listarTodas({
            dificuldade: req.query.dificuldade,
            busca: req.query.busca,
            page: req.query.page,
            limit: req.query.limit,
            ordenar: req.query.ordenar,
            direcao: req.query.direcao
        });

        res.status(200).json({
            dados: resultado.dados,
            paginacao: {
                page: resultado.page,
                limit: resultado.limit,
                total: resultado.total,
                totalPaginas: resultado.totalPaginas
            }
        });
    } catch (erro) {
        next(erro);
    }
}

// GET /questoes/:id
async function buscarQuestaoPorId(req, res, next) {
    try {
        const id = Number(req.params.id);

        const questao = await repository.buscarPorId(id);

        if (!questao) {
            return res.status(404).json({
                erro: 'Questão não encontrada'
            });
        }

        res.status(200).json(questao);
    } catch (erro) {
        next(erro);
    }
}

// POST /questoes
async function criarQuestao(req, res, next) {
    try {
        if (!req.body || !req.body.enunciado) {
            return res.status(400).json({
                erro: 'O enunciado é obrigatório'
            });
        }

        const dados = {
            enunciado: req.body.enunciado,
            disciplinaId: req.body.disciplinaId,
            categoriaId: req.body.categoriaId,
            dificuldade: req.body.dificuldade
        };

        const assuntoIds = Array.isArray(req.body.assuntoIds)
            ? req.body.assuntoIds
            : [];

        const novaQuestao = await repository.criarComAssuntos(
            dados,
            assuntoIds
        );

        res.status(201).json(novaQuestao);
    } catch (erro) {
        next(erro);
    }
}

// PUT /questoes/:id
async function substituirQuestao(req, res, next) {
    try {
        const id = Number(req.params.id);

        if (!req.body || !req.body.enunciado) {
            return res.status(400).json({
                erro: 'O enunciado é obrigatório'
            });
        }

        const dados = {
            enunciado: req.body.enunciado,
            disciplinaId: req.body.disciplinaId,
            categoriaId: req.body.categoriaId,
            dificuldade: req.body.dificuldade
        };

        const assuntoIds = Array.isArray(req.body.assuntoIds)
            ? req.body.assuntoIds
            : [];

        const questao = await repository.atualizarComAssuntos(
            id,
            dados,
            assuntoIds
        );

        if (!questao) {
            return res.status(404).json({
                erro: 'Questão não encontrada'
            });
        }

        res.status(200).json(questao);
    } catch (erro) {
        next(erro);
    }
}

// PATCH /questoes/:id
async function atualizarQuestao(req, res, next) {
    try {
        const id = Number(req.params.id);

        const dados = {};

        if (req.body.enunciado !== undefined) {
            dados.enunciado = req.body.enunciado;
        }

        if (req.body.dificuldade !== undefined) {
            dados.dificuldade = req.body.dificuldade;
        }

        if (req.body.disciplinaId !== undefined) {
            dados.disciplinaId = req.body.disciplinaId;
        }

        if (req.body.categoriaId !== undefined) {
            dados.categoriaId = req.body.categoriaId;
        }

        const assuntoIds =
            req.body.assuntoIds !== undefined
                ? req.body.assuntoIds
                : undefined;

        const questao = await repository.atualizarComAssuntos(
            id,
            dados,
            assuntoIds
        );

        if (!questao) {
            return res.status(404).json({
                erro: 'Questão não encontrada'
            });
        }

        res.status(200).json(questao);
    } catch (erro) {
        next(erro);
    }
}

// DELETE /questoes/:id
async function excluirQuestao(req, res, next) {
    try {
        const id = Number(req.params.id);

        const questao = await repository.excluir(id);

        if (!questao) {
            return res.status(404).json({
                erro: 'Questão não encontrada'
            });
        }

        res.status(204).send();
    } catch (erro) {
        next(erro);
    }
}

module.exports = {
    listarQuestoes,
    buscarQuestaoPorId,
    criarQuestao,
    substituirQuestao,
    atualizarQuestao,
    excluirQuestao
};