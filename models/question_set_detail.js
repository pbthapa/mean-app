'use strict';
module.exports = (sequelize, DataTypes) => {
  var QuestionSetDetail = sequelize.define('QuestionSetDetail', {
    questionSetName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    totalTime: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    totalMark: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    questionId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    underscored: true,
    tableName: "question_set_detail",
    timestamps: false
  });
  QuestionSetDetail.associate = function(models) {
    QuestionSetDetail.belongsTo(models.Question, {
      foreignKey: "question_id"
    });
  };
  return QuestionSetDetail;
};