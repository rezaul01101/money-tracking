import express from "express";
import { DashboardController } from "./dashboard.controller";
import auth from "../../middlewares/auth";


const router = express.Router();
router.get(
  "/",
  auth("user"),
  DashboardController.dashboard
);

export const DashboardRoutes = router;
