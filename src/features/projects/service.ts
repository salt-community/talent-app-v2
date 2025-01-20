import { Db } from "@/db";
import { createRepository } from "./repository";
import { ProjectInsert } from "./db";
import { createClient } from "./api/api";
import { DeveloperProfile, ProjectData, UpdatedProject } from "./types";
import { extractRepositoryDetails } from "./logic";

export function createService(
  db: Db,
  getAllIdentities: DeveloperProfile,
  getIdentityIdByDeveloperProfileId: (id: string) => Promise<string | null>,
  checkUserAccess: (id: string) => Promise<boolean>
) {
  const reps = createRepository(db);
  const client = createClient();
  return {
    getAllDevelopers: async () => {
      return await getAllIdentities();
    },
    getAll: async (userId: string) => {
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
      const lastCommit = await client.getLastCommit(username, titleFromUrl);
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
      await reps.update(updatedProject);
    },
    delete: async (id: string) => {
      try {
        await reps.delete(id);
      } catch (error) {
        console.log("Error while deleting project:", error);
      }
    },
    updatePerformance: async (args: { projectWebsite: string; id: string }) => {
      const newPerformanceScore = await client.testPagePerformance(
        args.projectWebsite
      );
      reps.updatePerformanceScore({
        newPerformanceScore: newPerformanceScore,
        id: args.id,
      });
    },
    checkProfileAccess: async (developerProfileId: string) => {
      const identityId =
        await getIdentityIdByDeveloperProfileId(developerProfileId);

      if (!identityId) {
        return false;
      }

      return checkUserAccess(identityId);
    },
  };
}
