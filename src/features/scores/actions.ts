"use server";
import { revalidateTag } from "next/cache";
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

  await scoresService.addAssignment(newAssignment);
  revalidateTag("assignments");
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

  await scoresService.updateAssignment(Number(assignmentId), updatedAssignment);
  revalidateTag("assignments");
}
