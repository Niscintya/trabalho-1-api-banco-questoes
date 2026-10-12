const {
    Notificacao,
    Questao,
    Disciplina
} = require('../../models');

async function validarRelacionamentos(dados) {
    if (dados.disciplinaId !== undefined) {
        const disciplina = await Disciplina.findByPk(
            dados.disciplinaId
        );

        if (!disciplina) {
            const erro = new Error(
                'Disciplina não encontrada'
            );

            erro.statusCode = 404;
            throw erro;
        }
    }

    if (
        dados.questaoId !== undefined &&
        dados.questaoId !== null
    ) {
        const questao = await Questao.findByPk(
            dados.questaoId
        );

        if (!questao) {
            const erro = new Error(
                'Questão não encontrada'
            );

            erro.statusCode = 404;
            throw erro;
        }

        if (
            dados.disciplinaId !== undefined &&
            questao.disciplinaId !== dados.disciplinaId
        ) {
            const erro = new Error(
                'A questão não pertence à disciplina informada'
            );

            erro.statusCode = 400;
            throw erro;
        }
    }
}

async function listarTodas(opcoes = {}) {
    const {
        lida,
        disciplinaId,
        tipo,
        page = 1,
        limit = 10
    } = opcoes;

    const where = {};

    if (lida !== undefined) {
        if (String(lida).toLowerCase() === 'true') {
            where.lida = true;
        }

        if (String(lida).toLowerCase() === 'false') {
            where.lida = false;
        }
    }

    if (disciplinaId !== undefined) {
        where.disciplinaId = Number(disciplinaId);
    }

    if (tipo) {
        where.tipo = tipo;
    }

    const pagina = Number(page);
    const limite = Number(limit);
    const offset = (pagina - 1) * limite;

    const resultado =
        await Notificacao.findAndCountAll({
            where,

            include: [
                {
                    model: Questao,
                    required: false
                },
                {
                    model: Disciplina
                }
            ],

            order: [
                ['created_at', 'DESC']
            ],

            limit: limite,
            offset,
            distinct: true
        });

    return {
        dados: resultado.rows,
        total: resultado.count,
        page: pagina,
        limit: limite,
        totalPaginas: Math.ceil(
            resultado.count / limite
        )
    };
}

async function buscarPorId(id) {
    return await Notificacao.findByPk(id, {
        include: [
            {
                model: Questao,
                required: false
            },
            {
                model: Disciplina
            }
        ]
    });
}

async function criar(dados) {
    await validarRelacionamentos(dados);

    const notificacao =
        await Notificacao.create(dados);

    return await buscarPorId(
        notificacao.id
    );
}

async function marcarComoLida(id) {
    const notificacao =
        await Notificacao.findByPk(id);

    if (!notificacao) {
        return null;
    }

    await notificacao.update({
        lida: true
    });

    return await buscarPorId(id);
}

async function marcarTodasComoLidas(
    disciplinaId
) {
    const where = {
        lida: false
    };

    if (disciplinaId !== undefined) {
        where.disciplinaId =
            Number(disciplinaId);
    }

    const [quantidade] =
        await Notificacao.update(
            {
                lida: true
            },
            {
                where
            }
        );

    return quantidade;
}

async function excluir(id) {
    const notificacao =
        await Notificacao.findByPk(id);

    if (!notificacao) {
        return null;
    }

    await notificacao.destroy();

    return notificacao;
}

module.exports = {
    listarTodas,
    buscarPorId,
    criar,
    marcarComoLida,
    marcarTodasComoLidas,
    excluir
};