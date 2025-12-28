import { z } from "zod";

export const sessionSchema = z.object({
  id: z.string(),
  username: z.string().optional(),
  email: z.string().optional(),
  role: z.string().optional(),
  image: z.string().optional(),
  registeredClaims: z.object({
    exp: z.number(),
    iss: z.number(),
  }),
});

export type sessionType = z.infer<typeof sessionSchema>;
