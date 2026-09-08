const { categorias } = require('../data/db-memoria');

// GET /categorias
function listarCategorias(req, res) {
    res.status(200).json(categorias);
}

// GET /categorias/:id
function buscarCategoriaPorId(req, res) {
    const id = Number(req.params.id);

    const categoria = categorias.find(c => c.id === id);

    if (!categoria) {
        return res.status(404).json({
            erro: 'Categoria não encontrada'
        });
    }

    res.status(200).json(categoria);
}

// POST /categorias
function criarCategoria(req, res) {
    if (!req.body || !req.body.nome) {
        return res.status(400).json({
            erro: 'O nome é obrigatório'
        });
    }

    const existe = categorias.some(
        c => c.nome.toLowerCase() === req.body.nome.toLowerCase()
    );

    if (existe) {
        return res.status(409).json({
            erro: 'Categoria já cadastrada'
        });
    }

    const novaCategoria = {
        id: categorias.length + 1,
        nome: req.body.nome
    };

    categorias.push(novaCategoria);

    res.status(201).json(novaCategoria);
}

// PUT /categorias/:id
function substituirCategoria(req, res) {
    const id = Number(req.params.id);

    const indice = categorias.findIndex(c => c.id === id);

    if (indice === -1) {
        return res.status(404).json({
            erro: 'Categoria não encontrada'
        });
    }

    if (!req.body || !req.body.nome) {
        return res.status(400).json({
            erro: 'O nome é obrigatório'
        });
    }

    categorias[indice] = {
        id: id,
        nome: req.body.nome
    };

    res.status(200).json(categorias[indice]);
}

// PATCH /categorias/:id
function atualizarCategoria(req, res) {
    const id = Number(req.params.id);

    const categoria = categorias.find(c => c.id === id);

    if (!categoria) {
        return res.status(404).json({
            erro: 'Categoria não encontrada'
        });
    }

    if (req.body.nome !== undefined) {
        categoria.nome = req.body.nome;
    }

    res.status(200).json(categoria);
}

// DELETE /categorias/:id
function excluirCategoria(req, res) {
    const id = Number(req.params.id);

    const indice = categorias.findIndex(c => c.id === id);

    if (indice === -1) {
        return res.status(404).json({
            erro: 'Categoria não encontrada'
        });
    }

    categorias.splice(indice, 1);

    res.status(204).send();
}

module.exports = {
    listarCategorias,
    buscarCategoriaPorId,
    criarCategoria,
    substituirCategoria,
    atualizarCategoria,
    excluirCategoria
};