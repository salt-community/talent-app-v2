import { GetAllIdentities } from "../iam";
import {
  AssignmentScore,
  CreateAssignment,
  CreateAssignmentScore,
  DeleteAssignmentById,
  GetAssignmentBySlug,
  GetAssignmentsByCohortId,
  GetScoresByAssignmentId,
  NewAssignment,
  updateScoreStatus,
  UpsertAssignmentScore,
} from "../assignments";
import {
  AddCohort,
  AddDevelopersToCohort,
  CohortFormData,
  DeleteCohortAndCohortIdentity,
  GetAllCohorts,
  GetCohortById,
  GetCohortStudents,
  deleteCohortIdentity,
} from "../cohorts";

export function createInstructorService(
  getAllCohorts: GetAllCohorts,
  getCohortById: GetCohortById,
  addCohort: AddCohort,
  addDevelopersToCohort: AddDevelopersToCohort,
  deleteCohortIdentity: deleteCohortIdentity,
  deleteCohortAndCohortIdentity: DeleteCohortAndCohortIdentity,
  getCohortStudentsByCohortId: GetCohortStudents,
  getAssignmentsByCohortId: GetAssignmentsByCohortId,
  addAssignment: CreateAssignment,
  deleteAssignmentById: DeleteAssignmentById,
  getAssignmentBySlug: GetAssignmentBySlug,
  upsertAssignmentScore: UpsertAssignmentScore,
  getScoresByAssignmentId: GetScoresByAssignmentId,
  updateScoreStatus: updateScoreStatus,
  getAllIdentities: GetAllIdentities
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
    async addIdentitiesToCohort(args: {
      cohortId: string;
      identityIds: string[];
    }) {
      return await addDevelopersToCohort(args);
    },
    async deleteIdentityFromCohort(identityId: string) {
      return await deleteCohortIdentity(identityId);
    },
    async deleteCohortAndCohortIdentity(cohortId: string) {
      return await deleteCohortAndCohortIdentity(cohortId);
    },
    async deleteAssignmentById(assignmentId: string) {
      return await deleteAssignmentById(assignmentId);
    },
    async getAllIdentities() {
      return await getAllIdentities();
    },
    async getAssignmentBySlug(slug: string) {
      return await getAssignmentBySlug(slug);
    },
    async addScoreToAssignment(assignment: AssignmentScore) {
      return await upsertAssignmentScore(assignment);
      //return await addScoreToAssignment(assignment);
    },
    async getScoresByAssignmentId(assignmentId: string) {
      return await getScoresByAssignmentId(assignmentId);
    },
  };
}
