import { z } from "zod";

export const testSchema = z.object({
    name: z.string().min(1, "Name is required"),
    age: z.number().optional(),
});

export type TestSchemaType = z.infer<typeof testSchema>;
