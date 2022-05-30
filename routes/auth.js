const express = require('express');
const UserService = require("../services/authenticate.service");
const router = express.Router();

// Should support query params as well for filtering and sorting

const userService = new UserService();

// POST - /auth - Authenticate user
router.post('/', async (req, res) => {
  const {email, password} = req.body;
  if (email === undefined || password === undefined) {
    return res.sendStatus(400);
  }
  const user = await userService.authenticate(email, password);
  if (user === null) {
    return res.send(401);
  }
  const token = await userService.generateJWT(user.email);
  res.send({token});
});

module.exports = router;
