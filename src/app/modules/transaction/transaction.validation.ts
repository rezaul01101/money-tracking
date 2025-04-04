import { z } from 'zod';

const createZodSchema = z.object({
  body: z.object({
    amount: z.string({
      required_error: 'amount is required',
    }),
    date: z.string({
      required_error: 'date is required',
    }),
    categoryId: z.string({
      required_error: 'category_id is required',
    }),
    type: z.enum(['INCOME', 'EXPENSE'], {
      required_error: 'type is required',
    }),
    notes: z.string().optional(),
  }),
});
export const TransactionValidation = {
  createZodSchema,
  };