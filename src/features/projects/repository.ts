import { Db } from "@/db";
import { ProjectInsert, projects } from "./db";
import { eq } from "drizzle-orm";
import { UpdatedPerformance, UpdatedProject } from "./types";

export function createRepository(db: Db) {
  return {
    async getAll(userId: string) {
      return db.select().from(projects).where(eq(projects.userId, userId));
    },
    add: async (project: ProjectInsert) => {
      await db.insert(projects).values(project);
    },
    update: async (updatedProject: UpdatedProject) => {
      await db
        .update(projects)
        .set({
          description: updatedProject.description,
          imageUrl: updatedProject.imageUrl,
        })
        .where(eq(projects.id, updatedProject.id));
    },
    delete: async (id: string) => {
      await db.delete(projects).where(eq(projects.id, id));
    },
    updatePerformanceScore: async (updatedPerformance: UpdatedPerformance) => {
      await db
        .update(projects)
        .set({
          performance: updatedPerformance.newPerformanceScore,
        })
        .where(eq(projects.id, updatedPerformance.id));
    },
  };
}

export type Repository = ReturnType<typeof createRepository>;
