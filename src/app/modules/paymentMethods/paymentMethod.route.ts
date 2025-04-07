import express from "express";
import { PaymentMethodController } from "./paymentMethod.controller";
import validateRequest from "../../middlewares/validateRequest";
import { PaymentMethodValidation } from "./paymentMethod.validation";
import auth from "../../middlewares/auth";


const router = express.Router();
router.post(
  "/create",
  auth("user"), 
  validateRequest(PaymentMethodValidation.createZodSchema),
  PaymentMethodController.create
);
router.get(
  "/list",
  auth("user"),
  PaymentMethodController.list
);


export const PaymentMethodRoutes = router;
