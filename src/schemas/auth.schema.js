import { z } from 'zod';

export const registerSchema = z.object({
  username: z
    .string({
      required_error: 'Username is requeried',
    })
    .min(3, {
      required_error: 'Username must be at least 3 characters',
    })
    .max({
      required_error: 'Username must be at most 20 characters',
    }),
  email: z
    .string({
      required_error: 'Email is requeried',
    })
    .email({
      required_error: 'Invalid email',
    }),
  password: z
    .string({
      required_error: 'Password is requeried',
    })
    .min(6, {
      message: 'Password must be at least 6 characters',
    }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is requeried',
    })
    .email({
      required_error: 'Invalid email',
    }),
  password: z
    .string({
      required_error: 'Password is requeried',
    })
    .min(6, {
      message: 'Password must be at least 6 characters',
    }),
});
