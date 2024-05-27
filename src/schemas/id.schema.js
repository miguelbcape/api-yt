import { z } from 'zod';

export const createIdSchema = z.object({
  id_yt: z
    .string({
      required_error: 'id_yt is requeried',
    })
    .min(11, {
      required_error: 'id_yt must be at least 11 characters',
    })
    .max(11, {
      required_error: 'id_yt must be at most 11 characters',
    }),
  option: z.string().optional(),
});
