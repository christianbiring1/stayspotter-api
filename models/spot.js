'use strict';

module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define('Spot', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    tableName: "spots"
  });
  Spot.associate = function(models) {
    Spot.belongsTo(models.User, {
      foreignKey: 'user_id',
    });

    Spot.hasMany(models.Review, {
      foreignKey: 'spot_id'
    })
  };
  return Spot;
};
