const express = require('express');
const router = express.Router();
const AuthenticateService = require("../services/authenticate.service");
const UsersService = require("../services/users.service");

// Should support query params as well for filtering and sorting

const userService = new UsersService();
const authenticationService = new AuthenticateService();
const verifyJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
      return res.sendStatus(401)
    }

    const jwtToken = authenticationService.verifyJWT(token);
    if (jwtToken === null) {
      return res.sendStatus(403);
    }
    const user = await userService.findByEmail(jwtToken.email);
    if (user === null) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  } catch (e) {
    console.error('fail to verify jwt', e.message, e);
    res.sendStatus(401);
  }
};

// GET - /tutorials/ - Tutorial list
router.get('/', verifyJWT, async (req, res) => {
  res.send('GET /tutorials');
});

// GET - /tutorials/:id - Tutorial show
router.get('/:uuid', verifyJWT, async (req, res) => {
  res.send('GET /tutorials/:uuid');
});

// PUT - /tutorials/:id - Tutorial update
router.put('/:uuid', verifyJWT, async (req, res) => {
  res.send('PUT /tutorials/:uuid');
});

// POST - /tutorials/ - Tutorial create
router.post('/', verifyJWT, (req, res) => {
  res.send('POST /tutorials');
});

// DELETE - /tutorials/mass_delete - Delete all tutorials
router.delete('/mass_delete', verifyJWT, async (req, res) => {
  res.send('DELETE /tutorials/mass_delete');
});

// DELETE - /tutorials/:id - Tutorial delete
router.delete('/:uuid', verifyJWT, async (req, res) => {
  res.send('DELETE /tutorials/:uuid');
});

module.exports = router;
