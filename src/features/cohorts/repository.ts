import { Db } from "@/db";
import { eq } from "drizzle-orm";
import { cohortIdentities, cohorts } from "./schema";
import { CohortFormData, CohortIdentity } from "./types";

export function createCohortsRepository(db: Db) {
  return {
    async createCohort(data: CohortFormData) {
      const [insertedCohort] = await db
        .insert(cohorts)
        .values(data)
        .returning();
      return insertedCohort;
    },
    async addDeveloperToCohort(data: CohortIdentity) {
      await db.insert(cohortIdentities).values(data);
    },
    async getCohortById(cohortId: string) {
      const [cohort] = await db
        .select()
        .from(cohorts)
        .where(eq(cohorts.id, cohortId));
      return cohort;
    },
    async getCohortIdByIdentityId(identityId: string) {
      const [cohort] = await db
        .select()
        .from(cohortIdentities)
        .where(eq(cohortIdentities.identityId, identityId));
      return cohort;
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
    async deleteCohort(cohortId: string) {
      return await db.delete(cohorts).where(eq(cohorts.id, cohortId));
    },
    async deleteIdentityFromCohort(identityId: string) {
      await db
        .delete(cohortIdentities)
        .where(eq(cohortIdentities.identityId, identityId));
    },
    async deleteCohortAndCohortIdentity(cohortId: string) {
      await db.delete(cohorts).where(eq(cohorts.id, cohortId));
      await db
        .delete(cohortIdentities)
        .where(eq(cohortIdentities.cohortId, cohortId));
    },

    async updateCohortStatus({
      cohortId,
      status,
    }: {
      cohortId: string;
      status: string;
    }) {
      return await db
        .update(cohorts)
        .set({ status })
        .where(eq(cohorts.id, cohortId))
        .returning();
    },
    async getCohortByName(name: string) {
      const [cohort] = await db
        .select()
        .from(cohorts)
        .where(eq(cohorts.name, name));
      return cohort;
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
