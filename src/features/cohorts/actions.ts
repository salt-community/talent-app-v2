"use server";

import { revalidatePath } from "next/cache";
import { errorHandler } from "@/lib";
import { cohortsService } from "./instance";
import { CohortFormData } from "./types";

export async function addCohortAction(cohort: CohortFormData) {
  await cohortsService.createCohort(cohort);
  revalidatePath("/cohorts");
}

export async function fetchCohortsAction() {
  try {
    return await cohortsService.getAll();
  } catch (error) {
    errorHandler(error);
    return [];
  }
}
export async function getCohortStudents(cohortId: string) {
  return await cohortsService.getCohortStudents(cohortId);
}

export async function getAllUnassignedDevelopers() {
  return await cohortsService.getAllUnassignedDevelopers();
}

export async function addDeveloperToCohort(
  cohortId: string,
  identityId: string
) {
  await cohortsService.addDeveloperToCohort({ cohortId, identityId });
  revalidatePath("/cohorts");
}
