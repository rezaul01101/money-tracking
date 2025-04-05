import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { UserService } from "./user.service";

const users = catchAsync(async (req: Request, res: Response) => {
  // const { ...registerData } = req.body;
  const response = await UserService.userList();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User list  !",
    data: response,
  });
});
const getUser = catchAsync(async (req: Request, res: Response)=>{
  const user = req.user;
  const response = await UserService.getUserFromDB(user);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User retrieved  !",
    data: response,
  });
})
const updateUser = catchAsync(async (req: Request, res: Response)=>{
  const { ...userData } = req.body;
  const token = req.headers.authorization as string;
  const response = await UserService.updateUserDB(token,userData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User updated  !",
    data: response,
  });
})

export const userController = {
  users,
  getUser,
  updateUser
};
