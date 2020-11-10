'use strict';
const { Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class container extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // conatiner hasMany testconfigs
      container.hasMany(models.testConfig)
      container.hasMany(models.testVariant)
    }
  };
  container.init({
    name: DataTypes.STRING,
    cntId:DataTypes.STRING,
    userInfo:DataTypes.JSONB
  },{
    sequelize,
    modelName: 'container',
  });
  return container;
};