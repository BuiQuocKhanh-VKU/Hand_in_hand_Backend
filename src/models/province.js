'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Province extends Model {
    static associate(models) {
      // Một tỉnh có nhiều chiến dịch
      Province.hasMany(models.Campaign, { foreignKey: 'province_id', as: 'campaigns' });
    }
  };
  Province.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    image: DataTypes.TEXT,
    description: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Province',
    tableName: 'Provinces',
  });
  return Province;
};
