"use server";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { errorHandler } from "@/lib";
import { Assignment } from "./types";
import { assignmentsService } from "./instance";

export async function getAllAssignmentsAction(
  previousState: Assignment[] | undefined
) {
  try {
    const allAssignments = await assignmentsService.getAllAssignments();
    if (allAssignments.length === 0) {
      return previousState ?? [];
    }
    return allAssignments;
  } catch (error) {
    errorHandler(error);
  }
  revalidatePath("/assignments");
}
export async function getAllAssignments() {
  try {
    const allAssignments = await assignmentsService.getAllAssignments();
    if (allAssignments.length === 0) {
      return [];
    }
    return allAssignments;
  } catch (error) {
    errorHandler(error);
  }
  revalidatePath("/assignments");
}

export async function deleteAssignmentAction(
  formData: FormData
): Promise<void> {
  try {
    const assignmentId = formData.get("assignmentId") as string;
    if (!assignmentId) {
      throw new Error("Missing required field: assignmentId");
    }
    await assignmentsService.deleteAssignment(assignmentId);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error("Fields are not valid");
    }
    errorHandler(error);
  }

  revalidatePath("/assignments");
}

export async function deleteAllAssignmentsAction(): Promise<void> {
  try {
    await assignmentsService.deleteAllAssignments();
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error("Fields are not valid");
    }
    errorHandler(error);
  }
  revalidatePath("/assignments");
}
