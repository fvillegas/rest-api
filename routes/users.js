const express = require('express');
const router = express.Router();
const UserService = require('../services/users.service');

const userService = new UserService();

router.post('/', async (req, res) => {
  const {email, password, firstname, lastname} = req.body;
  const user = await userService.create(email, password, firstname, lastname);
  const {id, password: deletePassword, createdAt, updatedAt, ...rest} = user.get({plain: true});
  res.send(rest);
});

module.exports = router;
