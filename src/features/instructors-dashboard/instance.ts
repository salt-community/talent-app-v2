import { createInstructorService } from "./service";
import { cohortsService } from "@/features";

export const instructorService = createInstructorService(cohortsService.getAll);
