"use server";
import { scoresService } from "./instance";

export async function addAssigmentAction(formData: FormData) {
  const title = formData.get("title") as string;
  const comment = formData.get("comment") as string;
  const score = formData.get("score") as string;
  const tags: string[] = [];
  const individualCommunication = formData.get(
    "individualCommunication"
  ) as string;
  if(individualCommunication) tags.push("individualCommunication")

  const teamCollaboration = formData.get("teamCollaboration") as string;
  if(teamCollaboration) tags.push("teamCollaboration")

  const management = formData.get("management") as string;
  if(management) tags.push("management")

  const design = formData.get("design") as string;
  if(design) tags.push("design")

  const backend = formData.get("backend") as string;
  if(backend) tags.push("backend")

  const frontend = formData.get("frontend") as string;
  if(frontend) tags.push("frontend")


  const newAssignment = {
    userId: 1,
    comment,
    score: Number(score),
    title, 
    tags,
  };

  scoresService.addAssignment( newAssignment );
}
