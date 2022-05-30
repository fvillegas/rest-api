const crypto = require('crypto');
const {models} = require("../sequelize");

class TutorialsService {
  fetchByUUID = async (uuid) => {
    return await models.tutorial.findOne({where: {uuid}});
  };
  fetchAll = async () => {
    return await models.tutorial.findAll({where: {deletedAt: null}});
  };
  create = async (title, description, videoUrl) => {
    return await models.tutorial.create({
      uuid: crypto.randomUUID(),
      title,
      description,
      videoUrl
    });
  };
  delete = async (uuid, logical = true) => {
    if (logical) {
      await models.tutorial.update(
        {deletedAt: new Date().getTime()},
        {where: {uuid}});
      return this.fetchByUUID(uuid);
    }
  };
  deleteMany = async (logical = true) => {
  };
}

module.exports = TutorialsService;