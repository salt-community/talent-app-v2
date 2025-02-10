import { developerProfilesService } from "../developer-profiles/instance";
import { createService } from "./service";

export type Project = {
  id: string;
  userId: string;
  username: string;
  repository: string;
  title: string;
  imageUrl: string | null;
  imageAlt: string | null;
  projectWebsite: string | null;
  performance: string;
  description: string;
  commits: string;
  lastCommit: string | null;
  issues: string;
};

export type ProjectData = {
  repository: string;
  description: string;
  projectWebsite: string;
  userId: string;
  imageUrl?: string;
  imageAlt?:string
};

export type UpdatedProject = {
  id: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
};

export type UpdatedProjectData = {
  id: string;
  newPerformanceScore: string;
  newCommitsCount: string;
  newIssuesCount: string;
  lastCommit: string;
};

export type DeveloperProfile = typeof developerProfilesService.getAll;

export type ProjectsService = ReturnType<typeof createService>;
