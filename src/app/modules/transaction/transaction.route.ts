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
router.post(
  "/update",
  auth("user"), 
  validateRequest(TransactionValidation.updateZodSchema),
  TransactionController.updateTransaction
);
router.get(
  "/list",
  auth("user"),
  TransactionController.transactionList
);
router.get(
  "/list/:type",
  auth("user"),
  TransactionController.transactionListByType
);
router.delete(
  "/:id",
  auth("user"),
  TransactionController.transactionDelete
);
router.get(
  "/full-year-income-expense/:year",
  auth("user"),
  TransactionController.fullYearIncomeExpense
);

export const TransactionRoutes = router;
