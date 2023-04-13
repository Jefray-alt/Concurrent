const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Counter = sequelize.define('Counter', {
  // Model attributes are defined here
  currentValue: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  myName: {
    type: DataTypes.STRING
  }
}, {
  // Other model options go here
});

module.exports = Counter;