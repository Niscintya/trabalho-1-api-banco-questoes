function erroMiddleware(err, req, res, next) {
    console.error(err);

    // Violação de integridade referencial no PostgreSQL
    // Código 23001 = integrity_constraint_violation
    if (
        err.name === 'SequelizeForeignKeyConstraintError' ||
        err.parent?.code === '23001'
    ) {
        return res.status(409).json({
            erro: 'Não é possível realizar esta operação porque existem registros relacionados'
        });
    }

    // Registro duplicado
    // Código 23505 = unique_violation
    if (
        err.name === 'SequelizeUniqueConstraintError' ||
        err.parent?.code === '23505'
    ) {
        return res.status(409).json({
            erro: 'Registro já existe'
        });
    }

    // Erro de validação
    if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({
            erro: 'Dados inválidos',
            detalhes: err.errors?.map((item) => item.message) || []
        });
    }

    // Erros de conexão com o banco
    if (
        err.name === 'SequelizeConnectionError' ||
        err.name === 'SequelizeConnectionRefusedError' ||
        err.name === 'SequelizeHostNotFoundError'
    ) {
        return res.status(503).json({
            erro: 'Não foi possível conectar ao banco de dados'
        });
    }

    // Erro específico da aplicação
    if (err.statusCode) {
        return res.status(err.statusCode).json({
            erro: err.message
        });
    }

    // Erro genérico
    return res.status(500).json({
        erro: 'Erro interno do servidor'
    });
}

module.exports = erroMiddleware;