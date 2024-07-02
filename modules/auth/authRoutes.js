const AuthController = require("./authController.js");
const authController = new AuthController();

// validators
const signInvalidation = require("../../common/validation/SignInValidation.js");
const signUpValidation = require("../../common/validation/SignUpValidation.js");
const authMiddleware = require("../../middlewares/authMiddleware.js");

const { Router } = require("express");
const router = Router();

router.post("/signup", signUpValidation, authController.signUp);

router.post("/signin", signInvalidation, authController.signIn);

router.get("/info", authMiddleware, authController.userInfo);

module.exports = router;
