import { CohortFormData, CreateCohort, GetAllCohorts } from "@/features";

export function createInstructorService(
  getAllCohorts: GetAllCohorts,
  createCohort: CreateCohort
) {
  return {
    async getAllCohorts() {
      return await getAllCohorts();
    },
    async createCohort(cohort: CohortFormData) {
      return await createCohort(cohort);
    },
  };
}
