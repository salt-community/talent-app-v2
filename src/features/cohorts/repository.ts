import { Db } from "@/db";
import { eq } from "drizzle-orm";
import { cohortIdentities, cohorts } from "./schema";
import { CohortFormData } from "./types";

export function createCohortsRepository(db: Db) {
  return {

    async createCohort(data: CohortFormData) {
      const [insertedCohort] = await db
        .insert(cohorts)
        .values(data)
        .returning();
      return insertedCohort;
    },


    async getAllCohorts() {
      return await db.select().from(cohorts);
    },

    async getCohortStudents(cohortId: string) {
      return await db
        .select()
        .from(cohortIdentities)
        .where(eq(cohortIdentities.cohortId, cohortId));
    },

    async deleteIdentityFromCohort(identityId: string) {
      return await db
        .delete(cohortIdentities)
        .where(eq(cohortIdentities.identityId, identityId))
        .returning();
    },

    async deleteCohortAndCohortIdentity(cohortId: string) {
      await db.delete(cohorts).where(eq(cohorts.id, cohortId));
      await db
        .delete(cohortIdentities)
        .where(eq(cohortIdentities.cohortId, cohortId));
    },

    async addDevelopersToCohort(args: {
      cohortId: string;
      identityIds: string[];
    }) {
      await db.insert(cohortIdentities).values(
        args.identityIds.map((identityId) => ({
          cohortId: args.cohortId,
          identityId,
        }))
      );
    },
  };
}
