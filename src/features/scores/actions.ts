"use server";
import { revalidatePath } from "next/cache";
import { scoresService } from "./instance";
import { getFormData } from "./utils";

export async function addAssignmentAction(formData: FormData) {
  const { title, comment, score, tags, devId } = getFormData(formData);

  const newAssignment = {
    devId,
    comment,
    score: Number(score),
    title,
    tags,
  };

  scoresService.addAssignment(newAssignment);
  revalidatePath("/");
}

export async function editAssignmentAction(formData: FormData) {
  const assignmentId = formData.get("assignmentId") as string;
  const { title, comment, score, tags, devId } = getFormData(formData);

  const updatedAssignment = {
    devId,
    comment,
    score: Number(score),
    title,
    tags,
  };

  scoresService.updateAssignment(Number(assignmentId), updatedAssignment);
  revalidatePath("/");
}
