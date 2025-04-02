import { z } from 'zod';

const createZodSchema = z.object({
  body: z.object({
    amount: z.number({
      required_error: 'amount is required',
    }),
    date: z.string({
      required_error: 'date is required',
    }),
    category_id: z.number({
      required_error: 'category_id is required',
    }),
    type: z.string({
      required_error: 'Category type is required (EXPENSE,INCOME)',
    }),
  }),
});
export const TransactionValidation = {
  createZodSchema,
  };