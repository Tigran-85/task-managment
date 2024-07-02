const bcrypt = require("bcrypt");
const BaseService = require("../../services/BaseService.js");
const tokenService = require("../../services/TokenService.js");
const { User: userModel } = require("../../models");
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
      
      const userExists = await userModel.findOne({
        where: { email }
      });

      if (userExists) {
        throw ApiError.BadRequest(ERROR_MESSAGES.USER_EXIST);
      }

      const hashPassword = await bcrypt.hash(password, +process.env.SALT);

      const user = await userModel.create({
        firstName,
        lastName,
        email,
        password: hashPassword
      })

      if (user) {
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

    const user = await userModel.findOne({
      where: { email }
    });

    if (!user) {
      throw ApiError.BadRequest(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    const isPassEquals = await bcrypt.compare(password, user.password);

    if (!isPassEquals) {
      throw ApiError.BadRequest(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    const token = tokenService.generateToken({ id: user.id, email: email });

    return { user, token };
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
