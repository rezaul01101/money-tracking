import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";

import { GoogleGenAI } from "@google/genai";
import config from "../../../config";
import fs from "fs/promises";
import path from "path";
import prisma from "../../../shared/prisma";

const askAi = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const user = req.user;

  const prismaSchema = await fs.readFile(
    path.join(__dirname, "../../../../prisma/schema.prisma"),
    "utf8"
  );

  const prompt = `
    You're an assistant that helps generate **raw PostgreSQL SQL queries** to be used with Prisma's \`$queryRaw\` method.
    Given a user question and the Prisma schema below, return a **PostgreSQL SQL query string only**. No code block, no explanation — just the SQL string.
    The SQL must be valid and match the Prisma schema.
    Prisma Schema:
    ${prismaSchema}
    User Question: ${data?.message}
`.trim();

  const ai = new GoogleGenAI({ apiKey: config?.google_api_key as string });
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  const sqlQuery = response.text?.replace(/```sql|```/g, "").trim();
  let cleanedSql = sqlQuery?.replace(/"/g, "");

  if (!cleanedSql) {
    throw new Error("No valid SQL query generated");
  }

  let resData;
  try {
    resData = await prisma.$queryRawUnsafe(cleanedSql);
  } catch (error) {
    // throw new Error(`Invalid SQL query: ${error.message}`);
  }

  let summery;
  if (resData) {
  //   const prompt2 = `
  // You're an assistant that helps users understand their financial data.
  
  // Given the following data in JSON format, write a friendly summary in natural language that a normal user can easily understand.
  
  // Data:
  // ${JSON.stringify(resData, null, 2)}
  
  // Make the language clear and helpful. Avoid technical terms like "null" or "timestamp". Talk like a personal finance assistant.
  // if you found any sql data. then you should response apology to user.
  // `.trim();
    const prompt2 = `You are a personal finance assistant. this region is bangladesh. Given the recent user transaction data below, return a friendly summary **in english**, and format your response in clean HTML so it can be shown directly on a website.
Make it well-structured with <p>, <strong>, <br>, and emojis for clarity.
use ask this question:${data?.message}
Data:
${JSON.stringify(resData, null, 2)}

✅ Respond in: English  
✅ Format: HTML only (no code blocks, no explanation).
if you found any sql data. then you should response apology to user
  `.trim();

  

    const summeryResponse = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt2,
    });

    summery = summeryResponse.text;
  }

  if (!summery) {
    summery =response.text;
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Ask AI successfully !",
    data: {
      query: sqlQuery,
      result: summery,
    },
  });
});

export const AiController = {
  askAi,
};
