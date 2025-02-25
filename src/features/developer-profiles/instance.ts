import { db } from "@/db";

import { createDeveloperProfilesService } from "./service";
import { iamService, secureService } from "../iam";
// import { createBackgroundsService } from "./background-service";
// import { createRepository } from "./background-repository";
// import { createSearchApi } from "./backgrounds/backgrounds-search";

export const insecureDeveloperProfilesService = createDeveloperProfilesService(
  db,
  iamService.getCurrentUser
);

export const developerProfilesService = secureService(
  "developerProfiles",
  insecureDeveloperProfilesService
);

export function getDeveloperProfilesService() {
  return developerProfilesService;
}

// const insecureBackgroundsService = createBackgroundsService(
//   createRepository(db),
//   createSearchApi({
//     indexUid: "backgrounds",
//     primaryKey: "developerProfileId",
//     displayedAttributes: ["developerProfileId"],
//     searchableAttributes: [
//       "skills",
//       "educations",
//       "languages",
//       "name",
//       "title",
//       "bio",
//     ],
//   })
// );

// export const backgroundsService = secureService(
//   "backgrounds",
//   insecureBackgroundsService
// );
