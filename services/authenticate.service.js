const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const {hash} = require("../utils/user.utils");
const UsersService = require("./users.service");

dotenv.config();
const token_secret = process.env.TOKEN_SECRET;

const userService = new UsersService();

class AuthenticateService {
  authenticate = async (email, password) => {
    const user = await userService.findByEmail(email)
      .then((user) => {
        if (user && user.password === hash(password)) {
          return user;
        }
        return null;
      });
    return user;
  }
  generateJWT = (email) => {
    return jwt.sign({email}, token_secret, {expiresIn: '1h'});
  }
  verifyJWT = (token) => {
    jwt.verify(token, token_secret, (err, user) => {
      if (err) {
        return null;
      }
      return user;
    });
  }
}

module.exports = AuthenticateService;
