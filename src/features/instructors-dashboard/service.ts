import {
  AddFixToAssignmentScore,
  AddPrivateNoteToAssignmentScore,
  AssignmentScore,
  AssignmentWithCategory,
  CreateAssignment,
  DeleteAssignmentById,
  DeleteFixItemById,
  GetAssignmentsByCohortId,
  GetAssignmentWithCategoriesBySlug,
  GetFixListByAssignmentScoreId,
  getPrivateNotesByAssignmentScoreId,
  GetScoresWithFeedbackByAssignmentId,
  UpdateFixStatusById,
  UpdateScoreStatuses,
  UpsertAssignmentScore,
} from "../assignments";
import {
  AddCohort,
  AddDevelopersToCohort,
  CohortFormData,
  DeleteCohortAndCohortIdentity,
  DeleteIdentityFromCohort,
  GetAllCohorts,
  GetCohortStudents,
} from "../cohorts";
import { GetAllIdentities } from "../iam";
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
  upsertAssignmentScore: UpsertAssignmentScore,
  updateScoreStatuses: UpdateScoreStatuses,
  getAssignmentWithCategoriesBySlug: GetAssignmentWithCategoriesBySlug,
  getScoresWithFeedbackByAssignmentId: GetScoresWithFeedbackByAssignmentId,
  getFixListByAssignmentScoreId: GetFixListByAssignmentScoreId,
  addFixToAssignmentScore: AddFixToAssignmentScore,
  addPrivateNoteToAssignmentScore: AddPrivateNoteToAssignmentScore,
  getPrivateNotesByAssignmentScoreId: getPrivateNotesByAssignmentScoreId,
  updateFixStatusById: UpdateFixStatusById,
  deleteFixItemById: DeleteFixItemById,
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

    async addAssignment(assignment: AssignmentWithCategory) {
      return await addAssignment(assignment);
    },

    async updateAssignment(assignment: AssignmentWithCategory) {
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
    async addScoreToAssignment(
      assignment: AssignmentScore,
      feedbackDataArray: Array<{
        comment?: string;
        score?: number;
        categoryId: string;
      }>
    ) {
      const args = {
        scoreData: assignment,
        feedbackDataArray,
      };
      return await upsertAssignmentScore(args);
    },

    async updateScoreStatuses(scoreStatuses: ScoreStatus[]) {
      await updateScoreStatuses(scoreStatuses);
    },

    async getAssignmentDataBySlug(slug: string) {
      const assignment = await getAssignmentWithCategoriesBySlug(slug);
      if (!assignment) return null;

      const developers = await getCohortStudentsByCohortId(assignment.cohortId);
      if (!developers) return null;

      const assignmentScores = await getScoresWithFeedbackByAssignmentId(
        assignment.id
      );

      const fixLists = await Promise.all(
        assignmentScores.map(async (score) => {
          try {
            const items = await getFixListByAssignmentScoreId(score.id);

            return items.map((item) => ({
              ...item,
              developerId: score.identityId,
              assignmentScoreId: score.id,
            }));
          } catch (error) {
            console.error(
              `Error fetching fix list for score id ${score.id}:`,
              error
            );
            return [];
          }
        })
      ).then((results) => {
        const allFixLists = results.flat();
        return Array.from(
          new Map(allFixLists.map((item) => [item.id, item])).values()
        );
      });

      const privateNotes = await Promise.all(
        assignmentScores.map(async (score) => {
          try {
            const notes = await getPrivateNotesByAssignmentScoreId(score.id);

            return notes.map((note) => ({
              ...note,
              assignmentScoreId: score.id,
            }));
          } catch (error) {
            console.error(
              `Error fetching private notes for score id ${score.id}:`,
              error
            );
            return [];
          }
        })
      ).then((results) => {
        const allPrivateNotes = results.flat();

        return Array.from(
          new Map(allPrivateNotes.map((item) => [item.id, item])).values()
        );
      });

      const assignmentCategories = assignment.categories || [];

      const developersWithScores = developers.map((developer) => {
        const developerScores = assignmentScores.filter(
          (score) => score.identityId === developer.id
        );

        const scored = developerScores.length > 0;

        const published = developerScores.some(
          (score) => score.status === "published"
        );

        const scores = assignmentCategories.map((category) => {
          const matchingScore = developerScores.find(
            (score) => score.categoryId === category.id
          );

          return {
            id: matchingScore?.id || null,
            assignmentId: assignment.id,
            identityId: developer.id,
            categoryId: category.id,
            categoryName: category.name,
            comment: matchingScore?.comment || "",
            score: matchingScore?.score || 0,
            createdAt: matchingScore?.createdAt || null,
          };
        });

        return {
          developer,
          scores,
          scored,
          published,
        };
      });

      return { assignment, developersWithScores, fixLists, privateNotes };
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

    async addFixToAssignmentScore(args: {
      assignmentScoreId: string;
      description: string;
      dueDate?: Date | null;
    }) {
      return await addFixToAssignmentScore(args);
    },

    async addPrivateNoteToAssignmentScore(args: {
      assignmentScoreId: string;
      note: string;
    }) {
      return await addPrivateNoteToAssignmentScore(args);
    },

    async updateFixStatusById(args: { id: string; newStatus: boolean }) {
      return await updateFixStatusById(args);
    },

    async deleteFixItemById(id: string) {
      return await deleteFixItemById(id);
    },
  };
}
