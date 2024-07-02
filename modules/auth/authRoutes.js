const AuthController = require("./authController.js");
const authController = new AuthController();

// validators
const signInvalidation = require("../../common/validation/signInValidation.js");
const signUpValidation = require("../../common/validation/signUpValidation.js");
const authMiddleware = require("../../middlewares/authMiddleware.js");

const { Router } = require("express");
const router = Router();

router.post("/signup", signUpValidation, authController.signUp);

router.post("/signin", signInvalidation, authController.signIn);

router.get("/info", authMiddleware, authController.userInfo);

module.exports = router;
