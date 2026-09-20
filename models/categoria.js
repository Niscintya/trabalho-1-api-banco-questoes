'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Categoria extends Model {
        static associate(models) {
            Categoria.hasMany(models.Questao, {
                foreignKey: 'categoriaId'
            });
        }
    }

    Categoria.init(
        {
            nome: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        },
        {
            sequelize,
            modelName: 'Categoria',
            tableName: 'categorias',

            // Campos de auditoria no banco
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );

    return Categoria;
};