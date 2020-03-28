'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      disabled: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      confirmed: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      confirmationCode: {
        allowNull: true,
        type: Sequelize.STRING
      },
      confirmationDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      creationDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      displayName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      passwordTries: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      recovery: {
        allowNull: true,
        type: Sequelize.STRING
      },
      recoveryTries: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      recoveryDate: {
        allowNull: true,
        type: Sequelize.DATE
      },
      lastLogin: {
        allowNull: true,
        type: Sequelize.DATE
      },
      profileImage: {
        allowNull: true,
        type: Sequelize.STRING
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
