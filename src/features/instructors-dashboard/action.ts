"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { instructorService } from "./instance";
import { assignmentSchema } from "./validation";
import { CohortFormData } from "../cohorts";
import { AssignmentInsert } from "./types";

export async function addCohortAction(cohort: CohortFormData) {
  try {
    await instructorService.createCohort(cohort);
    revalidatePath("/instructors-dashboard");
  } catch (error) {
    console.error(error);
  }
}

export async function addAssignmentAction(
  formData: FormData,
  cohortId: string,
  categories: string[],
) {
  const title = formData.get("title") as string;
  const comment = formData.get("comment") as string;

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
      slug: "",
    };

    await instructorService.addAssignment(newAssignment);
    revalidatePath("/instructors-dashboard");
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation failed:", error.errors);
      throw new Error(
        "Validation failed: " + error.errors.map((e) => e.message).join(", "),
      );
    } else {
      console.error("Unexpected error:", error);
      throw error;
    }
  }
}

export async function addIdentitiesToCohortAction(
  cohortId: string,
  identityIds: string[],
) {
  try {
    await instructorService.addIdentitiesToCohort({ cohortId, identityIds });
    revalidatePath("/instructors-dashboard");
  } catch (error) {
    console.error(error);
  }
}
export async function deleteIdentityFromCohortAction(identityId: string) {
  try {
    await instructorService.deleteIdentityFromCohort(identityId);
    revalidatePath("/instructors-dashboard");
  } catch (error) {
    console.error(error);
  }
}
export async function deleteCohortAndCohortIdentityAction(cohortId: string) {
  try {
    await instructorService.deleteCohortAndCohortIdentity(cohortId);
    revalidatePath("/instructors-dashboard");
  } catch (error) {
    console.error(error);
  }
}
export async function deleteAssignmentByIdAction(assignmentId: string) {
  try {
    await instructorService.deleteAssignmentById(assignmentId);
    revalidatePath("/instructors-dashboard");
  } catch (error) {
    console.error(error);
  }
}
export async function addScoreToAssignment({ assignment }: AssignmentInsert) {
  try {
    await instructorService.addScoreToAssignment({ assignment });
    revalidatePath("/instructors-dashboard");
  } catch (error) {
    console.error(error);
  }
}
