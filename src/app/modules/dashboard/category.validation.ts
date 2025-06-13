import { z } from 'zod';

const createZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'name is required',
    }),
    type: z.string({
      required_error: 'Category type is required (EXPENSE,INCOME)',
    }),
  }),
});
export const CategoryValidation = {
  createZodSchema,
  };