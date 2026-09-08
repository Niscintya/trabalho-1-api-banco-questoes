const express = require('express');

const {
    listarCategorias,
    buscarCategoriaPorId,
    criarCategoria,
    substituirCategoria,
    atualizarCategoria,
    excluirCategoria
} = require('../controllers/categorias.controller');

const router = express.Router();

router.get('/', listarCategorias);

router.get('/:id', buscarCategoriaPorId);

router.post('/', criarCategoria);

router.put('/:id', substituirCategoria);

router.patch('/:id', atualizarCategoria);

router.delete('/:id', excluirCategoria);

module.exports = router;