'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Disciplina extends Model {
        static associate(models) {
            Disciplina.hasMany(models.Questao, {
                foreignKey: 'disciplinaId'
            });
        }
    }

    Disciplina.init(
        {
            nome: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        },
        {
            sequelize,
            modelName: 'Disciplina',
            tableName: 'disciplinas',

            // Campos de auditoria no banco
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );

    return Disciplina;
};