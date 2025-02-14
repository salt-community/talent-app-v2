"use server";
import { CohortFormData } from "@/features";
import { revalidatePath } from "next/cache";
import { instructorService } from "./instance";

export async function addCohortAction(cohort: CohortFormData) {
  await instructorService.createCohort(cohort);
  revalidatePath("/instructors-dashboard");
}
