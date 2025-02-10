import { z } from "zod";

export const assignmentUpdates = z.object({
  developerProfileId: z.string(), // ev byta till uuid
  title: z.string().min(1, "Title is required"),
  score: z.string().min(1, "Score is required"),
  comment: z.string().optional(),
  tags: z.array(z.string()).optional(),
});
