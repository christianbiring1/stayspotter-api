'use strict';

module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    spot_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: "reviews"
  });
  Review.associate = function(models) {
    Review.belongsTo(models.User, {
      foreignKey: 'user_id'
    });

    Review.belongsTo(models.Spot, {
      foreignKey: 'spot_id'
    })
  }
  return Review
}