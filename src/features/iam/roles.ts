import {
  scores,
  projects,
  admins,
  backgrounds,
  developerProfiles,
} from "./permissions";

export const rolesPermissions = {
  guest: new Set([
    backgrounds.getPostById,
    backgrounds.getAllPosts,
    backgrounds.getBackgroundByDevId,
    backgrounds.getAllSkills,
    backgrounds.getAllLanguages,
    backgrounds.getAllEducations,
    backgrounds.editAccess,
    projects.checkProfileAccess,
    projects.getAll,
    developerProfiles.getById,
    developerProfiles.getHighlightedDevIds,
  ]),
  admin: new Set([
    ...Object.values(backgrounds),
    ...Object.values(projects),
    ...Object.values(developerProfiles),
    ...scores,
    ...admins,
  ]),
  developer: new Set([
    scores[0],
    scores[1],
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
    backgrounds.getBackgroundByDevId,
    backgrounds.update,
    projects.add,
    projects.checkProfileAccess,
    projects.delete,
    projects.getAll,
    projects.updateDescription,
    projects.updatePerformance,
    developerProfiles.getById,
    developerProfiles.getHighlightedDevIds,
    developerProfiles.add,
    developerProfiles.createDeveloperProfile,
    developerProfiles.delete,
    developerProfiles.getAllById,
    developerProfiles.getById,
    developerProfiles.getDeveloperById,
    developerProfiles.getPublishedOrHighlightedDevIds,
    developerProfiles.getIdentityIdByDeveloperProfileId
  ]),
  core: new Set([
    backgrounds.getAllBackgrounds,
    backgrounds.getAllDeveloperProfilesById,
    backgrounds.getAllEducations,
    backgrounds.getAllLanguages,
    backgrounds.getAllPosts,
    backgrounds.getAllSkills,
    backgrounds.getBackgroundByDevId,
    backgrounds.update,
    projects.checkProfileAccess,
    projects.updateDescription,
    projects.updatePerformance,
    projects.getAll,
    developerProfiles.getById,
    developerProfiles.getHighlightedDevIds,
    developerProfiles.add,
    developerProfiles.createDeveloperProfile,
    developerProfiles.delete,
    developerProfiles.getAllById,
    developerProfiles.getById,
    developerProfiles.getDeveloperById,
    developerProfiles.getPublishedOrHighlightedDevIds,
  ]),
} as const;
