'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Theme extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Theme.hasMany(models.Portfolio, { foreignKey: 'themeId' })
    }
  }
  Theme.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fontFamily: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    colors: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    isPremium: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Theme',
  });
  return Theme;
};