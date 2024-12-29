import { z } from "zod";

export const assignmentUpdates = z.object({
  devId: z.string(), // ev byta till uuid
  title: z.string().min(2, "Title is required"),
  score: z.number().min(1, "Score is required").max(100, "Score must be 100 or less"),
  comment: z.string().optional(),
  tags: z.array(z.string()).optional(),
});
