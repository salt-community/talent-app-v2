import { describe, test, expect, beforeAll, afterAll } from "vitest";
import { db } from "@/db";
import { createCohortsService } from "@/features";

const cohortsServiceTest = createCohortsService(db);

describe("Cohort Services", () => {
  let testCohortId: string;

  beforeAll(async () => {
    const cohort = await cohortsServiceTest.createCohort(
      "Test Cohort",
      "For testing purposes"
    );
    testCohortId = cohort.id;
  });

  test("should fetch all cohorts!", async () => {
    const cohorts = await cohortsServiceTest.getAll();
    expect(Array.isArray(cohorts)).toBe(true);
    expect(cohorts.length).toBeGreaterThan(0);
  });

  afterAll(async () => {
    await cohortsServiceTest.deleteCohort(testCohortId);
  });
});
