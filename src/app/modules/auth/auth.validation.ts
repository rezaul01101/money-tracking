import { z } from 'zod';

const loginZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});
const registerZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

const forgotPasswordZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
  }),
});
const verifyOtp = z.object({
  body: z.object({
    otp: z.string({
      required_error: 'otp is required',
    }),
    email: z.string({
      required_error: 'email is required',
    }),
  }),
});
const resetPasswordZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'Password is required',
    }),
    email: z.string({
      required_error: 'email is required',
    }),
    otp: z.string({
      required_error: 'otp is required',
    }),
  }),
});
const varificationTokenCheckZodSchema = z.object({
  body: z.object({
    token: z.string({
      required_error: 'token is required',
    }),
  }),
});
export const AuthValidation = {
    loginZodSchema,
    registerZodSchema,
    forgotPasswordZodSchema,
    verifyOtp,
    resetPasswordZodSchema,
    varificationTokenCheckZodSchema
  };