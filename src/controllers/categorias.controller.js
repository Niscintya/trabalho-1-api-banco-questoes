const service = require('../services/categorias.service');

// GET /categorias
async function listarCategorias(req, res, next) {
    try {
        const categorias = await service.listarCategorias();

        res.status(200).json(categorias);
    } catch (erro) {
        next(erro);
    }
}

// GET /categorias/:id
async function buscarCategoriaPorId(req, res, next) {
    try {
        const id = Number(req.params.id);

        const categoria = await service.buscarCategoriaPorId(id);

        res.status(200).json(categoria);
    } catch (erro) {
        next(erro);
    }
}

// POST /categorias
async function criarCategoria(req, res, next) {
    try {
        const dados = {
            nome: req.body.nome
        };

        const novaCategoria = await service.criarCategoria(dados);

        res.status(201).json(novaCategoria);
    } catch (erro) {
        next(erro);
    }
}

// PUT /categorias/:id
async function substituirCategoria(req, res, next) {
    try {
        const id = Number(req.params.id);

        const dados = {
            nome: req.body.nome
        };

        const categoria = await service.atualizarCategoria(
            id,
            dados
        );

        res.status(200).json(categoria);
    } catch (erro) {
        next(erro);
    }
}

// PATCH /categorias/:id
async function atualizarCategoria(req, res, next) {
    try {
        const id = Number(req.params.id);

        const dados = {};

        if (req.body.nome !== undefined) {
            dados.nome = req.body.nome;
        }

        const categoria = await service.atualizarCategoria(
            id,
            dados
        );

        res.status(200).json(categoria);
    } catch (erro) {
        next(erro);
    }
}

// DELETE /categorias/:id
async function excluirCategoria(req, res, next) {
    try {
        const id = Number(req.params.id);

        await service.excluirCategoria(id);

        res.status(204).send();
    } catch (erro) {
        next(erro);
    }
}

module.exports = {
    listarCategorias,
    buscarCategoriaPorId,
    criarCategoria,
    substituirCategoria,
    atualizarCategoria,
    excluirCategoria
};