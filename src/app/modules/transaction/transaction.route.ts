import express from "express";
import { TransactionController } from "./transaction.controller";
import validateRequest from "../../middlewares/validateRequest";
import { TransactionValidation } from "./transaction.validation";
import auth from "../../middlewares/auth";


const router = express.Router();
router.post(
  "/create",
  auth("user"), 
  validateRequest(TransactionValidation.createZodSchema),
  TransactionController.createTransaction
);
router.get(
  "/list",
  auth("user"),
  TransactionController.transactionList
);
router.delete(
  "/:id",
  auth("user"),
  TransactionController.transactionDelete
);

export const TransactionRoutes = router;
