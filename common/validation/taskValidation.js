const { body, validationResult } = require("express-validator");
const { VALIDATION_ERROR_MESSAGES } = require("../validationMessage.js");
const ApiError = require("../../exceptions/apiErrors.js");

const taskValidation = [
  body("title")
  .not()
  .isEmpty()
  .withMessage(VALIDATION_ERROR_MESSAGES.REQUIRED)
  .isLength({ min: 3 })
  .withMessage(VALIDATION_ERROR_MESSAGES.min(3))
  .isLength({ max: 50 })
  .withMessage(VALIDATION_ERROR_MESSAGES.max(50)),

  body("description")
  .not()
  .isEmpty()
  .withMessage(VALIDATION_ERROR_MESSAGES.REQUIRED)
  .isLength({ min: 3 })
  .withMessage(VALIDATION_ERROR_MESSAGES.min(3))
  .isLength({ max: 50 })
  .withMessage(VALIDATION_ERROR_MESSAGES.max(50)),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw ApiError.BadRequest(
        errors.array()[0].msg, errors.array()
      );
    }
    next();
  },
];

module.exports = taskValidation;
