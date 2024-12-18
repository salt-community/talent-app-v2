export const ROLES = {
  admin: [
    //Background feature
    "backgrounds.add",
    "backgrounds.addSkill",
    "backgrounds.update",
    "backgrounds.updateSkills",
    "backgrounds.updateLanguages",
    "backgrounds.updateEducation",
    "backgrounds.getAll",
    "backgrounds.getById",
    "backgrounds.getSkillsById",
    "backgrounds.getLanguagesById",
    "backgrounds.getEducationById",

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
    "admin.deleteDeveloperProfile",
    "admin.updateStatus",
  ],
  developer: ["developerProfile.getAll"],

  //under construction
  core: [],
} as const;
