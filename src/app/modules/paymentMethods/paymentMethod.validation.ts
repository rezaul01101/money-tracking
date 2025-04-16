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
const updateZodSchema = z.object({
  body: z.object({
    id: z.number(),
    amount:  z.union([z.string(), z.number()], {
      required_error: 'amount is required',
    }),
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
  updateZodSchema,
};