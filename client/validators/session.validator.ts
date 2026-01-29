import { z } from "zod";

export const sessionSchema = z.object({
  id: z.string(),
  username: z.string().optional(),
  email: z.string().optional(),
  full_name: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  image: z.string().optional(),
  role: z.string().optional(),
  provider: z.string().optional(),
  registeredClaims: z.object({
    exp: z.number(),
    iss: z.number(),
  }),
});

export type sessionType = z.infer<typeof sessionSchema>;
