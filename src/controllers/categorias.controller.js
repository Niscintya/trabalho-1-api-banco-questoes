const repository = require('../repositories/categorias.repository');

// GET /categorias
async function listarCategorias(req, res, next) {
    try {
        const categorias = await repository.listarTodas();

        res.status(200).json(categorias);
    } catch (erro) {
        next(erro);
    }
}

// GET /categorias/:id
async function buscarCategoriaPorId(req, res, next) {
    try {
        const id = Number(req.params.id);

        const categoria = await repository.buscarPorId(id);

        if (!categoria) {
            return res.status(404).json({
                erro: 'Categoria não encontrada'
            });
        }

        res.status(200).json(categoria);
    } catch (erro) {
        next(erro);
    }
}

// POST /categorias
async function criarCategoria(req, res, next) {
    try {
        if (!req.body || !req.body.nome) {
            return res.status(400).json({
                erro: 'O nome é obrigatório'
            });
        }

        const novaCategoria = await repository.criar({
            nome: req.body.nome
        });

        res.status(201).json(novaCategoria);
    } catch (erro) {
        next(erro);
    }
}

// PUT /categorias/:id
async function substituirCategoria(req, res, next) {
    try {
        const id = Number(req.params.id);

        if (!req.body || !req.body.nome) {
            return res.status(400).json({
                erro: 'O nome é obrigatório'
            });
        }

        const categoria = await repository.atualizar(id, {
            nome: req.body.nome
        });

        if (!categoria) {
            return res.status(404).json({
                erro: 'Categoria não encontrada'
            });
        }

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

        const categoria = await repository.atualizar(id, dados);

        if (!categoria) {
            return res.status(404).json({
                erro: 'Categoria não encontrada'
            });
        }

        res.status(200).json(categoria);
    } catch (erro) {
        next(erro);
    }
}

// DELETE /categorias/:id
async function excluirCategoria(req, res, next) {
    try {
        const id = Number(req.params.id);

        const categoria = await repository.excluir(id);

        if (!categoria) {
            return res.status(404).json({
                erro: 'Categoria não encontrada'
            });
        }

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