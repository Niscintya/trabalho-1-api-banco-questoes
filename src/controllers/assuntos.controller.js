const service = require('../services/assuntos.service');

// GET /assuntos
async function listarAssuntos(req, res, next) {
    try {
        const assuntos = await service.listarAssuntos();

        res.status(200).json(assuntos);
    } catch (erro) {
        next(erro);
    }
}

// GET /assuntos/:id
async function buscarAssuntoPorId(req, res, next) {
    try {
        const id = Number(req.params.id);

        const assunto = await service.buscarAssuntoPorId(id);

        res.status(200).json(assunto);
    } catch (erro) {
        next(erro);
    }
}

// POST /assuntos
async function criarAssunto(req, res, next) {
    try {
        const dados = {
            nome: req.body.nome
        };

        const novoAssunto = await service.criarAssunto(dados);

        res.status(201).json(novoAssunto);
    } catch (erro) {
        next(erro);
    }
}

// PUT /assuntos/:id
async function substituirAssunto(req, res, next) {
    try {
        const id = Number(req.params.id);

        const dados = {
            nome: req.body.nome
        };

        const assunto = await service.atualizarAssunto(
            id,
            dados
        );

        res.status(200).json(assunto);
    } catch (erro) {
        next(erro);
    }
}

// PATCH /assuntos/:id
async function atualizarAssunto(req, res, next) {
    try {
        const id = Number(req.params.id);

        const dados = {};

        if (req.body.nome !== undefined) {
            dados.nome = req.body.nome;
        }

        const assunto = await service.atualizarAssunto(
            id,
            dados
        );

        res.status(200).json(assunto);
    } catch (erro) {
        next(erro);
    }
}

// DELETE /assuntos/:id
async function excluirAssunto(req, res, next) {
    try {
        const id = Number(req.params.id);

        await service.excluirAssunto(id);

        res.status(204).send();
    } catch (erro) {
        next(erro);
    }
}

module.exports = {
    listarAssuntos,
    buscarAssuntoPorId,
    criarAssunto,
    substituirAssunto,
    atualizarAssunto,
    excluirAssunto
};