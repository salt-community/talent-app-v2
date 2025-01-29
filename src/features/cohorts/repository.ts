import { Db } from "@/db";
import { eq } from "drizzle-orm";
import { CohortStatus, Cohort } from "./types";
import { cohorts } from "./schema";

export function createCohortsRepository(db: Db) {
  return {
    async createCohort(data: Cohort) {
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

    async deleteCohort(cohortId: string) {
      return await db.delete(cohorts).where(eq(cohorts.id, cohortId));
    },

    async updateCohortStatus({
      cohortId,
      status,
    }: {
      cohortId: string;
      status: CohortStatus;
    }) {
      return await db
        .update(cohorts)
        .set({ status })
        .where(eq(cohorts.id, cohortId))
        .returning();
    },
  };
}
