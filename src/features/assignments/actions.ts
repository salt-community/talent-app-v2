"use server";

import { revalidatePath } from "next/cache";
import { assignmentsService } from "./instance";
import { getFormData } from "./utils";
import type { NewAssignment } from "./types";
import { ZodError } from "zod";
import { errorHandler } from "@/lib";

type PreviousState =
  | {
      errorMessages: {
        titleError?: string;
        scoreError?: string;
      };
      newAssignment: NewAssignment;
    }
  | undefined;

export async function addAssignmentAction(
  _: PreviousState,
  formData: FormData
) {
  const { devId, title, score, comment, tags } = getFormData(formData);

  if (!devId || !title || !comment || !tags) {
    throw new Error("Missing required fields");
  }

  const newAssignment: NewAssignment = {
    devId,
    title,
    score: Number(score),
    comment,
    tags,
  };

  try {
    await assignmentsService.addAssignment(newAssignment);
  } catch (error) {
    if (error instanceof ZodError) {
      const titleError = error.flatten().fieldErrors.title?.[0];
      const scoreError = error.flatten().fieldErrors.score?.[0];

      return {
        errorMessages: {
          titleError,
          scoreError,
        },
        newAssignment,
      };
    }
    errorHandler(error);
  }
  revalidatePath("/developers");
}

export async function editAssignmentAction(
  _: PreviousState,
  formData: FormData
) {
  const assignmentId = formData.get("assignmentId") as string;
  const { title, comment, score, tags, devId } = getFormData(formData);

  if (!devId || !title || !comment || !tags) {
    throw new Error("Missing required fields");
  }

  const newAssignment: NewAssignment = {
    devId,
    comment,
    score: Number(score),
    title,
    tags,
  };

  try {
    await assignmentsService.updateAssignment({
      id: Number(assignmentId),
      rawData: newAssignment,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const titleError = error.flatten().fieldErrors.title?.[0];
      const scoreError = error.flatten().fieldErrors.score?.[0];

      return {
        errorMessages: {
          titleError,
          scoreError,
        },
        newAssignment,
      };
    }
    errorHandler(error);
  }

  revalidatePath("/developers");
}

export async function deleteAssignmentAction(id: number) {
  try {
    await assignmentsService.deleteAssignment(id);
  } catch (error) {
    errorHandler(error);
  }

  revalidatePath("/developers");
}
