const { body, validationResult } = require("express-validator");
const { VALIDATION_ERROR_MESSAGES } = require("../validationMessage.js");
const ApiError = require("../../exceptions/apiErrors.js");

const signInvalidation = [
  body("email").trim().isEmail().withMessage(VALIDATION_ERROR_MESSAGES.EMAIL),

  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage(VALIDATION_ERROR_MESSAGES.min(5))
    .isLength({ max: 50 })
    .withMessage(VALIDATION_ERROR_MESSAGES.max(50)),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw ApiError.BadRequest(errors.array()[0].msg, errors.array());
    }
    next();
  },
];

module.exports = signInvalidation;
