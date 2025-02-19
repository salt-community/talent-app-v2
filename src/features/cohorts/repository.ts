import { Db } from "@/db";
import { eq } from "drizzle-orm";
import { CohortFormData, CohortIdentity } from "./types";
import { cohortIdentities, cohorts } from "./schema";

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
    async deleteCohortIdentity(identityId: string) {
      await db
        .delete(cohortIdentities)
        .where(eq(cohortIdentities.identityId, identityId));
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
    }
  };
}
