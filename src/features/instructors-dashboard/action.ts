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
  cohortId: string,
  title: string,
  comment: string,
  categories: string[],
) {
  try {
    const assignment = assignmentSchema.parse({
      title,
      comment,
      cohortId,
      categories,
      date: new Date(),
      score: 0,
    });

    await instructorService.addAssignment(assignment);
    revalidatePath("/instructor-dashboard", "layout");
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
    revalidatePath("/instructor-dashboard", "layout");
  } catch (error) {
    console.error(error);
  }
}

export async function deleteIdentityFromCohortAction(identityId: string) {
  try {
    const result = await instructorService.deleteIdentityFromCohort(identityId);
    if (!result || result.length === 0) {
      return { success: false, error: "Failed to remove developer" };
    } else {
      revalidatePath("/instructor-dashboard", "layout");
      return { success: true };
    }
  } catch (error) {
    console.error("Error in deleteIdentityFromCohortAction:", error);
    return {
      success: false,
      error: "Failed to remove developer",
    };
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
    const result = await instructorService.deleteAssignmentById(assignmentId);
    if (!result || result.length === 0) {
      return { success: false, error: "Failed to remove assignment" };
    } else {
      revalidatePath("/instructor-dashboard", "layout");
      return { success: true };
    }
  } catch (error) {
    console.error("Error in deleteAssignmentByIdAction:", error);

    if (
      error instanceof Error &&
      error.message.includes("violates foreign key constraint") &&
      error.message.includes("assignment_scores")
    ) {
      return {
        success: false,
        error: "All scores must be deleted before removing this assignment.",
      };
    }

    return {
      success: false,
      error: "Failed to remove assignment",
    };
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
