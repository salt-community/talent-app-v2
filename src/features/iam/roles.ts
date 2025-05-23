import {
  assignmentPermissions,
  assignments,
  cohorts,
  developerProfiles,
} from "./permissions";
import { MenuPermissions } from "./permissions/menu";

export const rolesPermissions = {
  guest: new Set([
    developerProfiles.getDeveloperProfileById,
    developerProfiles.getAllSkills,
    developerProfiles.getAllLanguages,
    developerProfiles.getAll,
    developerProfiles.getDeveloperProfileByIdentityId,
    developerProfiles.getDeveloperById,
    developerProfiles.getHighlightedDeveloperProfiles,
    developerProfiles.getDeveloperBySlug,
    assignments.getScoredAssignmentsByCohortIdAndIdentityId,
    assignments.getAssignmentBySlug,
  ]),
  admin: new Set([
    ...Object.values(developerProfiles),
    ...Object.values(assignments),
    ...Object.values(cohorts),
  ]),
  developer: new Set([
    developerProfiles.getAllLanguages,
    developerProfiles.getAllSkills,
    developerProfiles.getDeveloperProfileById,
    developerProfiles.updateDeveloperProfile,
    developerProfiles.searchDeveloperProfileIds,
    developerProfiles.searchDeveloperProfileIdsWithLLM,
    developerProfiles.addDeveloperProfile,
    developerProfiles.getDeveloperBySlug,
    developerProfiles.createDeveloperProfile,
    developerProfiles.delete,
    developerProfiles.getAllById,
    developerProfiles.getDeveloperById,
    developerProfiles.getDeveloperProfileByIdentityId,
    developerProfiles.getAll,
    developerProfiles.getCurrentUsers,
    developerProfiles.updateMissingSlugs,
    developerProfiles.getHighlightedDeveloperProfiles,
    developerProfiles.getScoredAssignmentsByIdentityId,
    developerProfiles.getAverageScoresByIdentityId,
    developerProfiles.copyDeveloperProfile,
    assignments.getAverageScoresByIdentityId,
    assignments.getAssignmentBySlug,
  ]),
  core: new Set([
    developerProfiles.getAllLanguages,
    developerProfiles.getAllSkills,
    developerProfiles.getDeveloperProfileById,
    developerProfiles.updateDeveloperProfile,
    developerProfiles.searchDeveloperProfileIds,
    developerProfiles.searchDeveloperProfileIdsWithLLM,
    developerProfiles.addDeveloperProfile,
    developerProfiles.getHighlightedDeveloperProfiles,
    developerProfiles.getDeveloperBySlug,
    developerProfiles.createDeveloperProfile,
    developerProfiles.delete,
    developerProfiles.getAllById,
    developerProfiles.getDeveloperById,
    developerProfiles.getAll,
    developerProfiles.deleteByIdentityId,
    assignments.getScoredAssignmentsByCohortIdAndIdentityId,
    assignments.createAssignment,
    assignments.getAverageScoresByIdentityId,
    assignments.getAssignmentBySlug,
    cohorts.deleteIdentityFromCohort,
  ]),
} as const;

export const rolesViewPermissions = {
  admin: new Set([
    MenuPermissions.instructorsDashboard,
    MenuPermissions.admin,
    MenuPermissions.hamburgerMenu,
    MenuPermissions.profile,
    assignmentPermissions.score,
  ]),
  core: new Set([
    MenuPermissions.admin,
    MenuPermissions.instructorsDashboard,
    MenuPermissions.hamburgerMenu,
    assignmentPermissions.score,
  ]),
  developer: new Set([
    MenuPermissions.profile,
    MenuPermissions.hamburgerMenu,
  ]),
  guest: new Set([]),
} as const;
