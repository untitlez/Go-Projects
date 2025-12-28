import { z } from "zod";

export const authSchema = z.object({
  username: z.string().optional(),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
});

export type authType = z.infer<typeof authSchema>;
