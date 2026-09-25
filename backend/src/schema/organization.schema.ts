import { z } from "zod";
import { email } from "./global.schema.js";

const adminDetails = z.object({
  name: z.string(),
  role: z.number().default(1001),
  email: email,
  status: z.enum(["PENDING", "ACCEPTED"]).default("PENDING"),
});

export const OrganizationSchema = z.object({
  name: z.string().trim().min(4).max(100),
  email,
  description: z.string().trim(),
  adminDetails,
});

export type OrganizationType = z.infer<typeof OrganizationSchema>;
