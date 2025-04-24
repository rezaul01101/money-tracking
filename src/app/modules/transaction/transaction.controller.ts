import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { TransactionService } from "./transaction.service";
import { TransactionType } from "@prisma/client";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../shared/pagination";

const createTransaction = catchAsync(async (req: Request, res: Response)=> {
  const { ...transactionData  } = req.body;
  const user = req.user;
  
  const result = await TransactionService.insertIntoDB(transactionData,user);
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Transaction created in successfully !",
    data: result,
  });
});

const transactionList = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  
  const response = await TransactionService.transactionList(user);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Transaction list fetched successfully !",
    data: response,
  });
});
const transactionListByType = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const {type}=req.params
  const paginationOptions = pick(req.query, paginationFields);
  const response = await TransactionService.transactionListByType(user,type as TransactionType || "FULL",paginationOptions);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Transaction list fetched successfully !",
    data: response,
  });
});
const transactionDelete = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { id } = req.params;
  
  const response = await TransactionService.transactionDelete(Number(id),user);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Transaction deleted successfully !",
    data: response,
  });
});
const updateTransaction = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { ...transactionData } = req.body;

  const response = await TransactionService.updateTransaction(transactionData,user);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Transaction updated successfully !",
    data: response,
  });
});
const fullYearIncomeExpense = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { year } = req.params;
  const response = await TransactionService.fullYearIncomeExpense(user, year);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Full year income expense fetched successfully !",
    data: response,
  });
});
export const TransactionController = {
  createTransaction,
  updateTransaction,
  transactionList,
  transactionListByType,
  transactionDelete,
  fullYearIncomeExpense
};
