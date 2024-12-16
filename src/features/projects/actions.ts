"use server";

import { revalidatePath } from "next/cache";
import { projectService } from "./instance";
import { ProjectData, UpdatedProject } from "./types";

export async function addProjectAction(project: ProjectData) {
  await projectService.add(project);
  revalidatePath("/");
}

export async function deleteProjectAction(id: string) {
  await projectService.delete(id);
  revalidatePath("/");
}
export async function updatePerformanceScoreAction(
  projectWebsite: string,
  id: string,
) {
  await projectService.updatePerformance(projectWebsite, id);
}
export async function updateDescriptionAction(updatedProject: UpdatedProject) {
  await projectService.updateDescription(updatedProject);
}

export async function revalidate() {
  revalidatePath("/");
}
