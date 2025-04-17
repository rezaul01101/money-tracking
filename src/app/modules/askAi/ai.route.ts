import express from "express";
import auth from "../../middlewares/auth";
import { AiController } from "./ai.controller";


const router = express.Router();
router.post("/ask", auth("user"), AiController.askAi);

export const AiRoutes = router;
