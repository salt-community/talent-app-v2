import { GetAllIdentities } from "../iam";
import {
  Assignment,
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
  GetCohortStudents,
  DeleteIdentityFromCohort,
} from "../cohorts";
import { ScoreStatus } from "./types";

export function createInstructorService(
  getAllCohorts: GetAllCohorts,
  addCohort: AddCohort,
  addDevelopersToCohort: AddDevelopersToCohort,
  deleteIdentityFromCohort: DeleteIdentityFromCohort,
  deleteCohortAndCohortIdentity: DeleteCohortAndCohortIdentity,
  getCohortStudentsByCohortId: GetCohortStudents,
  getAssignmentsByCohortId: GetAssignmentsByCohortId,
  addAssignment: CreateAssignment,
  updateAssignment: CreateAssignment,
  deleteAssignmentById: DeleteAssignmentById,
  getAssignmentBySlug: GetAssignmentBySlug,
  upsertAssignmentScore: UpsertAssignmentScore,
  getScoresByAssignmentId: GetScoresByAssignmentId,
  updateScoreStatuses: UpdateScoreStatuses,
  getAllIdentities: GetAllIdentities
) {
  return {
    async getAllCohorts() {
      return await getAllCohorts();
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

    async updateAssignment(assignment: Assignment) {
      return await updateAssignment(assignment);
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

    async addScoreToAssignment(assignment: AssignmentScore) {
      return await upsertAssignmentScore(assignment);
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
                score.identityId === developer.id && score.category === category
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
          (s) => s.identityId === developer.id
        );
        const published = assignmentScores.some(
          (s) => s.identityId === developer.id && s.status === "published"
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

    async getCohortDevelopersDataByName(cohortName: string) {
      const cohorts = await getAllCohorts();
      const foundCohort = cohorts.find((cohort) => cohort.name === cohortName);

      if (!foundCohort) {
        return null;
      }

      const cohortId = foundCohort.id;
      const developers = await getCohortStudentsByCohortId(cohortId);

      if (!developers) {
        return null;
      }

      const allDeveloperProfiles = await getAllIdentities();
      const unsignedDevelopers = allDeveloperProfiles.filter(
        (profile) =>
          !developers.find((developer) => developer.id === profile.id)
      );

      return {
        cohort: foundCohort,
        developers,
        unsignedDevelopers,
      };
    },
  };
}
