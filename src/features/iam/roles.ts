export const ROLES = {
  admin: [
    //Background feature
    "backgrounds.getAll",
    "backgrounds.getById",
    "backgrounds.add",
    "backgrounds.update",

    //Score feature
    "scores.addAssignment",
    "scores.getAssignmentsById",
    "scores.deleteAllAssignments",
    "scores.deleteAssignment",
    "scores.updateAssignment",

    //Project feature
    "project.getAll",
    "project.add",
    "project.updateDescription",
    "project.delete",
    "project.updatePerformance",

    //Admin feature
    "admin.getAllDeveloperProfiles",
  ],
  developer: ["developerProfile.getAll"],

  //under construction
  core: [],
} as const;
