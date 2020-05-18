'use strict';
module.exports = (sequelize, DataTypes) => {
  const Prompt = sequelize.define('Prompt', {
    title: DataTypes.TEXT
  });
  Prompt.associate = function(models) {
    // associations can be defined here
  };
  return Prompt;
};