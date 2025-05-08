import { z } from "zod";

export const addCohortFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().optional(),
});
export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  assignmentCategoryId: z.string(),
  assignmentFeedbackId: z.string(),
});

export const newAssignmentSchema = z.object({
  id: z.string(),
  title: z.string().nonempty("Title is required"),
  cohortId: z.string().nonempty("Cohort ID is required"),
  AssignmentCategories: z
    .array(categorySchema)
    .nonempty("At least one category is required"),
  slug: z.string().optional(),
});

export const assignmentSchema = z.object({
  id: z.string().nonempty("ID is required"),
  title: z.string().nonempty("Title is required"),
  comment: z.string(),
  cohortId: z.string().nonempty("Cohort ID is required"),
  createdAt: z.date(),
  updatedAt: z.date(),
  description: z.string(),
  slug: z.string(),
  categories: z
    .array(z.string().nonempty("Each category should be a non-empty string"))
    .nonempty("At least one category is required"),
  score: z.number().min(0, "Score must be at least 0").optional(),
});
