const bcrypt = require("bcrypt");
const BaseService = require("../../services/BaseService.js");
const tokenService = require("../../services/TokenService.js");
const UserManager = require("./users.js");
const userManager = new UserManager();
const { Task: taskModel } = require("../../models");
const ApiError = require("../../exceptions/apiErrors.js");
const {
  RESPONSE_MESSAGES,
  ERROR_MESSAGES,
} = require("../../common/validationMessage.js");

class AuthService extends BaseService {
  constructor() {
    super();
  }

  async signUp(req, res, next) {
    try {
      const { firstName, lastName, email, password } = req.body;

      const userExists = await userManager.findByEmail(email);

      if (userExists.length) {
        throw ApiError.BadRequest(ERROR_MESSAGES.USER_EXIST);
      }

      const hashPassword = await bcrypt.hash(password, +process.env.SALT);

      const userCreated = await userManager.createUser(
        firstName,
        lastName,
        email,
        hashPassword
      );

      if (userCreated.affectedRows !== 0) {
        const user = await userManager.findById(userCreated.insertId);
        delete user[0].password;

        return this.response({
          message: RESPONSE_MESSAGES.CREATED,
          data: {
            user,
          },
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async login(email, password) {
    const user = await userManager.findByEmail(email);

    if (!user.length) {
      throw ApiError.BadRequest(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    const isPassEquals = await bcrypt.compare(password, user[0].password);

    if (!isPassEquals) {
      throw ApiError.BadRequest(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    const token = tokenService.generateToken({ id: user[0].id, email: email });

    return { user: user[0], token };
  }

  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;

      const { user, token } = await this.login(email, password);

      delete user.password;

      return this.response({
        data: {
          user,
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async userInfo(req, res, next) {
    try {
      if (!req.user) {
        throw ApiError.UnauthorizedError();
      }
      return this.response({
        data: {
          userId: req.user.id,
          email: req.user.email,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthService();
