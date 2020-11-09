'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class testConfig extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // testConfig belongsTo container
      testConfig.belongsTo(models.container)
    }
  };
  testConfig.init({
    name: DataTypes.STRING,
    config:DataTypes.JSONB
  }, {
    sequelize,
    modelName: 'testConfig',
  });
  return testConfig;
};