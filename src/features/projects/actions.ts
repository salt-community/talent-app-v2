"use server";

import { revalidatePath } from "next/cache";
import { projectService } from "./instance";
import { ProjectData, UpdatedProject } from "./types";

export async function addProjectAction(project: ProjectData) {
  await projectService.add(project);
  revalidatePath("/");
}

export async function updateAction(updatedProject: UpdatedProject) {
  await projectService.update(updatedProject);
  revalidatePath("/");
}

export async function deleteAction(id: string) {
  await projectService.delete(id);
  revalidatePath("/");
}
export async function updatePerformanceScore(
  projectWebsite: string,
  id: string
) {
  await projectService.updatePerformance(projectWebsite, id);
  revalidatePath("/");
}
