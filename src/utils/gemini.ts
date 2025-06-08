import { GoogleGenAI } from "@google/genai";
import config from "../config";

const genAI = new GoogleGenAI({ apiKey: config?.google_api_key as string });

async function askGemini(prompt: string) {
  if (!prompt) {
    throw new Error("Prompt cannot be empty");
  }

  const response = await genAI.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  return response;
}

export default askGemini;
