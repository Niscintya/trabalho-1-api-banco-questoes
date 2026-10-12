'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('notificacoes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            mensagem: {
                type: Sequelize.TEXT,
                allowNull: false
            },

            tipo: {
                type: Sequelize.STRING,
                allowNull: false
            },

            lida: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },

            questaoId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'questoes',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },

            disciplinaId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'disciplinas',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },

            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },

            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('notificacoes');
    }
};
