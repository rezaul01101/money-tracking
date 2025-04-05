import { z } from 'zod';

const createZodSchema = z.object({
  body: z.object({
    currency: z.string().optional(),
    profile: z.array(z.string()).optional(),
  }),
});
export const SettingsValidation = {
  createZodSchema,
  };