import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { PaymentMethodService } from "./paymentMethod.service";
import { TransactionType } from "@prisma/client";

const create = catchAsync(async (req: Request, res: Response)=> {
  const { ...data  } = req.body;
  const user = req.user;
  
  const result = await PaymentMethodService.insertIntoDB(data,user);
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Method created in successfully !",
    data: result,
  });
});

const list = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  
  const response = await PaymentMethodService.paymentMethodList(user);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Method list fetched successfully !",
    data: response,
  });
});

const dataDelete = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { id } = req.params;
  
  const response = await PaymentMethodService.paymentMethodDelete(Number(id),user);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Payment Method deleted successfully !",
    data: response,
  });
});

export const PaymentMethodController = {
  create,
  list,
  dataDelete,
};
