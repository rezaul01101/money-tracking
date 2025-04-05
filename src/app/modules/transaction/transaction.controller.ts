import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { TransactionService } from "./transaction.service";
import { TransactionType } from "@prisma/client";

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
  
  const response = await TransactionService.transactionListByType(user,type as TransactionType);
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

export const TransactionController = {
  createTransaction,
  transactionList,
  transactionListByType,
  transactionDelete
};
