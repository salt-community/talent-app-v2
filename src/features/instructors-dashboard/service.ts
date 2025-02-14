import {
  CohortFormData,
  CreateCohort,
  GetAllCohorts,
  GetCohortById,
} from "@/features";

export function createInstructorService(
  getAllCohorts: GetAllCohorts,
  getCohortById: GetCohortById,
  createCohort: CreateCohort
) {
  return {
    async getAllCohorts() {
      return await getAllCohorts();
    },
    async getCohortById(cohortId: string) {
      return await getCohortById(cohortId);
    },
    async createCohort(cohort: CohortFormData) {
      return await createCohort(cohort);
    },
  };
}
