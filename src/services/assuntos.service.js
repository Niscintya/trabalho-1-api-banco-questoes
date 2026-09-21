const repository = require('../repositories/assuntos.repository');

// Lista todos os assuntos
async function listarAssuntos() {
    return await repository.listarTodas();
}

// Busca um assunto pelo ID
async function buscarAssuntoPorId(id) {
    const assunto = await repository.buscarPorId(id);

    if (!assunto) {
        const erro = new Error('Assunto não encontrado');
        erro.statusCode = 404;
        throw erro;
    }

    return assunto;
}

// Cria um assunto
async function criarAssunto(dados) {
    if (!dados.nome) {
        const erro = new Error('O nome é obrigatório');
        erro.statusCode = 400;
        throw erro;
    }

    return await repository.criar(dados);
}

// Atualiza um assunto
async function atualizarAssunto(id, dados) {
    const assunto = await repository.atualizar(id, dados);

    if (!assunto) {
        const erro = new Error('Assunto não encontrado');
        erro.statusCode = 404;
        throw erro;
    }

    return assunto;
}

// Exclui um assunto
async function excluirAssunto(id) {
    const assunto = await repository.excluir(id);

    if (!assunto) {
        const erro = new Error('Assunto não encontrado');
        erro.statusCode = 404;
        throw erro;
    }

    return assunto;
}

module.exports = {
    listarAssuntos,
    buscarAssuntoPorId,
    criarAssunto,
    atualizarAssunto,
    excluirAssunto
};