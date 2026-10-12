const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Notificacao extends Model {
        static associate(models) {
            Notificacao.belongsTo(models.Questao, {
                foreignKey: 'questaoId',
                onDelete: 'SET NULL'
            });

            Notificacao.belongsTo(models.Disciplina, {
                foreignKey: 'disciplinaId'
            });
        }
    }

    Notificacao.init(
        {
            mensagem: {
                type: DataTypes.TEXT,
                allowNull: false
            },

            tipo: {
                type: DataTypes.STRING,
                allowNull: false
            },

            lida: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },

            questaoId: {
                type: DataTypes.INTEGER,
                allowNull: true
            },

            disciplinaId: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'Notificacao',
            tableName: 'notificacoes',

            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );

    return Notificacao;
};