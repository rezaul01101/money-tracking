import { GoogleGenerativeAI } from "@google/generative-ai";
import config from "../config";

const SYSTEM_PROMPT = `
You are a highly specialized SQL assistant.
Your only responsibility is to analyze a provided Prisma schema and generate a matching PostgreSQL SELECT query based on a user's natural language question.
Your output must be a single valid SQL query string, suitable for use with prisma.$queryRawUnsafe.

❌ You must never generate or suggest any INSERT, UPDATE, DELETE, DROP, ALTER, TRUNCATE, or non-SELECT queries.
✅ Only generate syntactically correct, safe, read-only SELECT statements that strictly match the schema.

Return your answer without any explanation or formatting, only using the required JSON format as specified in the user prompt.`;

const SYSTEM_PROMPT_FINANCE = `You are a personal finance assistant. Given a friendly summary **in english**, and format your response in clean HTML so it can be shown directly on a website.Make it well-structured with <p>, <strong>, <br>, and emojis for clarity`;

// Initialize the Generative AI client with your API key
const genAI = new GoogleGenerativeAI(config?.google_api_key as string);

const MODEL_NAME = "gemini-1.5-flash";

export const askDeveloperAi = async (userPrompt: string) => {
  if (!userPrompt) {
    throw new Error("User prompt cannot be empty.");
  }

  try {
    const model = genAI.getGenerativeModel({
      model: MODEL_NAME,
      systemInstruction: SYSTEM_PROMPT,
    });
    const result = await model.generateContent(userPrompt);

    if (!result || !result.response || !result.response.text()) {
      throw new Error("No response received from Gemini API.");
    }
    return result?.response?.text();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get response from Gemini API.");
  }
};
export const askFinanceAi = async (userPrompt: string) => {
  if (!userPrompt) {
    throw new Error("User prompt cannot be empty.");
  }

  try {
    const model = genAI.getGenerativeModel({
      model: MODEL_NAME,
    systemInstruction: SYSTEM_PROMPT_FINANCE,
    });
    const result = await model.generateContent(userPrompt);

    if (!result || !result.response || !result.response.text()) {
      throw new Error("No response received from Gemini API.");
    }
    return result?.response?.text();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get response from Gemini API.");
  }
};
