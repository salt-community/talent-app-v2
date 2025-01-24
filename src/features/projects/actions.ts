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
export async function updateCommitsAction(
  user: string,
  repo: string,
  id: string
) {
  await projectsService.updateCommits({ user, repo, id });
}
export async function updateIssuesAction(
  user: string,
  repo: string,
  id: string
) {
  await projectsService.updateIssues({ user, repo, id });
}
export async function updateLastCommitAction(
  user: string,
  repo: string,
  id: string
) {
  await projectsService.updateLastCommit({ user, repo, id });
}
export async function updateDescriptionAction(updatedProject: UpdatedProject) {
  await projectsService.updateDescription(updatedProject);
}

export async function revalidate() {
  revalidatePath("/");
}
