import { Db } from "@/db";
import { eq } from "drizzle-orm";
import { cohortIdentities, cohorts } from "../backgrounds";

export function createCohortsRepository(db: Db) {
  return {
    async createCohort(data: { name: string; description?: string }) {
      const [cohort] = await db.insert(cohorts).values(data).returning();
      return cohort;
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
  };
}
