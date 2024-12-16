"use server";
import { revalidatePath } from "next/cache";
import { scoresService } from "./instance";
import { getFormData } from "./utils";

export async function addAssignmentAction(formData: FormData) {
  const { title, comment, score, tags } = getFormData(formData);
 
  const newAssignment = {
    userId: 1,
    comment,
    score: Number(score),
    title,
    tags,
  };

  scoresService.addAssignment(newAssignment);
  revalidatePath("/");
}

export async function editAssignmentAction(formData: FormData) {
  const userId = formData.get("userId") as string;
  const assignmentId = formData.get("assignmentId") as string;
  const { title, comment, score, tags } = getFormData(formData);

  const updatedAssignment = {
    userId: Number(userId),
    comment,
    score: Number(score),
    title,
    tags,
  };

  scoresService.updateAssignment(Number(assignmentId), updatedAssignment);
  revalidatePath("/");
}
