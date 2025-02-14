import { z } from "zod";

export const addCohortFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().optional(),
  status: z.enum(["planned", "ongoing", "finished"]),
});
