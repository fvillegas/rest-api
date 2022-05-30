const {DataTypes} = require('sequelize');

// User
//  id (required),
//  name (required),
//  last name (required),
//  email (required),
//  password (required)

module.exports = async (sequelize) => {
  const User = sequelize.define('user', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    uuid: {
      allowNull: false,
      type: DataTypes.UUID,
      unique: true
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      },
      unique: true
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    firstname: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastname: {
      allowNull: false,
      type: DataTypes.STRING
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING
    }
  });
  await User.sync();
};
