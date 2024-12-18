import { z } from "zod";

export const assignmentUpdates = z.object({
  devId: z.string(), // ev byta till uuid
  score: z.number().min(0).max(100).optional(),
  title: z.string(),
  comment: z.string().nullable().optional(),
  tags: z.array(z.string()).optional(),
});
