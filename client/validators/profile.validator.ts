import { z } from "zod";

export const profileSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  full_name: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  gender: z.string().optional(),
  birth_date: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  image: z.string().optional(),
  created_at: z.date(),
  updated_at: z.date(),
});

export const profileUpdateSchema = profileSchema
  .extend({
    limit: z.number().optional(),
    query: z.string().optional(),
  })
  .partial();

export const profileQuerySchema = z.object({
  name: z.string().optional(),
  gender: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional(),
  limit: z.string().optional(),
  offset: z.string().optional(),
});

export type profileType = z.infer<typeof profileSchema>;
export type profileUpdateType = z.infer<typeof profileUpdateSchema>;
export type profileQueryType = z.infer<typeof profileQuerySchema>;
