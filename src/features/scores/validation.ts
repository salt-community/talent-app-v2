import { z } from "zod";

export const assignmentUpdates = z.object({
  devId: z.string(), // ev byta till uuid
  title: z.string().min(1, "Title is required"),
  score: z.number().min(0, "Score is required").max(100, "Score must be 100 or less"),
  comment: z.string().optional(),
  tags: z.array(z.string()).optional(),
});
