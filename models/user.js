'use strict';
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
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
        len: [10, 256],
        isEmail: true
      }
    },
    hashedPassword: {
      type: DataTypes.STRING(),
      allowNull: false,
    }
  }, {
    tableName: "users",
    // toJSON: {
    //   exclude: ['id']
    // },
    hooks: {
      // Hook for generating token before user is created
      beforeCreate: async (user) => {
        user.token = await user.generateToken();
      },
      // Hook for generating token before user is updated
      beforeUpdate: async (user) => {
        user.token = await user.generateToken();
      }
    }
  });

  User.associate = function(models) {
    User.hasMany(models.Spot, {
      foreignKey: 'user_id',
    });

    User.hasMany(models.Review, {
      foreignKey: 'user_id'
    })
  };
   User.prototype.generateToken = async function() {
    // You can customize your token generation logic here
    const token = jwt.sign({ uuid: this.uuid }, config.get('jwtPrivateKey'), { expiresIn: '1w' });
    return token;
  };

  return User;
};
