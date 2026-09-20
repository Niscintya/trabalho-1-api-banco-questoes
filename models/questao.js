'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Questao extends Model {
        static associate(models) {
            Questao.belongsTo(models.Disciplina, {
                foreignKey: 'disciplinaId'
            });

            Questao.belongsTo(models.Categoria, {
                foreignKey: 'categoriaId'
            });

            Questao.belongsToMany(models.Assunto, {
                through: 'questao_assuntos',
                foreignKey: 'questaoId',
                otherKey: 'assuntoId'
            });
        }
    }

    Questao.init(
        {
            enunciado: {
                type: DataTypes.TEXT,
                allowNull: false
            },

            disciplinaId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },

            categoriaId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },

            dificuldade: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'media'
            }
        },
        {
            sequelize,
            modelName: 'Questao',
            tableName: 'questoes',

            // Campos de auditoria no banco
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );

    return Questao;
};