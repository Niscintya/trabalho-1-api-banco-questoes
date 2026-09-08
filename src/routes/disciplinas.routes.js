const express = require('express');

const {
    listarDisciplinas,
    buscarDisciplinaPorId,
    criarDisciplina,
    substituirDisciplina,
    atualizarDisciplina,
    excluirDisciplina,
    listarQuestoesDaDisciplina
} = require('../controllers/disciplinas.controller');

const router = express.Router();

// Rota relacionada: precisa ficar antes de /:id
router.get('/:id/questoes', listarQuestoesDaDisciplina);

router.get('/', listarDisciplinas);

router.get('/:id', buscarDisciplinaPorId);

router.post('/', criarDisciplina);

router.put('/:id', substituirDisciplina);

router.patch('/:id', atualizarDisciplina);

router.delete('/:id', excluirDisciplina);

module.exports = router;