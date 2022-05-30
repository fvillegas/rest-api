const {DataTypes} = require('sequelize');

//Tutorial
// id (required)
// title (required)
// video url (optional)
// description (optional)
// published status (required)
// deleted at (optional).

module.exports = async (sequelize) => {
  const Tutorial = sequelize.define('tutorial', {
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
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    videoUrl: {
      allowNull: true,
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    description: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    published: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    }
  });
  await Tutorial.sync();
}
