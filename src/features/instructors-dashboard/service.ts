import { GetAllIdentities } from "../iam";
import {
  AssignmentScore,
  CreateAssignment,
  DeleteAssignmentById,
  GetAssignmentBySlug,
  GetAssignmentsByCohortId,
  GetScoresByAssignmentId,
  NewAssignment,
  UpdateScoreStatuses,
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
  DeleteCohortIdentity,
} from "../cohorts";
import { ScoreStatus } from "./types";

export function createInstructorService(
  getAllCohorts: GetAllCohorts,
  getCohortById: GetCohortById,
  addCohort: AddCohort,
  addDevelopersToCohort: AddDevelopersToCohort,
  deleteCohortIdentity: DeleteCohortIdentity,
  deleteCohortAndCohortIdentity: DeleteCohortAndCohortIdentity,
  getCohortStudentsByCohortId: GetCohortStudents,
  getAssignmentsByCohortId: GetAssignmentsByCohortId,
  addAssignment: CreateAssignment,
  deleteAssignmentById: DeleteAssignmentById,
  getAssignmentBySlug: GetAssignmentBySlug,
  upsertAssignmentScore: UpsertAssignmentScore,
  getScoresByAssignmentId: GetScoresByAssignmentId,
  updateScoreStatuses: UpdateScoreStatuses,
  getAllIdentities: GetAllIdentities,
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
    },
    async getScoresByAssignmentId(assignmentId: string) {
      return await getScoresByAssignmentId(assignmentId);
    },
    async updateScoreStatuses(scoreStatuses: ScoreStatus[]) {
      await updateScoreStatuses(scoreStatuses);
    },

    async getAssignmentDataBySlug(slug: string) {
      const assignment = await getAssignmentBySlug(slug);
      if (!assignment) return null;

      const developers = await getCohortStudentsByCohortId(assignment.cohortId);
      if (!developers) return null;

      const assignmentScores = await getScoresByAssignmentId(assignment.id);

      const developersWithScores = developers.map((developer) => {
        const scores =
          assignment.categories?.map((category) => {
            const score = assignmentScores.find(
              (score) =>
                score.identityId === developer.id &&
                score.category === category,
            );
            return {
              id: score?.id,
              assignmentId: assignment.id,
              identityId: developer.id,
              category,
              comment: score?.comment || "",
              score: score?.score || 0,
              createdAt: score?.createdAt || null,
            };
          }) || [];

        const scored = assignmentScores.some(
          (s) => s.identityId === developer.id,
        );
        const published = assignmentScores.some(
          (s) => s.identityId === developer.id && s.status === "published",
        );

        return {
          developer,
          scores,
          scored,
          published,
        };
      });

      return { assignment, developersWithScores };
    },
  };
}
