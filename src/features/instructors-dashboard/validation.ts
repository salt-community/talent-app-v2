import { z } from "zod";

export const addCohortFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().optional(),
  status: z.enum(["planned", "ongoing", "finished"]),
});

export const newAssignmentSchema = z.object({
  title: z.string().nonempty("Title is required"),
  comment: z.string(),
  cohortId: z.string().nonempty("Cohort ID is required"),
  createdAt: z.date(),
  categories: z
    .array(z.string().nonempty("Each category should be a non-empty string"))
    .nonempty("At least one category is required"),
  score: z.number().min(0, "Score must be at least 0").optional(),
});

export const assignmentSchema = z.object({
  id: z.string().nonempty("ID is required"),
  title: z.string().nonempty("Title is required"),
  comment: z.string(),
  cohortId: z.string().nonempty("Cohort ID is required"),
  createdAt: z.date(),
  updatedAt: z.date(),
  slug: z.string(),
  categories: z
    .array(z.string().nonempty("Each category should be a non-empty string"))
    .nonempty("At least one category is required"),
  score: z.number().min(0, "Score must be at least 0").optional(),
});
