'use strict';
module.exports = (sequelize, DataTypes) => {
  var SubjectArea = sequelize.define('SubjectArea', {
    subject: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    underscored: true,
    tableName: "subject_area",
    timestamps: false
  });
  SubjectArea.associate = function(models) {
    //SubjectArea.hasMany(models.Question)
  };
  return SubjectArea;
};