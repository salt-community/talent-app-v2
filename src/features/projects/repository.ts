import { Db } from "@/db";
import { eq } from "drizzle-orm";
import { UpdatedProject, UpdatedProjectData } from "./types";
import { ProjectInsert, projects } from "./schema";

export function createRepository(db: Db) {
  return {
    async getAll(userId: string) {
      return db.select().from(projects).where(eq(projects.userId, userId));
    },
    async add(project: ProjectInsert) {
      await db.insert(projects).values(project);
    },
    async update(updatedProject: UpdatedProject) {
      await db
        .update(projects)
        .set({
          description: updatedProject.description,
          imageUrl: updatedProject.imageUrl,
          imageAlt: updatedProject.imageAlt,
        })
        .where(eq(projects.id, updatedProject.id));
    },
    async delete(id: string) {
      await db.delete(projects).where(eq(projects.id, id));
    },
    async deleteProjectsByDeveloperProfileId(developerProfileId: string) {
      await db.delete(projects).where(eq(projects.userId, developerProfileId));
    },
    async updateProjectData(updatedProjectData: UpdatedProjectData) {
      await db
        .update(projects)
        .set({
          performance: updatedProjectData.newPerformanceScore,
          commits: updatedProjectData.newCommitsCount,
          issues: updatedProjectData.newIssuesCount,
          lastCommit: updatedProjectData.lastCommit,
        })
        .where(eq(projects.id, updatedProjectData.id));
    },
  };
}

export type Repository = ReturnType<typeof createRepository>;
