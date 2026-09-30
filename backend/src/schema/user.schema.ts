import { z } from "zod";
import { email, password } from "./global.schema.js";

export const User = z.object({
  userName: z.string(),
  email,
  password,
  orgId: z.number(),
  roleId: z.number(),
});

export type UserType = z.infer<typeof User>;
