"use server";

import { revalidatePath } from "next/cache";
import { ReactNode } from "react";
import { ZodError } from "zod";
import { errorHandler } from "@/lib";
import { AssignmentScoreFormData, NewAssignment } from "./types";
import { assignmentsService } from "./instance";
import { getAssignmentFormData } from "./utils";

type PreviousState =
  | {
      errorMessages: {
        titleError?: string;
        scoreError?: string;
      };
      newAssignment?: NewAssignment;
      newAssignmentScore?: AssignmentScoreFormData;
    }
  | undefined;

export async function addAssignmentAction(
  _: unknown,
  formData: FormData
): Promise<
  | {
      successMessage: ReactNode;
      errorMessages?: {
        titleError?: string;
      };
      newAssignment?: NewAssignment;
    }
  | undefined
> {
  const { title, tags, categories, comment } = getAssignmentFormData(formData);

  const newAssignment: NewAssignment = {
    title,
    tags,
    cohortId: "",
    comment,
    categories,
  };

  try {
    await assignmentsService.createAssignment(newAssignment);
  } catch (error) {
    if (error instanceof ZodError) {
      const titleError = error.flatten().fieldErrors.title?.[0];
      return {
        successMessage: null,
        errorMessages: { titleError },
        newAssignment,
      };
    }
    errorHandler(error);
  }

  revalidatePath("/assignments");
}

export async function updateAssignmentAction(
  _: PreviousState,
  formData: FormData
): Promise<
  | {
      errorMessages?: {
        titleError?: string;
      };
      newAssignment: NewAssignment;
    }
  | undefined
> {
  const assignmentId = formData.get("assignmentId") as string | null;
  const { title, tags, cohortId, comment, categories } =
    getAssignmentFormData(formData);

  if (!assignmentId) {
    throw new Error("Missing required field: assignmentId");
  }

  const newAssignment: NewAssignment = {
    title: title ?? "Untitled",
    tags: tags ?? [],
    cohortId: cohortId ?? "",
    comment: comment ?? "",
    categories: categories ?? [],
  };

  try {
    await assignmentsService.updateAssignment(newAssignment);
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
