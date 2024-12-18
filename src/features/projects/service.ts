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
  checkAccess: CheckAccess
) {
  const reps = createRepository(db);
  const client = createClient();
  return {
    getAllDevelopers: async () => {
      return await getAllIdentities();
    },
    getAll: async (userId: string) => {
      checkAccess("project.getAll");
      return await reps.getAll(userId);
    },
    add: async ({
      repository,
      description,
      projectWebsite,
      userId,
      imageUrl,
    }: ProjectData) => {
      checkAccess("project.add");
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
      checkAccess("project.updatePerformance");
      const newPerformanceScore =
        await client.testPagePerformance(projectWebsite);
      reps.updatePerformanceScore({
        newPerformanceScore: newPerformanceScore,
        id: id,
      });
    },
  };
}
