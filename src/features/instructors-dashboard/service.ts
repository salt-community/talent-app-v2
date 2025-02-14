import { GetAllCohorts } from "@/features";

export function createInstructorService(getAllCohorts: GetAllCohorts) {
  return {
    async getAllCohorts() {
      return await getAllCohorts();
    },
  };
}
