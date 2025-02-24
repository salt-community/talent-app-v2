import * as z from "zod";

export const assignmentSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  comment: z.string().optional(),
  cohortId: z.string().min(1, { message: "Cohort ID is required" }),
  categories: z
    .array(
      z
        .string()
        .min(1, { message: "Each category should be a non-empty string" })
    )
    .min(1, { message: "At least one category is required" }),
});
