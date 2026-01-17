import { z } from "zod";

export const changeEmailSchema = z.object({
  email: z.email(),
});

export type TypeChangeEmailSchema = z.infer<typeof changeEmailSchema>;
