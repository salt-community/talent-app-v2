import { z } from "zod";

export const assignmentUpdates = z.object({
   score: z.number().min(0).max(100).optional(), 
   title: z.string().optional(), 
   comment: z.string().nullable().optional(), 
   tags: z.array(z.string()).optional(), 
});
