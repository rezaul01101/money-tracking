import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AuthService } from "./auth.service";
import config from "../../../config";
import sendEmail from "../../../utils/sendEmail";
import { otpSendForPasswordResetEmail, varificationEmail } from "../../../utils/emailList";

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
  varificationEmail(response?.email, response?.name ,response?.verificationToken)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User registered successfully !",
    data: response,
  });
});
const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;
  const result = await AuthService.forgotPassword(email);
  otpSendForPasswordResetEmail(result?.email, 'Rezaul Hoque',result?.code)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Password reset email sent successfully !",
    data: result,
  });
});

const verifyOtp = catchAsync(async (req: Request, res: Response) => {
  const { otp,email } = req.body;
  const result = await AuthService.verifyOtpFromDb(otp,email);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "otp is valid !",
    data: result,
  });
});
const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const { password, email, otp } = req.body;
  const result = await AuthService.resetPassword(password, email, otp);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Password reset successfully !",
    data: result,
  });
});
const varificationTokenCheck = catchAsync(async (req: Request, res: Response) => {
  const { token } = req.body;
  const result = await AuthService.varificationTokenCheck(token);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Token is valid !",
    data: result,
  });
});
export const AuthController = {
  loginUser,
  registerUser,
  forgotPassword,
  verifyOtp,
  resetPassword,
  varificationTokenCheck
};
