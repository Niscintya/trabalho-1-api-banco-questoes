const {
    notificacoesService: service
} = require('../config/container');

async function listarNotificacoes(req, res, next) {
    try {
        const resultado = await service.listarNotificacoes({
            lida: req.query.lida,
            disciplinaId: req.query.disciplinaId,
            tipo: req.query.tipo,
            page: req.query.page,
            limit: req.query.limit
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

async function buscarNotificacaoPorId(req, res, next) {
    try {
        const id = Number(req.params.id);

        const notificacao =
            await service.buscarNotificacaoPorId(id);

        res.status(200).json(notificacao);
    } catch (erro) {
        next(erro);
    }
}

async function criarNotificacao(req, res, next) {
    try {
        const notificacao =
            await service.criarNotificacao({
                mensagem: req.body.mensagem,
                tipo: req.body.tipo,
                questaoId: req.body.questaoId,
                disciplinaId: req.body.disciplinaId
            });

        res.status(201).json(notificacao);
    } catch (erro) {
        next(erro);
    }
}

async function marcarComoLida(req, res, next) {
    try {
        const id = Number(req.params.id);

        const notificacao =
            await service.marcarComoLida(id);

        res.status(200).json(notificacao);
    } catch (erro) {
        next(erro);
    }
}

async function marcarTodasComoLidas(req, res, next) {
    try {
        const disciplinaId =
            req.body.disciplinaId !== undefined
                ? Number(req.body.disciplinaId)
                : undefined;

        const quantidade =
            await service.marcarTodasComoLidas(
                disciplinaId
            );

        res.status(200).json({
            mensagem: 'Notificações marcadas como lidas',
            quantidade
        });
    } catch (erro) {
        next(erro);
    }
}

async function excluirNotificacao(req, res, next) {
    try {
        const id = Number(req.params.id);

        await service.excluirNotificacao(id);

        res.status(204).send();
    } catch (erro) {
        next(erro);
    }
}

module.exports = {
    listarNotificacoes,
    buscarNotificacaoPorId,
    criarNotificacao,
    marcarComoLida,
    marcarTodasComoLidas,
    excluirNotificacao
};