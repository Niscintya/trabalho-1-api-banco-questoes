const repository = require('../repositories/assuntos.repository');

// GET /assuntos
async function listarAssuntos(req, res, next) {
    try {
        const assuntos = await repository.listarTodas();

        res.status(200).json(assuntos);
    } catch (erro) {
        next(erro);
    }
}

// GET /assuntos/:id
async function buscarAssuntoPorId(req, res, next) {
    try {
        const id = Number(req.params.id);

        const assunto = await repository.buscarPorId(id);

        if (!assunto) {
            return res.status(404).json({
                erro: 'Assunto não encontrado'
            });
        }

        res.status(200).json(assunto);
    } catch (erro) {
        next(erro);
    }
}

// POST /assuntos
async function criarAssunto(req, res, next) {
    try {
        if (!req.body || !req.body.nome) {
            return res.status(400).json({
                erro: 'O nome é obrigatório'
            });
        }

        const novoAssunto = await repository.criar({
            nome: req.body.nome
        });

        res.status(201).json(novoAssunto);
    } catch (erro) {
        next(erro);
    }
}

// PUT /assuntos/:id
async function substituirAssunto(req, res, next) {
    try {
        const id = Number(req.params.id);

        if (!req.body || !req.body.nome) {
            return res.status(400).json({
                erro: 'O nome é obrigatório'
            });
        }

        const assunto = await repository.atualizar(id, {
            nome: req.body.nome
        });

        if (!assunto) {
            return res.status(404).json({
                erro: 'Assunto não encontrado'
            });
        }

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

        const assunto = await repository.atualizar(id, dados);

        if (!assunto) {
            return res.status(404).json({
                erro: 'Assunto não encontrado'
            });
        }

        res.status(200).json(assunto);
    } catch (erro) {
        next(erro);
    }
}

// DELETE /assuntos/:id
async function excluirAssunto(req, res, next) {
    try {
        const id = Number(req.params.id);

        const assunto = await repository.excluir(id);

        if (!assunto) {
            return res.status(404).json({
                erro: 'Assunto não encontrado'
            });
        }

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