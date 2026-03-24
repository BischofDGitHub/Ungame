// schemas/testSchema.ts
import { z } from "zod";

export const testSchema = z.object({
    name: z
        .string()
        .min(1, { message: "Name ist erforderlich" }),

    age: z
        .number()
        .int({ message: "Alter muss eine ganze Zahl sein" })
        .nonnegative({ message: "Alter darf nicht negativ sein" })
        .optional(),
});

export type TestSchemaType = z.infer<typeof testSchema>;