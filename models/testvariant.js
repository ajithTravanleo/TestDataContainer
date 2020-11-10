'use strict';
const { Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class testVariant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       testVariant.belongsTo(models.container,{foreignKey:'containerId'})
       testVariant.belongsTo(models.testConfig,{foreignKey:'configId'})
      // testVariant.belongsTo(models.testConfig,{foreignKey: 'configId'})
      //testVariant.hasOne(models.container)
    }
  };
  testVariant.init({
    variant: DataTypes.JSONB
  }, {
    sequelize,
    modelName: 'testVariant',
  });
  return testVariant;
};