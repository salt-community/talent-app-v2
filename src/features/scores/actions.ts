"use server";
import { revalidatePath } from "next/cache";
import { scoresService } from "./instance";
import { AssignmentUpdates } from "./types";

export async function addAssigmentAction(formData: FormData) {
  const title = formData.get("title") as string;
  const comment = formData.get("comment") as string;
  const score = formData.get("score") as string;
  const tags: string[] = [];

  const conversation = formData.get("conversation") as string;
  if (conversation) tags.push("conversation");

  const teamCollaboration = formData.get("teamCollaboration") as string;
  if (teamCollaboration) tags.push("teamCollaboration");

  const management = formData.get("management") as string;
  if (management) tags.push("management");

  const design = formData.get("design") as string;
  if (design) tags.push("design");

  const backend = formData.get("backend") as string;
  if (backend) tags.push("backend");

  const frontend = formData.get("frontend") as string;
  if (frontend) tags.push("frontend");

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

export async function editAssigmentAction(formData: FormData) {
  const title = formData.get("title") as string;
  const userId = formData.get("userId") as string;

  const updatedAssignment: AssignmentUpdates = {
    title,
    userId: Number(userId),
  };

  const assignmentId = formData.get("assignmentId") as string;

  const comment = !formData.get("comment")
    ? null
    : (formData.get("comment") as string);
  if (comment) updatedAssignment["comment"] = comment;

  const score = !formData.get("score")
    ? null
    : (formData.get("score") as string);
  if (score) updatedAssignment["score"] = Number(score);

  const tags: string[] = [];

  const conversation = formData.get("conversation") as string;
  if (conversation) tags.push("conversation");

  const teamCollaboration = formData.get("teamCollaboration") as string;
  if (teamCollaboration) tags.push("teamCollaboration");

  const management = formData.get("management") as string;
  if (management) tags.push("management");

  const design = formData.get("design") as string;
  if (design) tags.push("design");

  const backend = formData.get("backend") as string;
  if (backend) tags.push("backend");

  const frontend = formData.get("frontend") as string;
  if (frontend) tags.push("frontend");

  updatedAssignment["tags"] = tags;

  scoresService.updateAssignment(Number(assignmentId), updatedAssignment);
  revalidatePath("/");
}
