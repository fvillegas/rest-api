const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const modelDefiners = [
  require('../models/user.model'),
];

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

module.exports = sequelize;
