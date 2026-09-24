import { z } from "zod";
import { email } from "./global.schema.js";

export const OrganizationSchema = z.object({
  name: z.string().trim().min(4).max(50),
  description: email,
});

export type OrganizationType = z.infer<typeof OrganizationSchema>;
