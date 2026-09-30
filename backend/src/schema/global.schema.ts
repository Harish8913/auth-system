import { z } from "zod";

export const email = z.email("Invalid Format");
export const password = z.string().min(4).max(24);
