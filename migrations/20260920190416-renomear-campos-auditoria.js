'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {

        // Tabela disciplinas
        await queryInterface.renameColumn(
            'disciplinas',
            'createdAt',
            'created_at'
        );

        await queryInterface.renameColumn(
            'disciplinas',
            'updatedAt',
            'updated_at'
        );

        // Tabela categorias
        await queryInterface.renameColumn(
            'categorias',
            'createdAt',
            'created_at'
        );

        await queryInterface.renameColumn(
            'categorias',
            'updatedAt',
            'updated_at'
        );

        // Tabela assuntos
        await queryInterface.renameColumn(
            'assuntos',
            'createdAt',
            'created_at'
        );

        await queryInterface.renameColumn(
            'assuntos',
            'updatedAt',
            'updated_at'
        );

        // Tabela questoes
        await queryInterface.renameColumn(
            'questoes',
            'createdAt',
            'created_at'
        );

        await queryInterface.renameColumn(
            'questoes',
            'updatedAt',
            'updated_at'
        );

        // Tabela de relacionamento N:N
        await queryInterface.renameColumn(
            'questao_assuntos',
            'createdAt',
            'created_at'
        );

        await queryInterface.renameColumn(
            'questao_assuntos',
            'updatedAt',
            'updated_at'
        );
    },

    async down(queryInterface, Sequelize) {

        await queryInterface.renameColumn(
            'disciplinas',
            'created_at',
            'createdAt'
        );

        await queryInterface.renameColumn(
            'disciplinas',
            'updated_at',
            'updatedAt'
        );

        await queryInterface.renameColumn(
            'categorias',
            'created_at',
            'createdAt'
        );

        await queryInterface.renameColumn(
            'categorias',
            'updated_at',
            'updatedAt'
        );

        await queryInterface.renameColumn(
            'assuntos',
            'created_at',
            'createdAt'
        );

        await queryInterface.renameColumn(
            'assuntos',
            'updated_at',
            'updatedAt'
        );

        await queryInterface.renameColumn(
            'questoes',
            'created_at',
            'createdAt'
        );

        await queryInterface.renameColumn(
            'questoes',
            'updated_at',
            'updatedAt'
        );

        await queryInterface.renameColumn(
            'questao_assuntos',
            'created_at',
            'createdAt'
        );

        await queryInterface.renameColumn(
            'questao_assuntos',
            'updated_at',
            'updatedAt'
        );
    }
};