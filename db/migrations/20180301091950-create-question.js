'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('question', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      question: {
        type: Sequelize.STRING,
        allowNull: false
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      option_a: {
        type: Sequelize.STRING,
        allowNull: false
      },
      option_b: {
        type: Sequelize.STRING,
        allowNull: false
      },
      option_c: {
        type: Sequelize.STRING,
        allowNull: false
      },
      option_d: {
        type: Sequelize.STRING,
        allowNull: false
      },
      correct_option: {
        type: Sequelize.STRING,
        allowNull: false
      },
      level: {
        type: Sequelize.INTEGER
      },
      subject_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "subject_area",
          key: "id"
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('question');
  }
};