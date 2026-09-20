const express = require('express');

const controller = require('../controllers/assuntos.controller');

const router = express.Router();

// GET /assuntos
router.get('/', controller.listarAssuntos);

// GET /assuntos/:id
router.get('/:id', controller.buscarAssuntoPorId);

// POST /assuntos
router.post('/', controller.criarAssunto);

// PUT /assuntos/:id
router.put('/:id', controller.substituirAssunto);

// PATCH /assuntos/:id
router.patch('/:id', controller.atualizarAssunto);

// DELETE /assuntos/:id
router.delete('/:id', controller.excluirAssunto);

module.exports = router;