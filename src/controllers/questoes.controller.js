const {
    questoesService: service,
    notificacoesService
} = require('../config/container');

const {
    criarQuestaoDTO,
    atualizarQuestaoDTO
} = require('../dtos/questao.dto');

// GET /questoes
async function listarQuestoes(req, res, next) {
    try {
        const resultado = await service.listarQuestoes({
            dificuldade: req.query.dificuldade,
            status: req.query.status,
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

        const questao =
            await service.buscarQuestaoPorId(id);

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

        const novaQuestao =
            await service.criarQuestao(
                dados,
                assuntoIds
            );

        const io = req.app.get('io');

        const nomeSala =
            `disciplina:${novaQuestao.disciplinaId}`;

        io.to(nomeSala).emit(
            'questao_criada',
            {
                id: novaQuestao.id,
                enunciado: novaQuestao.enunciado,
                disciplinaId:
                    novaQuestao.disciplinaId,
                categoriaId:
                    novaQuestao.categoriaId,
                dificuldade:
                    novaQuestao.dificuldade,
                status:
                    novaQuestao.status
            }
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

        const questaoAnterior =
            await service.buscarQuestaoPorId(id);

        const statusAnterior =
            questaoAnterior.status;

        const {
            dados,
            assuntoIds
        } = criarQuestaoDTO(req.body);

        const questao =
            await service.substituirQuestao(
                id,
                dados,
                assuntoIds
            );

        const io = req.app.get('io');

        const nomeSala =
            `disciplina:${questao.disciplinaId}`;

        io.to(nomeSala).emit(
            'questao_atualizada',
            {
                id: questao.id,
                enunciado: questao.enunciado,
                disciplinaId:
                    questao.disciplinaId,
                categoriaId:
                    questao.categoriaId,
                dificuldade:
                    questao.dificuldade,
                status:
                    questao.status
            }
        );

        if (questao.status !== statusAnterior) {
            const notificacao =
                await notificacoesService.criarNotificacao({
                    mensagem:
                        `Questão ${questao.id}: status alterado ` +
                        `de ${statusAnterior} para ${questao.status}`,
                    tipo: 'status_questao_alterado',
                    questaoId: questao.id,
                    disciplinaId:
                        questao.disciplinaId
                });

            io.to(nomeSala).emit(
                'status_questao_alterado',
                {
                    questaoId: questao.id,
                    disciplinaId:
                        questao.disciplinaId,
                    statusAnterior,
                    statusAtual:
                        questao.status
                }
            );

            io.to(nomeSala).emit(
                'notificacao_nova',
                notificacao
            );
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

        const questaoAnterior =
            await service.buscarQuestaoPorId(id);

        const statusAnterior =
            questaoAnterior.status;

        const {
            dados,
            assuntoIds
        } = atualizarQuestaoDTO(req.body);

        const questao =
            await service.atualizarQuestao(
                id,
                dados,
                assuntoIds
            );

        const io = req.app.get('io');

        const nomeSala =
            `disciplina:${questao.disciplinaId}`;

        io.to(nomeSala).emit(
            'questao_atualizada',
            {
                id: questao.id,
                enunciado: questao.enunciado,
                disciplinaId:
                    questao.disciplinaId,
                categoriaId:
                    questao.categoriaId,
                dificuldade:
                    questao.dificuldade,
                status:
                    questao.status
            }
        );

        if (
            dados.status !== undefined &&
            questao.status !== statusAnterior
        ) {
            const notificacao =
                await notificacoesService.criarNotificacao({
                    mensagem:
                        `Questão ${questao.id}: status alterado ` +
                        `de ${statusAnterior} para ${questao.status}`,
                    tipo: 'status_questao_alterado',
                    questaoId: questao.id,
                    disciplinaId:
                        questao.disciplinaId
                });

            io.to(nomeSala).emit(
                'status_questao_alterado',
                {
                    questaoId:
                        questao.id,
                    disciplinaId:
                        questao.disciplinaId,
                    statusAnterior,
                    statusAtual:
                        questao.status
                }
            );

            io.to(nomeSala).emit(
                'notificacao_nova',
                notificacao
            );
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

        const questao =
            await service.excluirQuestao(id);

        const io = req.app.get('io');

        const nomeSala =
            `disciplina:${questao.disciplinaId}`;

        io.to(nomeSala).emit(
            'questao_excluida',
            {
                id: questao.id,
                disciplinaId:
                    questao.disciplinaId
            }
        );

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