'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('questoes', 'dificuldade', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'media'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('questoes', 'dificuldade', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};