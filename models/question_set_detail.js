'use strict';
module.exports = (sequelize, DataTypes) => {
  var QuestionSetDetail = sequelize.define('QuestionSetDetail', {
    question_set_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
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
    },
    active_on: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    underscored: true,
    tableName: "question_set_detail",
    timestamps: true
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