import { check, validationResult } from "express-validator";
import { VALIDATION_ERROR_MESSAGES } from "../validationMessage.js";
import ApiError from "../../exceptions/apiErrors.js";

const taskValidation = [
    check("status")
    .isIn(['completed', 'not_completed']),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          throw ApiError.BadRequest(VALIDATION_ERROR_MESSAGES.STATUS_VALIDATION_ERROR);
        }
        next();
    }
];

export default taskValidation;