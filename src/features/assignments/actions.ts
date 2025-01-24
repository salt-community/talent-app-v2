"use server";

import { revalidatePath } from "next/cache";
import { assignmentsService } from "./instance";
import { getFormData } from "./utils";
import type { NewAssignment } from "./types";
import { ZodError } from "zod";
import { errorHandler } from "@/lib";
import { developerProfilesService } from "../developer-profiles";

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

export async function addCohortAssignmentAction(
  _: PreviousState,
  formData: FormData
): Promise<void | { errorMessages: { titleError?: string } }> {
  const { cohort, title, description, tags } = getFormData(formData) as {
    cohort: string;
    title: string;
    description: string;
    tags: string[];
  };

  try {
    const devIds = await developerProfilesService.getAllByCohort(cohort);
    const promises = devIds.map(async (devId: string) => {
      await assignmentsService.addAssignment({
        devId,
        title,
        score: 0,
        comment: description,
        tags,
      });
    });

    await Promise.all(promises);
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        errorMessages: { titleError: error.flatten().fieldErrors.title?.[0] },
      };
    }
    errorHandler(error);
  }
  revalidatePath("/assignments");
}
