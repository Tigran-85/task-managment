const { check, validationResult } = require("express-validator");
const { VALIDATION_ERROR_MESSAGES } = require("../validationMessage.js");
const ApiError = require("../../exceptions/apiErrors.js");

const taskValidation = [
  check("status").isIn(["completed", "not_completed"]),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw ApiError.BadRequest(
        VALIDATION_ERROR_MESSAGES.STATUS_VALIDATION_ERROR
      );
    }
    next();
  },
];

module.exports = taskValidation;
