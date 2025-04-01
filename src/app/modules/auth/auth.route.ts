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

export const AuthRoutes = router;
