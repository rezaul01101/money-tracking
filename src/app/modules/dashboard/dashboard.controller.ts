import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { DashboardService } from "./dashboard.service";

const dashboard = catchAsync(async (req: Request, res: Response)=> {
  const user = req.user;
  
  const result = await DashboardService.dashboardData(user);
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Dashboard data",
    data: result,
  });
});

export const DashboardController = {
  dashboard
};
