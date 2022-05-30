const crypto = require('crypto');
const {models} = require("../sequelize");

class TutorialsService {
  fetchByUUID = async () => {
  };
  fetchAll = async () => {
    return await models.tutorial.findAll();
  };
  create = async (title, description, videoUrl) => {
    return await models.tutorial.create({
      uuid: crypto.randomUUID(),
      title,
      description,
      videoUrl
    });
  };
  delete = async (logical = true) => {
  };
  deleteMany = async (logical = true) => {
  };
}

module.exports = TutorialsService;