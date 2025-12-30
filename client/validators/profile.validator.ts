import { z } from "zod";

export const profileSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  full_name: z.string().optional(),
  gender: z.string().optional(),
  birth_date: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional(),
  citizen_id: z.string().optional(),
  phone: z.string().optional(),
  image: z.string().optional(),
  position: z.string().optional(),
  salary: z.number().optional(),
  employment_type: z.string().optional(),
  status: z.string().optional(),
  years_of_service: z.number().optional(),
  start_date: z.string().optional(),
  created_at: z.date(),
  updated_at: z.date(),
});

export const profileUpdateSchema = profileSchema
  .extend({
    limit: z.number().optional(),
    query: z.string().optional(),
  })
  .partial();

export type profileType = z.infer<typeof profileSchema>;
export type profileUpdateType = z.infer<typeof profileUpdateSchema>;
