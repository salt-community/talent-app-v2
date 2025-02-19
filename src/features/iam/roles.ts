import {
  assignments,
  projects,
  admins,
  backgrounds,
  developerProfiles,
  cohorts,
  projectPermissions,
} from "./permissions";

export const rolesPermissions = {
  guest: new Set([
    backgrounds.getPostById,
    backgrounds.getAllPosts,
    backgrounds.getBackgroundByDeveloperProfileId,
    backgrounds.getAllSkills,
    backgrounds.getAllLanguages,
    backgrounds.getAllEducations,
    backgrounds.getAllDeveloperProfile,
    backgrounds.editAccess,
    projects.checkProfileAccess,
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
    ...admins,
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
    projects.checkProfileAccess,
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
    projects.checkProfileAccess,
    projects.updateDescription,
    projects.updateProjectData,
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
  admin: new Set([projectPermissions.edit]),
  core: new Set([projectPermissions.edit]),
  developer: new Set([]),
  guest: new Set([]),
} as const;
