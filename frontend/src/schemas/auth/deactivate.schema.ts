import { z } from "zod";

export const deactivateSchema = z.object({
    email: z.email().min(1),
    password: z.string().min(8),
    pin: z.string().optional(),
});

export type TypeDeactivateSchema = z.infer<typeof deactivateSchema>;
