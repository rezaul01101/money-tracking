import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { SettingsService } from './settings.service';
const updateSettings = catchAsync(async (req: Request, res: Response)=> {
  const { ...data } = req.body;
  const images = req.files;
  const user = req.user;
  let profile = null;
  if(images && Array.isArray(images) && images.length > 0){
    const firstImage = images[0] as Express.Multer.File;
    profile = firstImage.path;
  }
  const result = await SettingsService.updateSettings(data,user,profile);
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Settings updated successfully !",
    data: result,
  });
});

const getSettings = catchAsync(async (req: Request, res: Response)=> {
  const user = req.user;
  const result = await SettingsService.getSettings(user);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Settings fetched successfully !",
    data: result,
  });
});


export const SettingsController = {
  updateSettings,
  getSettings
};
