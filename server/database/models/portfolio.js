'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Portfolio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Portfolio.belongsTo(models.User, { foreignKey: 'userId' });
      Portfolio.belongsTo(models.Theme, { foreignKey: 'themeId' });
    }
  }
  Portfolio.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    skills: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    projects: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    themeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Theme',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'Portfolio',
  });
  return Portfolio;
};