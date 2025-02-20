import {
  AddCohort,
  AddDevelopersToCohort,
  CohortFormData,
  CreateAssignment,
  GetAllCohorts,
  GetAllDeveloperProfiles,
  GetAssignmentsByCohortId,
  GetCohortById,
  GetCohortStudents,
  NewAssignment,
} from "@/features";

export function createInstructorService(
  getAllCohorts: GetAllCohorts,
  getCohortById: GetCohortById,
  addCohort: AddCohort,
  getAssignmentsByCohortId: GetAssignmentsByCohortId,
  addAssignment: CreateAssignment,
  getCohortStudentsByCohortId: GetCohortStudents,
  getAllDevelopers: GetAllDeveloperProfiles,
  addDevelopersToCohort: AddDevelopersToCohort
) {
  return {
    async getAllCohorts() {
      return await getAllCohorts();
    },
    async getCohortById(cohortId: string) {
      return await getCohortById(cohortId);
    },
    async createCohort(cohort: CohortFormData) {
      return await addCohort(cohort);
    },
    async getAssignmentsByCohortId(cohortId: string) {
      return await getAssignmentsByCohortId(cohortId);
    },
    async addAssignment(assignment: NewAssignment) {
      return await addAssignment(assignment);
    },
    async getCohortStudentsByCohortId(cohortId: string) {
      return await getCohortStudentsByCohortId(cohortId);
    },
    async getAllDevelopers() {
      return await getAllDevelopers();
    },
    async addDevelopersToCohort(args: {
      cohortId: string;
      identityIds: string[];
    }) {
      return await addDevelopersToCohort(args);
    },
  };
}
