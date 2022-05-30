const {models} = require("../sequelize");
const crypto = require('crypto');
const {hash} = require('../utils/user.utils');

class UsersService {
  create = async (email, password, firstname, lastname, role) => {
    const user = await models.user.create(
      {
        uuid: crypto.randomUUID(),
        email,
        firstname,
        lastname,
        password: hash(password),
        role
      })
      .catch((err) => console.error('err', err));
    return user;
  }
  findByEmail = async (email) => {
    return await models.user.findOne({where: {email}});
  }
}

module.exports = UsersService;
