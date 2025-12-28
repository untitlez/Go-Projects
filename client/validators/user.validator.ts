import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  username: z.string().optional(),
  password: z.string().optional(),
  created_at: z.date(),
  updated_at: z.date(),
});

export const userUpdateSchema = userSchema
  .extend({
    limit: z.number().optional(),
    query: z.string().optional(),
    response_password: z.string().optional(),
    role: z.string().optional(),
  })
  .partial();

export type userType = z.infer<typeof userSchema>;
export type userUpdateType = z.infer<typeof userUpdateSchema>;
