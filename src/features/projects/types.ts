import { developerService } from "../developer-profiles/instance";

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

export type DeveloperProfile = typeof developerService.getAll;
