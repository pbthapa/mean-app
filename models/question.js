'use strict';
module.exports = (sequelize, DataTypes) => {
  var Question = sequelize.define('Question', {
    question: {
      type: DataTypes.STRING,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    option_a: {
      type: DataTypes.STRING,
      allowNull: false
    },
    option_b: {
      type: DataTypes.STRING,
      allowNull: false
    },
    option_c: {
      type: DataTypes.STRING,
      allowNull: false
    },
    option_d: {
      type: DataTypes.STRING,
      allowNull: false,
      allowNull: false
    },
    correct_option: {
      type: DataTypes.STRING,
      allowNull: false
    },
    level: {
      type: DataTypes.INTEGER
    }
  }, {
    underscored: true,
    tableName: "question",
    timestamps: false
  });
  Question.associate = function(models) {
    Question.belongsTo(models.SubjectArea, {
      foreignKey: "subject_id"
    });
  };
  return Question;
};