import { z } from 'zod';

const createZodSchema = z.object({
  body: z.object({
    amount: z.string().optional(),
    name: z.string({
      required_error: 'date is required',
    }),
    paymentType: z.string({
      required_error: 'Payment Method Type is required',
    }),
    notes: z.string().optional(),
  }),
});
export const PaymentMethodValidation = {
  createZodSchema,
  };