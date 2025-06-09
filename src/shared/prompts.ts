import fs from "fs/promises";
import path from "path";

export const createUserMessage = async (userMessage: string): Promise<string> => {
  if (!userMessage) {
    throw new Error("User message cannot be empty.");
  }

  const prismaSchema = await fs.readFile(
    path.join(__dirname, "./../../prisma/schema.prisma"),
    "utf8"
  );

  if (!prismaSchema) {
    throw new Error("Prisma schema not found.");
  }

  const message = `
      You will receive:
        - A Prisma schema that defines the database models.
        - A user's natural language question.

        Prisma Schema: ${prismaSchema}
        User Question: ${userMessage}

        Your task:
        1. Understand the provided Prisma schema thoroughly.
        2. Generate a valid and complete Sql query that precisely matches the user's intent based on the schema.
        3. DO NOT, under any circumstances, execute the generated query.
        4. Return your answer in the following **strict JSON format**:
        example response:
        {
          "question": "<user question>",
          "prisma_code": "<only give just sql, without 'const' or 'await' keywords, and without any additional explanations or text>"
        }
        note:Ensure that the generated query is syntactically correct and adheres to the Sql standards.`;

  return message;
};


export const createFinanceMessage = async (
  message: string,
  data: any
): Promise<string> => {
  const prompt2 = 
    `use ask this question:${message}
      Data:${JSON.stringify(data, null, 2)}
      ✅ Respond in: English  
      ✅ Format: HTML only (no code blocks, no explanation).
      if you found any sql data. then you should response apology to user
        `.trim();
  return prompt2;
};