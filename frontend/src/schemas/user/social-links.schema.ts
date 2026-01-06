import { z } from "zod";

export const socialLinksSchema = z.object({
    title: z.string(),
    url: z.url(),

});

export type TypeSocialLinksSchema = z.infer<
    typeof socialLinksSchema
>;
