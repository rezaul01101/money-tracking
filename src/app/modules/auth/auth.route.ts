import express from "express";
import { AuthController } from "./auth.controller";
import { AuthValidation } from "./auth.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();
router.post(
  "/login",
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);
router.post(
  "/signup",
  validateRequest(AuthValidation.registerZodSchema),
  AuthController.registerUser
);
router.post(
  "/forgot-password",
  validateRequest(AuthValidation.forgotPasswordZodSchema),
  AuthController.forgotPassword
);
router.post(
  "/verify-otp",
  validateRequest(AuthValidation.verifyOtp),
  AuthController.verifyOtp
);
router.post(
  "/reset-password",
  validateRequest(AuthValidation.resetPasswordZodSchema),
  AuthController.resetPassword
);
router.post(
  "/varification-token-check",
  validateRequest(AuthValidation.varificationTokenCheckZodSchema),
  AuthController.varificationTokenCheck
);

export const AuthRoutes = router;
