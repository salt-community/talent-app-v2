import { Db } from "@/db";
import { eq } from "drizzle-orm";
import { CohortStatus } from "./types";
import { cohortIdentities, cohorts } from "./schema";

export function createCohortsRepository(db: Db) {
  return {
    async createCohort(data: { name: string; description?: string }) {
      const [insertedCohort] = await db
        .insert(cohorts)
        .values(data)
        .returning();
      return insertedCohort;
    },
    async getCohortById(cohortId: string) {
      const [cohort] = await db
        .select()
        .from(cohorts)
        .where(eq(cohorts.id, cohortId));
      return cohort;
    },
    async getAllCohorts() {
      return await db.select().from(cohorts);
    },
    async getCohortIdentities(cohortId: string) {
      return await db
        .select({ identityId: cohortIdentities.identityId })
        .from(cohortIdentities)
        .where(eq(cohortIdentities.cohortId, Number(cohortId)));
    },
    async deleteCohort(cohortId: string) {
      return await db.delete(cohorts).where(eq(cohorts.id, cohortId));
    },

    async updateCohortStatus(args: { cohortId: string; status: CohortStatus }) {
      const { cohortId, status } = args;
      return await db
        .update(cohorts)
        .set({ status })
        .where(eq(cohorts.id, cohortId))
        .returning();
    },
  };
}
