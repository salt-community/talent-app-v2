import { Db } from "@/db";
import { createRepository } from "./repository";
import { ProjectInsert } from "./db";
import { Api } from "./api";
import { DeveloperProfile, ProjectData, UpdatedProject } from "./types";
import { extractRepositoryDetails } from "./logic";
import { ViewPermission } from "../iam/permissions";

export function createService(
  db: Db,
  api: Api,
  getAllIdentities: DeveloperProfile,
  getIdentityIdByDeveloperProfileId: (id: string) => Promise<string | null>,
  hasCurrentUserAccess: (id: ViewPermission) => Promise<boolean>
) {
  const reps = createRepository(db);

  return {
    getAllDevelopers: async () => {
      return await getAllIdentities();
    },
    getAll: async (developerProfileId: string) => {
      const projects = await reps.getAll(developerProfileId);
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
      imageAlt,
    }: ProjectData) => {
      let performance: string;

      if (projectWebsite.length !== 0) {
        performance = await api.testPagePerformance(projectWebsite);
      } else {
        performance = "NA";
      }

      const { username, titleFromUrl } = extractRepositoryDetails(repository);

      const commits = await api.getTotalOfCommits(username, titleFromUrl);
      const issues = await api.getAllIssues(username, titleFromUrl);
      const lastCommit = await api.getLastCommit(username, titleFromUrl);
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
        imageAlt,
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
    deleteProjectsByDeveloperProfileId: async (developerProfileId: string) => {
      await reps.deleteProjectsByDeveloperProfileId(developerProfileId);
    },
    updateProjectData: async (args: {
      id: string;
      projectWebsite: string;
      user: string;
      repo: string;
    }) => {
      const [newPerformanceScore, newCommitsCount, newIssuesCount, lastCommit] =
        await Promise.all([
          api.testPagePerformance(args.projectWebsite),
          api.getTotalOfCommits(args.user, args.repo),
          api.getAllIssues(args.user, args.repo),
          api.getLastCommit(args.user, args.repo),
        ]);
      reps.updateProjectData({
        id: args.id,
        newPerformanceScore: newPerformanceScore,
        newCommitsCount: newCommitsCount,
        newIssuesCount: newIssuesCount,
        lastCommit: lastCommit,
      });
    },
    hasCurrentUserAccess: async (permission: ViewPermission) => {
      return hasCurrentUserAccess(permission);
    },
  };
}
