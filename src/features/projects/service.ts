import { Db } from "@/db";
import { createRepository } from "./repository";
import { ProjectInsert } from "./db";
import { createClient } from "./api/api";
import { DeveloperProfile, ProjectData, UpdatedProject } from "./types";
import { extractRepositoryDetails } from "./logic";
import { CheckAccess } from "@/features";

export function createService(
  db: Db,
  getAllIdentities: DeveloperProfile,
  checkAccess: CheckAccess,
  checkUserAccess: (id: string) => Promise<boolean>
) {
  const reps = createRepository(db);
  const client = createClient();
  return {
    getAllDevelopers: async () => {
      return await getAllIdentities();
    },
    getAll: async (userId: string) => {
      checkAccess("project.getAll");

      const projects = await reps.getAll(userId);
      const sortedProjects = projects.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      return sortedProjects;
    },
    add: async ({
      repository,
      description,
      projectWebsite,
      userId,
      imageUrl,
    }: ProjectData) => {
      checkAccess("project.add");
      let performance: string;

      if (projectWebsite.length !== 0) {
        performance = await client.testPagePerformance(projectWebsite);
        console.log(performance);
      } else {
        performance = "NA";
      }

      const { username, titleFromUrl } = extractRepositoryDetails(repository);

      const commits = await client.getTotalOfCommits(username, titleFromUrl);
      const issues = await client.getAllIssues(username, titleFromUrl);
      const lastCommit = await client.getAllCommits(username, titleFromUrl);
      const title = titleFromUrl
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      const newProject: ProjectInsert = {
        username,
        repository,
        projectWebsite,
        title,
        performance,
        description,
        issues,
        commits,
        lastCommit,
        userId,
        imageUrl,
      };

      await reps.add(newProject);
    },
    updateDescription: async (updatedProject: UpdatedProject) => {
      checkAccess("project.updateDescription");

      await reps.update(updatedProject);
    },
    delete: async (id: string) => {
      checkAccess("project.delete");
      try {
        await reps.delete(id);
      } catch (error) {
        console.log("Error while deleting project:", error);
      }
    },
    updatePerformance: async (projectWebsite: string, id: string) => {
      const newPerformanceScore =
        await client.testPagePerformance(projectWebsite);
      reps.updatePerformanceScore({
        newPerformanceScore: newPerformanceScore,
        id: id,
      });
    },
    checkProfileAccess: async (id: string) => {
      return checkUserAccess(id);
    },
  };
}
