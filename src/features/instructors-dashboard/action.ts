"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { instructorService } from "./instance";
import { assignmentSchema } from "./validation";
import { CohortFormData } from "../cohorts";
import { AssignmentScore } from "../assignments";
import { ScoreStatus } from "./types";

export async function addCohortAction(cohort: CohortFormData) {
  try {
    await instructorService.createCohort(cohort);
    revalidatePath("/instructor-dashboard", "layout");
  } catch (error) {
    console.error(error);
  }
}

export async function addAssignmentAction(
  formData: FormData,
  cohortId: string,
  categories: string[]
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
    revalidatePath("/instructor-dashboard", "layout");
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
    await instructorService.addIdentitiesToCohort({ cohortId, identityIds });
    revalidatePath("/instructor-dashboard", "layout");
  } catch (error) {
    console.error(error);
  }
}

export async function deleteIdentityFromCohortAction(identityId: string) {
  try {
    await instructorService.deleteIdentityFromCohort(identityId);
    revalidatePath("/instructor-dashboard", "layout");
  } catch (error) {
    console.error(error);
  }
}

export async function deleteCohortAndCohortIdentityAction(cohortId: string) {
  try {
    await instructorService.deleteCohortAndCohortIdentity(cohortId);
    revalidatePath("/instructor-dashboard", "layout");
  } catch (error) {
    console.error(error);
  }
}

export async function deleteAssignmentByIdAction(assignmentId: string) {
  try {
    await instructorService.deleteAssignmentById(assignmentId);
    revalidatePath("/instructor-dashboard", "layout");
  } catch (error) {
    console.error(error);
  }
}

export async function addScoreToAssignment(score: AssignmentScore) {
  try {
    await instructorService.addScoreToAssignment(score);
    revalidatePath("/instructor-dashboard", "layout");
  } catch (error) {
    console.error(error);
  }
}

export async function updateScoreStatusesAction(scoreStatuses: ScoreStatus[]) {
  try {
    await instructorService.updateScoreStatuses(scoreStatuses);
    revalidatePath("/instructor-dashboard", "layout");
  } catch (error) {
    console.error(error);
  }
}
