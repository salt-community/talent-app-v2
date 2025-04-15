"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { instructorService } from "./instance";
import { assignmentSchema, newAssignmentSchema } from "./validation";
import { CohortFormData } from "../cohorts";
import { AssignmentScore } from "../assignments";
import { Assignment, ScoreStatus } from "./types";

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
  categories: string[]
) {
  try {
    const assignment = newAssignmentSchema.parse({
      title,
      cohortId,
      categories,
      createdAt: new Date(),
      score: 0,
      slug: null,
      comment: null,
      updatedAt: null,
    });

    await instructorService.addAssignment(assignment);
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

export async function updateAssignmentAction(rawAssignment: Assignment) {
  try {
    const assignment = assignmentSchema.parse({ ...rawAssignment, score: 0 });
    console.log("Parsed assignment:", assignment);
    await instructorService.updateAssignment(assignment);
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

export async function updateScoreStatusesAction(scoreStatuses: ScoreStatus[]) {
  try {
    await instructorService.updateScoreStatuses(scoreStatuses);
    revalidatePath("/instructor-dashboard", "layout");
  } catch (error) {
    console.error(error);
  }
}

export async function updateScoreAction(
  score: AssignmentScore,
  feedbackData: { comment: string; score: number; categoryId: string }
) {
  try {
    await instructorService.addScoreToAssignment(score, feedbackData);
    revalidatePath("/instructor-dashboard", "layout");
    return { success: true };
  } catch (error) {
    console.error("Failed to update score:", error);
    return { success: false };
  }
}

export async function addFixToAssignmentScoreAction(args: {
  assignmentScoreId: string;
  description: string;
  dueDate?: Date;
}) {
  try {
    await instructorService.addFixToAssignmentScore(args);
    revalidatePath("/instructor-dashboard", "layout");
  } catch (error) {
    console.error("Failed to add fix:", error);
  }
}

export async function addPrivateNoteToAssignmentScoreAction(args: {
  assignmentScoreId: string;
  note: string;
}) {
  try {
    await instructorService.addPrivateNoteToAssignmentScore(args);
    revalidatePath("/instructor-dashboard", "layout");
  } catch (error) {
    console.error("Failed to add private note:", error);
  }
}
