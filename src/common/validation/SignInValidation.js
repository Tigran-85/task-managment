import { body, validationResult } from "express-validator";
import { VALIDATION_ERROR_MESSAGES } from "../validationMessage.js";
import ApiError from "../../exceptions/apiErrors.js";

const signInvalidation = [
  body("email").trim().isEmail().withMessage(VALIDATION_ERROR_MESSAGES.EMAIL),

  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage(VALIDATION_ERROR_MESSAGES.min(5)),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw ApiError.BadRequest(errors.array()[0].msg, errors.array());
        }
        next();
    }
];

export default signInvalidation;