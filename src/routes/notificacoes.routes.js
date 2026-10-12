const express = require('express');

const {
    listarNotificacoes,
    buscarNotificacaoPorId,
    criarNotificacao,
    marcarComoLida,
    marcarTodasComoLidas,
    excluirNotificacao
} = require('../controllers/notificacoes.controller');

const router = express.Router();

router.get('/', listarNotificacoes);

router.post('/', criarNotificacao);

router.patch(
    '/marcar-todas-como-lidas',
    marcarTodasComoLidas
);

router.get('/:id', buscarNotificacaoPorId);

router.patch(
    '/:id/marcar-como-lida',
    marcarComoLida
);

router.delete('/:id', excluirNotificacao);

module.exports = router;