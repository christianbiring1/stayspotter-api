'use strict';
// const { Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 30]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [10, 256]
      }
    },
    hashedPassword: {
      type: DataTypes.STRING(),
      allowNull: false,
      // validate: {
      //   is: /^[0-9a-f]{64}$/i
      // }
    }
  }, {});

  User.associate = function(models) {
    User.hasMany(models.Spot, {
      foreignKey: 'user_id',
    })
  }
  return User;
};
