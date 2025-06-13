import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import prisma from "../../../shared/prisma";
import { askDeveloperAi, askFinanceAi } from "../../../utils/gemini";
import { createFinanceMessage, createUserMessage } from "../../../shared/prompts";

const askAi = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const user = req.user;

  if (!data?.message) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Message is required",
    });
  }

  const userMessage = await createUserMessage(data?.message);
  if (!userMessage) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Failed to create user message",
    });
  }
  const response = await askDeveloperAi(userMessage);
  const resText = response?.replace(/```json|```/g, "").trim();
  const parsedResponse = JSON.parse(resText);
  const prismaSql = parsedResponse?.prisma_code;
  console.log("Prisma SQL Query:", prismaSql);
  const resData = await prisma.$queryRawUnsafe(prismaSql);


  let summery;
  if (resData) {
    
    const prompt2 = await createFinanceMessage(data?.message, resData);

    const summeryResponse = await askFinanceAi(prompt2);
    console.log("Summery Response:", summeryResponse,data);
    summery = summeryResponse;
  }

  if (!summery) {
    summery = response;
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Ask AI successfully !",
    data: {
      query: parsedResponse?.question,
      result: summery,
    },
  });
});

export const AiController = {
  askAi,
};
