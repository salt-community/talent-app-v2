import { InstructorsService } from "@/features";
import { PermissionsSchema } from "../secure-service";

export const instructors: PermissionsSchema<"instructors", InstructorsService> =
  {
    getAllCohorts: "instructors.getAllCohorts",
    getCohortById: "instructors.getCohortById",
    createCohort: "instructors.createCohort",
  };
