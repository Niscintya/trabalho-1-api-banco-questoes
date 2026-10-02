function criarQuestaoDTO(body = {}) {
    return {
        dados: {
            enunciado: body.enunciado,
            disciplinaId: body.disciplinaId,
            categoriaId: body.categoriaId,
            dificuldade: body.dificuldade
        },

        assuntoIds: Array.isArray(body.assuntoIds)
            ? body.assuntoIds
            : []
    };
}

function atualizarQuestaoDTO(body = {}) {
    const dados = {};

    if (body.enunciado !== undefined) {
        dados.enunciado = body.enunciado;
    }

    if (body.disciplinaId !== undefined) {
        dados.disciplinaId = body.disciplinaId;
    }

    if (body.categoriaId !== undefined) {
        dados.categoriaId = body.categoriaId;
    }

    if (body.dificuldade !== undefined) {
        dados.dificuldade = body.dificuldade;
    }

    const assuntoIds =
        body.assuntoIds !== undefined
            ? body.assuntoIds
            : undefined;

    return {
        dados,
        assuntoIds
    };
}

module.exports = {
    criarQuestaoDTO,
    atualizarQuestaoDTO
};