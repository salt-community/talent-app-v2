import { z } from "zod";

export const addCohortFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().optional(),
  status: z.enum(["planned", "ongoing", "finished"]),
});

export const assignmentSchema = z.object({
  title: z.string().nonempty("Title is required"),
  comment: z.string(),
  cohortId: z.string().nonempty("Cohort ID is required"),
  date: z.date(),
  categories: z
    .array(z.string().nonempty("Each category should be a non-empty string"))
    .nonempty("At least one category is required"),
  score: z.number().min(0, "Score must be at least 0"),
});
