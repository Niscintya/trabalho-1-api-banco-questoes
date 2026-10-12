'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('questoes', 'status', {
            type: Sequelize.ENUM(
                'rascunho',
                'em_revisao',
                'aprovada'
            ),
            allowNull: false,
            defaultValue: 'rascunho'
        });
    },

    async down(queryInterface) {
        await queryInterface.removeColumn('questoes', 'status');

        await queryInterface.sequelize.query(
            'DROP TYPE IF EXISTS "enum_questoes_status";'
        );
    }
};