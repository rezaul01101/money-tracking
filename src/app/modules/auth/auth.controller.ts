import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AuthService } from "./auth.service";
import config from "../../../config";
import sendEmail from "../../../utils/sendEmail";
import { varificationEmail } from "../../../utils/emailList";

const loginUser = catchAsync(async (req: Request, res: Response)=> {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);
  
  const { refreshToken, accessToken } = result;
  res.cookie('refreshToken', refreshToken, {
    secure: config.env === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully !",
    data: {
      refreshToken,
      accessToken
    },
  });
});
const registerUser = catchAsync(async (req: Request, res: Response) => {
  const { ...registerData } = req.body;
  
  const response = await AuthService.insertIntoDB(registerData);
  varificationEmail('rezaulhoque0101@gmail.com', 'Rezaul Hoque')
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User registered successfully !",
    data: response,
  });
});

export const AuthController = {
  loginUser,
  registerUser,
};
