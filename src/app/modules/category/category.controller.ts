import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { CategoryService } from "./category.service";
import config from "../../../config";

const createCategory = catchAsync(async (req: Request, res: Response)=> {
  const { ...categoryData } = req.body;
  const user = req.user;
  
  const result = await CategoryService.insertIntoDB(categoryData,user);
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Category created in successfully !",
    data: result,
  });
});
const categoryList = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  
  const response = await CategoryService.listCategory(user);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Category list fetched successfully !",
    data: response,
  });
});

export const CategoryController = {
  createCategory,
  categoryList,
};
