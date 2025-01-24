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
export async function updateProjectDataAction(
  id: string,
export async function updateProjectDataAction(
  id: string,
  projectWebsite: string,
  user: string,
  repo: string,
) {
  await projectsService.updateProjectData({ id,projectWebsite, user, repo });
}
export async function updateDescriptionAction(updatedProject: UpdatedProject) {
  await projectsService.updateDescription(updatedProject);
}

export async function revalidate() {
  revalidatePath("/");
}
