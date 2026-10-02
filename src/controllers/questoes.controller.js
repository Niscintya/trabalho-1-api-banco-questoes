const { questoesService: service } = require('../config/container');

const {
    criarQuestaoDTO,
    atualizarQuestaoDTO
} = require('../dtos/questao.dto');

// GET /questoes
async function listarQuestoes(req, res, next) {
    try {
        const resultado = await service.listarQuestoes({
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

        const questao = await service.buscarQuestaoPorId(id);

        res.status(200).json(questao);
    } catch (erro) {
        next(erro);
    }
}

// POST /questoes
async function criarQuestao(req, res, next) {
    try {
        const {
            dados,
            assuntoIds
        } = criarQuestaoDTO(req.body);

        const novaQuestao = await service.criarQuestao(
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

        const {
            dados,
            assuntoIds
        } = criarQuestaoDTO(req.body);

        const questao = await service.substituirQuestao(
            id,
            dados,
            assuntoIds
        );

        res.status(200).json(questao);
    } catch (erro) {
        next(erro);
    }
}

// PATCH /questoes/:id
async function atualizarQuestao(req, res, next) {
    try {
        const id = Number(req.params.id);

        const {
            dados,
            assuntoIds
        } = atualizarQuestaoDTO(req.body);

        const questao = await service.atualizarQuestao(
            id,
            dados,
            assuntoIds
        );

        res.status(200).json(questao);
    } catch (erro) {
        next(erro);
    }
}

// DELETE /questoes/:id
async function excluirQuestao(req, res, next) {
    try {
        const id = Number(req.params.id);

        await service.excluirQuestao(id);

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