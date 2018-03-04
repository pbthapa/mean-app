'use strict';
module.exports = (sequelize, DataTypes) => {
  var QuestionSetDetail = sequelize.define('QuestionSetDetail', {
    question_set_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    total_time: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total_mark: {
      type: DataTypes.INTEGER,
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
    QuestionSetDetail.belongsToMany(models.Question, {
      as: 'questions',
      through: 'question_set_detail_group', //this can be string or a model,
      foreignKey: 'set_detail_id'
    });
  };
  return QuestionSetDetail;
};