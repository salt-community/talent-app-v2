"use server";

import { revalidatePath } from "next/cache";
import { projectsService } from "./instance";
import { ProjectData, UpdatedProject } from "./types";

export async function addProjectAction(project: ProjectData) {
  await projectsService.add(project);
  revalidatePath("/");
}

export async function deleteProjectAction(id: string) {
  await projectsService.delete(id);
  revalidatePath("/");
}
export async function updatePerformanceScoreAction(
  projectWebsite: string,
  id: string
) {
  await projectsService.updatePerformance({ projectWebsite, id });
}
export async function updateDescriptionAction(updatedProject: UpdatedProject) {
  await projectsService.updateDescription(updatedProject);
}

export async function revalidate() {
  revalidatePath("/");
}
