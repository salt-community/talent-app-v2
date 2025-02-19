import {
  assignments,
  projects,
  admins,
  backgrounds,
  developerProfiles,
  cohorts,
  projectPermissions,
} from "./permissions";
import { MenuPermissions } from "./permissions/menu";

export const rolesPermissions = {
  guest: new Set([
    backgrounds.getPostById,
    backgrounds.getAllPosts,
    backgrounds.getBackgroundByDeveloperProfileId,
    backgrounds.getAllSkills,
    backgrounds.getAllLanguages,
    backgrounds.getAllEducations,
    backgrounds.getAllDeveloperProfile,
    projects.getAll,
    developerProfiles.getById,
    developerProfiles.getAll,
    developerProfiles.getHighlightedDeveloperProfileIds,
    developerProfiles.getIdentityIdByDeveloperProfileId,
    developerProfiles.getDeveloperProfileByIdentityId,
    assignments.getAssignmentsByCohortId,
  ]),
  admin: new Set([
    ...Object.values(backgrounds),
    ...Object.values(projects),
    ...Object.values(developerProfiles),
    ...Object.values(assignments),
    ...Object.values(cohorts),
    ...Object.values(admins),
  ]),
  developer: new Set([
    backgrounds.add,
    backgrounds.addDeveloperBackground,
    backgrounds.createDeveloperProfile,
    backgrounds.deleteDeveloperProfile,
    backgrounds.getAllBackgrounds,
    backgrounds.getAllDeveloperProfilesById,
    backgrounds.getAllEducations,
    backgrounds.getAllLanguages,
    backgrounds.getAllPosts,
    backgrounds.getAllSkills,
    backgrounds.getBackgroundByDeveloperProfileId,
    backgrounds.update,
    backgrounds.searchDeveloperProfileIds,
    backgrounds.getAllDeveloperProfile,
    backgrounds.GetCurrentUsers,
    projects.add,
    projects.hasCurrentUserAccess,
    projects.delete,
    projects.getAll,
    projects.getAllDevelopers,
    projects.updateDescription,
    projects.updateProjectData,
    developerProfiles.getById,
    developerProfiles.getHighlightedDeveloperProfileIds,
    developerProfiles.add,
    developerProfiles.createDeveloperProfile,
    developerProfiles.delete,
    developerProfiles.getAllById,
    developerProfiles.getById,
    developerProfiles.getDeveloperById,
    developerProfiles.getPublishedOrHighlightedDeveloperProfileIds,
    developerProfiles.getIdentityIdByDeveloperProfileId,
    developerProfiles.getDeveloperProfileByIdentityId,
    developerProfiles.getAll,
    assignments.getAssignmentsByCohortId,
    assignments.getScoresByIdentityId,
  ]),
  core: new Set([
    admins.deleteUser,
    admins.updateRole,
    backgrounds.getAllBackgrounds,
    backgrounds.getAllDeveloperProfilesById,
    backgrounds.getAllEducations,
    backgrounds.getAllLanguages,
    backgrounds.getAllPosts,
    backgrounds.getAllSkills,
    backgrounds.getBackgroundByDeveloperProfileId,
    backgrounds.update,
    backgrounds.searchDeveloperProfileIds,
    backgrounds.getAllDeveloperProfile,
    backgrounds.getAllDeveloperProfilesById,
    backgrounds.deleteBackgroundById,
    projects.updateDescription,
    projects.updateProjectData,
    projects.hasCurrentUserAccess,
    projects.getAll,
    projects.getAllDevelopers,
    projects.deleteProjectsByDeveloperProfileId,
    developerProfiles.getById,
    developerProfiles.getHighlightedDeveloperProfileIds,
    developerProfiles.add,
    developerProfiles.createDeveloperProfile,
    developerProfiles.delete,
    developerProfiles.getAllById,
    developerProfiles.getById,
    developerProfiles.getDeveloperById,
    developerProfiles.getPublishedOrHighlightedDeveloperProfileIds,
    developerProfiles.getAll,
    developerProfiles.deleteByIdentityId,
    assignments.getAssignmentsByCohort,
    assignments.getAssignmentsByCohortId,
    assignments.getAssignmentById,
    assignments.createAssignment,
    assignments.deleteAssignmentScoreById,
    cohorts.getAllUnassignedDevelopers,
    cohorts.addDeveloperToCohort,
    cohorts.deleteCohortIdentity,
  ]),
} as const;

export const rolesViewPermissions = {
  admin: new Set([
    projectPermissions.edit,
    MenuPermissions.instructorsDashboard,
    MenuPermissions.admin,
  ]),
  core: new Set([MenuPermissions.admin, MenuPermissions.instructorsDashboard]),
  developer: new Set([projectPermissions.edit, MenuPermissions.profile]),
  guest: new Set([]),
} as const;
