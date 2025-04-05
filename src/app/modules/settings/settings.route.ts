import express from "express";
import { SettingsController } from "./settings.controller";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { SettingsValidation } from "./settings.validation";
import { upload } from "../../../utils/storeImage";


const router = express.Router();
router.post(
  "/update",
  auth("user"), 
  upload.array("profile",1),
  validateRequest(SettingsValidation.createZodSchema),
  SettingsController.updateSettings
);
router.get(
  "/",
  auth("user"),
  SettingsController.getSettings
);


export const SettingsRoutes = router;
