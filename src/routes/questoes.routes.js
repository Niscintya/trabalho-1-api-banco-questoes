const express = require('express');

const {
    listarQuestoes,
    buscarQuestaoPorId,
    criarQuestao,
    substituirQuestao,
    atualizarQuestao,
    excluirQuestao
} = require('../controllers/questoes.controller');

const router = express.Router();

router.get('/', listarQuestoes);

router.get('/:id', buscarQuestaoPorId);

router.post('/', criarQuestao);

router.put('/:id', substituirQuestao);

router.patch('/:id', atualizarQuestao);

router.delete('/:id', excluirQuestao);

module.exports = router;