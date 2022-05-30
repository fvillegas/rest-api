const {models} = require("../sequelize");
const crypto = require('crypto');
const {hash} = require('../utils/user.utils');

class UsersService {
  create = async (email, password, firstname, lastname) => {
    const user = await models.user.create(
      {
        uuid: crypto.randomUUID(),
        email: email,
        firstname: firstname,
        lastname: lastname,
        password: hash(password)
      })
      .catch((err) => console.error('err', err));
    return user;
  }
  findByEmail = async (email) => {
    return await models.user.findOne({where: {email}});
  }
}

module.exports = UsersService;
