'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Portfolio, { foreignKey: 'userId' })
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING, 
      allowNull: false, 
      unique: true 
    },
    password: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subscriptionStatus: {
      type: DataTypes.ENUM('FREE', 'PAID'),
      allowNull: false,
      defaultValue: 'FREE'
    },
    stripeCustomerId: {
      type: DataTypes.STRING,
      allowNull: true,
      
    },
    githubLink: {
      type: DataTypes.STRING,
      allowNull: true
    },
    linkedInLink: {
      type: DataTypes.STRING,
      allowNull: true
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      allowNull: false,
      defaultValue: 'user',
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};