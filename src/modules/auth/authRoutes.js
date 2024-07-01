import AuthController from "./authController.js";
const authController = new AuthController();

// validators
import signInvalidation from "../../common/validation/SignInValidation.js";
import signUpValidation from "../../common/validation/SignUpValidation.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

import { Router } from "express";
const router = Router();

router.post(
    '/signup',
    signUpValidation,
    authController
      .signUp
  );

router.post(
  '/signin',
  signInvalidation,
  authController
    .signIn
);

router.get(
    '/info',
    authMiddleware,
    authController
      .userInfo
);

export default router;