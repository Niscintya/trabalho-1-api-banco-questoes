'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Assunto extends Model {
        static associate(models) {
            Assunto.belongsToMany(models.Questao, {
                through: 'questao_assuntos',
                foreignKey: 'assuntoId',
                otherKey: 'questaoId'
            });
        }
    }

    Assunto.init(
        {
            nome: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        },
        {
            sequelize,
            modelName: 'Assunto',
            tableName: 'assuntos',

            // Campos de auditoria no banco
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );

    return Assunto;
};