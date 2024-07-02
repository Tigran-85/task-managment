const authService = require("./authService.js");

class AuthController {

  constructor() {
  }

  async signUp(req, res, next) {
      const data = await authService.signUp(req, res, next);
      if (data) {
        res.status(data.statusCode).json(data);
      }
  }

  async signIn(req, res, next) {
    const data = await authService.signIn(req, res, next);
    if (data) {
      res.status(data.statusCode).json(data);
    }
  }

  async userInfo(req, res, next) {
    const data = await authService.userInfo(req, res, next);
    if (data) {
      res.status(data.statusCode).json(data);
    }
  }
}

module.exports = AuthController;