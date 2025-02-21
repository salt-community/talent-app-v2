"use server";
import { CohortFormData } from "@/features";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { instructorService } from "./instance";
import { assignmentSchema } from "./validation";

export async function addCohortAction(cohort: CohortFormData) {
  try {
    await instructorService.createCohort(cohort);
    revalidatePath("/instructors-dashboard");
  } catch (error) {
    console.error(error);
  }
}

export async function addAssignmentAction(formData: FormData) {
  const title = formData.get("title") as string;
  const comment = formData.get("comment") as string;
  const cohortId = formData.get("cohortId") as string;
  const categories = (formData.get("categories") as string).split(",");

  try {
    assignmentSchema.parse({
      title,
      comment,
      cohortId,
      categories,
    });

    const newAssignment = {
      title,
      score: 0,
      cohortId,
      comment,
      categories,
    };

    await instructorService.addAssignment(newAssignment);
    revalidatePath("/admin/instructors/assignments");
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation failed:", error.errors);
      throw new Error(
        "Validation failed: " + error.errors.map((e) => e.message).join(", ")
      );
    } else {
      console.error("Unexpected error:", error);
      throw error;
    }
  }
}

export async function addIdentitiesToCohortAction(
  cohortId: string,
  identityIds: string[]
) {
  try {
    instructorService.addIdentitiesToCohort({ cohortId, identityIds });
    revalidatePath("/admin/instructors/cohorts");
  } catch (error) {
    console.error(error);
  }
}
export async function deleteIdentityFromCohortAction(identityId: string) {
  try {
    instructorService.deleteIdentityFromCohort(identityId);
    revalidatePath("/admin/instructors/cohorts");
  } catch (error) {
    console.error(error);
  }
}
