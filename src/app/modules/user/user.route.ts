import express from "express";
// import auth from "../../middlewares/auth";
import { userController } from "./user.controller";

const router = express.Router();
// router.get("/list", userController.users);
// router.get("/", auth("user"), userController.getUser);
// router.post("/update", auth("user"), userController.updateUser);

export const UserRoutes = router;
