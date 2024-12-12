import { z } from "zod";

export const formSchema = z.object({
  repository: z.string().min(1, { message: "Repository is required" }),
  projectWebsite: z.string().optional(),
  description: z.string().min(1, { message: "Description is required" }),
});
