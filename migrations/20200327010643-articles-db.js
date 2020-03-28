'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Articles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      enabled: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      draft: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      creationDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      publicationDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      slug: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      body: {
        allowNull: false,
        type: Sequelize.STRING
      },
      author: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
      },
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
