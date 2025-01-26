"use server";

import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { errorHandler } from "@/lib";
import { NewAssignment, NewAssignmentScore } from "./types";
import { assignmentsService } from "./instance";
import { getFormData, getAssignmentScoreFormData } from "./utils";

type PreviousState =
  | {
      errorMessages: {
        titleError?: string;
        scoreError?: string;
      };
      newAssignment?: NewAssignment;
      newAssignmentScore?: NewAssignmentScore;
    }
  | undefined;

export async function addAssignmentAction(
  _: PreviousState,
  formData: FormData
): Promise<
  | {
      errorMessages?: {
        titleError?: string;
      };
      newAssignment?: NewAssignment;
    }
  | undefined
> {
  const { title, tags, cohortId, comment, categories } = getFormData(formData);

  const newAssignment: NewAssignment = {
    title,
    tags,
    cohortId,
    comment,
    categories,
  };

  try {
    await assignmentsService.createAssignment(newAssignment);
  } catch (error) {
    if (error instanceof ZodError) {
      const titleError = error.flatten().fieldErrors.title?.[0];
      return {
        errorMessages: { titleError },
        newAssignment,
      };
    }
    errorHandler(error);
  }

  revalidatePath("/assignments");
}

export async function editAssignmentAction(
  _: PreviousState,
  formData: FormData
): Promise<
  | {
      errorMessages?: {
        titleError?: string;
      };
      newAssignment?: NewAssignment;
    }
  | undefined
> {
  const assignmentId = formData.get("assignmentId") as string | null;
  const { title, tags, cohortId, comment, categories } = getFormData(formData);

  if (!assignmentId) {
    throw new Error("Missing required field: assignmentId");
  }

  const newAssignment: NewAssignment = {
    title,
    tags,
    cohortId,
    comment,
    categories,
  };

  try {
    await assignmentsService.updateAssignment({
      id: assignmentId,
      rawData: newAssignment,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const titleError = error.flatten().fieldErrors.title?.[0];
      return {
        errorMessages: { titleError },
        newAssignment,
      };
    }
    errorHandler(error);
  }

  revalidatePath("/assignments");
}

export async function deleteAssignmentAction(id: string): Promise<void> {
  try {
    await assignmentsService.deleteAssignment(id);
  } catch (error) {
    errorHandler(error);
  }

  revalidatePath("/assignments");
}

export async function addAssignmentScoreAction(
  _: PreviousState,
  formData: FormData
): Promise<
  | {
      errorMessages?: {
        scoreError?: string;
      };
      newAssignmentScore?: NewAssignmentScore;
    }
  | undefined
> {
  const { assignmentId, identityId, score, comment } =
    getAssignmentScoreFormData(formData);

  const newAssignmentScore: NewAssignmentScore = {
    assignmentId,
    identityId,
    score,
    comment,
  };

  try {
    await assignmentsService.createAssignmentScore(newAssignmentScore);
  } catch (error) {
    if (error instanceof ZodError) {
      const scoreError = error.flatten().fieldErrors.score?.[0];
      return {
        errorMessages: { scoreError },
        newAssignmentScore,
      };
    }
    errorHandler(error);
  }

  revalidatePath(`/assignments/${assignmentId}`);
}
