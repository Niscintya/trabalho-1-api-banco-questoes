const {
    Questao,
    Disciplina,
    Categoria,
    Assunto,
    sequelize
} = require('../../models');

const { Op } = require('sequelize');

// Valida se disciplina, categoria e assuntos existem
async function validarRelacionamentos(dados, assuntoIds = []) {

    if (dados.disciplinaId !== undefined) {
        const disciplina = await Disciplina.findByPk(dados.disciplinaId);

        if (!disciplina) {
            const erro = new Error('Disciplina não encontrada');
            erro.statusCode = 404;
            throw erro;
        }
    }

    if (dados.categoriaId !== undefined) {
        const categoria = await Categoria.findByPk(dados.categoriaId);

        if (!categoria) {
            const erro = new Error('Categoria não encontrada');
            erro.statusCode = 404;
            throw erro;
        }
    }

    if (Array.isArray(assuntoIds) && assuntoIds.length > 0) {
        const assuntos = await Assunto.findAll({
            where: {
                id: {
                    [Op.in]: assuntoIds
                }
            }
        });

        if (assuntos.length !== assuntoIds.length) {
            const erro = new Error('Um ou mais assuntos não foram encontrados');
            erro.statusCode = 404;
            throw erro;
        }
    }
}

// LISTAR QUESTÕES
async function listarTodas(opcoes = {}) {
    const {
        dificuldade,
        busca,
        page = 1,
        limit = 10,
        ordenar = 'id',
        direcao = 'asc'
    } = opcoes;

    const where = {};

    if (dificuldade) {
        where.dificuldade = dificuldade;
    }

    if (busca) {
        where.enunciado = {
            [Op.iLike]: `%${busca}%`
        };
    }

    const pagina = Number(page);
    const limite = Number(limit);
    const offset = (pagina - 1) * limite;

    const camposPermitidos = [
        'id',
        'enunciado',
        'dificuldade',
        'createdAt'
    ];

    const campoOrdenacao = camposPermitidos.includes(ordenar)
        ? ordenar
        : 'id';

    const direcaoOrdenacao =
        String(direcao).toLowerCase() === 'desc'
            ? 'DESC'
            : 'ASC';

    const resultado = await Questao.findAndCountAll({
        where,
        include: [
            { model: Disciplina },
            { model: Categoria },
            { model: Assunto }
        ],
        order: [[campoOrdenacao, direcaoOrdenacao]],
        limit: limite,
        offset,
        distinct: true
    });

    return {
        dados: resultado.rows,
        total: resultado.count,
        page: pagina,
        limit: limite,
        totalPaginas: Math.ceil(resultado.count / limite)
    };
}

// BUSCAR QUESTÃO POR ID
async function buscarPorId(id) {
    return await Questao.findByPk(id, {
        include: [
            { model: Disciplina },
            { model: Categoria },
            { model: Assunto }
        ]
    });
}

// CRIAR QUESTÃO SIMPLES
async function criar(dados) {
    await validarRelacionamentos(dados);

    return await Questao.create(dados);
}

// CRIAR QUESTÃO COM ASSUNTOS - TRANSAÇÃO
async function criarComAssuntos(dados, assuntoIds = []) {

    await validarRelacionamentos(dados, assuntoIds);

    const transacao = await sequelize.transaction();

    try {
        const questao = await Questao.create(dados, {
            transaction: transacao
        });

        if (assuntoIds.length > 0) {
            await questao.setAssuntos(assuntoIds, {
                transaction: transacao
            });
        }

        await transacao.commit();

        return await buscarPorId(questao.id);

    } catch (erro) {
        await transacao.rollback();
        throw erro;
    }
}

// ATUALIZAR QUESTÃO
async function atualizar(id, dados) {

    await validarRelacionamentos(dados);

    const questao = await Questao.findByPk(id);

    if (!questao) {
        return null;
    }

    await questao.update(dados);

    return questao;
}

// ATUALIZAR QUESTÃO COM ASSUNTOS - TRANSAÇÃO
async function atualizarComAssuntos(id, dados, assuntoIds) {

    await validarRelacionamentos(
        dados,
        Array.isArray(assuntoIds) ? assuntoIds : []
    );

    const transacao = await sequelize.transaction();

    try {
        const questao = await Questao.findByPk(id, {
            transaction: transacao
        });

        if (!questao) {
            await transacao.rollback();
            return null;
        }

        await questao.update(dados, {
            transaction: transacao
        });

        if (Array.isArray(assuntoIds)) {
            await questao.setAssuntos(assuntoIds, {
                transaction: transacao
            });
        }

        await transacao.commit();

        return await buscarPorId(id);

    } catch (erro) {
        await transacao.rollback();
        throw erro;
    }
}

// EXCLUIR QUESTÃO
async function excluir(id) {

    const questao = await Questao.findByPk(id);

    if (!questao) {
        return null;
    }

    await questao.destroy();

    return questao;
}

module.exports = {
    listarTodas,
    buscarPorId,
    criar,
    criarComAssuntos,
    atualizar,
    atualizarComAssuntos,
    excluir
};