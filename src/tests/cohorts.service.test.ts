import { describe, test, expect, beforeAll, afterAll } from "vitest";
import { createCohortsService } from "@/features/cohorts/service";
import { db } from "@/db";

const cohortsService = createCohortsService(db);

describe("Cohort Services", () => {
  let testCohortId: string;

  beforeAll(async () => {
    const cohort = await cohortsService.createCohort(
      "Test Cohort",
      "For testing purposes"
    );
    testCohortId = cohort.id;
  });

  test("should fetch all cohorts", async () => {
    const cohorts = await cohortsService.getAll();
    expect(Array.isArray(cohorts)).toBe(true);
    expect(cohorts.length).toBeGreaterThan(0);
  });

  afterAll(async () => {
    await cohortsService.delete(testCohortId);
  });
});
