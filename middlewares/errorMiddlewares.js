const ApiError = require("../exceptions/apiErrors.js");
const { ERROR_MESSAGES } = require("../common/validationMessage.js");

module.exports = function (err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      message: err.message,
      errors: err.errors,
    });
  }
  console.log(err);
  return res.status(500).json({ message: ERROR_MESSAGES.SERVER_ERROR });
};
