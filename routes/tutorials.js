const express = require('express');
const router = express.Router();
const AuthenticateService = require("../services/authenticate.service");
const UsersService = require("../services/users.service");
const TutorialsService = require("../services/tutorials.service");
const jwt = require("jsonwebtoken");

// Should support query params as well for filtering and sorting

const userService = new UsersService();
const authenticationService = new AuthenticateService();
const tutorialsService = new TutorialsService();

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

const validateCreateToken = async (req, res, next) => {
  try {
    const createToken = req.headers['create_token'];
    authenticationService.verifyCreateJWT(createToken);
  } catch (e) {
    console.error(e, e.message);
    res.sendStatus(403);
  }
  next();
};

const isAdmin = async (req, res, next) => {
  const user = req.user;
  if (user.role !== 'ADMIN') {
    return res.sendStatus(403);
  }
  next();
};

const mapCleanTutorialData = (data) => {
  const {id, createdAt, updatedAt, ...rest} = data.get({plain: true});
  return rest;
};

// GET - /tutorials/ - Tutorial list
router.get('/', verifyJWT, async (req, res) => {
  const tutorialsData = await tutorialsService.fetchAll();
  const tutorials = tutorialsData.map(mapCleanTutorialData);
  res.send(tutorials);
});

// GET - /tutorials/:id - Tutorial show
router.get('/:uuid', verifyJWT, async (req, res) => {
  res.send('GET /tutorials/:uuid');
});

// PUT - /tutorials/:id - Tutorial update
router.put('/:uuid', verifyJWT, isAdmin, async (req, res) => {
  res.send('PUT /tutorials/:uuid');
});

// POST - /tutorials/ - Tutorial create
router.post('/', verifyJWT, isAdmin, validateCreateToken, async (req, res) => {
  const {title, description, videoUrl, publishedAt} = req.body;
  const tutorial = await tutorialsService.create(title, description, videoUrl, publishedAt);
  res.send(mapCleanTutorialData(tutorial));
});

router.post('/token', verifyJWT, isAdmin, async (req, res) => {
  res.send({token: authenticationService.generateCreateJWT()});
});

// DELETE - /tutorials/mass_delete - Delete all tutorials
router.delete('/mass_delete', verifyJWT, isAdmin, async (req, res) => {
  res.send('DELETE /tutorials/mass_delete');
});

// DELETE - /tutorials/:id - Tutorial delete
router.delete('/:uuid', verifyJWT, isAdmin, async (req, res) => {
  const tutorial = await tutorialsService.delete(req.params.uuid);
  res.send(mapCleanTutorialData(tutorial));
});

module.exports = router;
