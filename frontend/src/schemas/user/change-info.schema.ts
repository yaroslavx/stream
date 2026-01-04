import { z } from "zod";

export const changeProfileInfoSchema = z.object({
  username: z
    .string()
    .min(1)
    .regex(/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/),
  displayName: z.string().min(1),
  bio: z.string().max(300),
});

export type TypeChangeProfileInfoSchema = z.infer<
  typeof changeProfileInfoSchema
>;
