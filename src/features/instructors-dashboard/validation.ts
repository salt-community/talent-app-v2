import { z } from "zod";

export const addCohortFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().optional(),
  status: z.enum(["planned", "ongoing", "finished"]),
});

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
