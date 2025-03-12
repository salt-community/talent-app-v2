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
