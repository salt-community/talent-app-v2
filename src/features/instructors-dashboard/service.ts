import {
  AddCohort,
  AddDevelopersToCohort,
  CohortFormData,
  CreateAssignment,
  DeleteAssignmentById,
  DeleteCohortAndCohortIdentity,
  DeleteIdentityFromCohort,
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
  addDevelopersToCohort: AddDevelopersToCohort,
  deleteIdentityFromCohort: DeleteIdentityFromCohort,
  deleteCohortAndCohortIdentity: DeleteCohortAndCohortIdentity,
  deleteAssignmentById: DeleteAssignmentById
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
    async addIdentitiesToCohort(args: {
      cohortId: string;
      identityIds: string[];
    }) {
      return await addDevelopersToCohort(args);
    },
    async deleteIdentityFromCohort(identityId: string) {
      return await deleteIdentityFromCohort(identityId);
    },
    async deleteCohortAndCohortIdentity(cohortId: string) {
      return await deleteCohortAndCohortIdentity(cohortId);
    },
    async deleteAssignmentById(assignmentId: string) {
      return await deleteAssignmentById(assignmentId);
    },
  };
}
