import { Db } from "@/db";
import { createRepository } from "./repository";
import { ProjectInsert } from "./db";
import { createClient } from "./api/api";
import { DeveloperProfile, ProjectData, UpdatedProject } from "./types";
import { extractRepositoryDetails } from "./logic";

export function createService(db: Db, getAllIdentities: DeveloperProfile) {
  const reps = createRepository(db);
  const client = createClient();
  return {
    getAllDevelopers: async () => {
      return await getAllIdentities();
    },
    getAll: async (userId: string) => {
      return await reps.getAll(userId);
    },
    add: async ({
      repository,
      description,
      projectWebsite,
      userId,
      imageUrl,
    }: ProjectData) => {
      const commits = "120";
      const issues = "52";
      let performance: string;
      if (projectWebsite.length !== 0) {
        performance = await client.testPagePerformance(projectWebsite);
      } else {
        performance = "NA";
      }

      const { username, title } = extractRepositoryDetails(repository);

      const newProject: ProjectInsert = {
        username,
        repository,
        projectWebsite,
        title,
        performance,
        description,
        issues,
        commits,
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
    updatePerformance: async (projectWebsite: string, id: string) => {
      const newPerformanceScore =
        await client.testPagePerformance(projectWebsite);
      reps.updatePerformanceScore({
        newPerformanceScore: newPerformanceScore,
        id: id,
      });
    },
  };
}
