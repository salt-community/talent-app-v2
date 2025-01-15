import { developerProfilesService } from "../developer-profiles/instance";
import { createService } from "./service";

export type Project = {
  id: string;
  userId: string;
  username: string;
  repository: string;
  title: string;
  imageUrl: string | null;
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
};

export type UpdatedProject = {
  id: string;
  description: string;
  imageUrl: string;
};
export type UpdatedPerformance = {
  id: string;
  newPerformanceScore: string;
};

export type DeveloperProfile = typeof developerProfilesService.getAll;

export type ProjectsService = ReturnType<typeof createService>;
