// import { createRepository } from "./background-repository";
// import { createBackgroundsService } from "../background-service";
// import { createSearchApi } from "./backgrounds-search";
// import { db } from "@/db";
// import { secureService } from "@/features/iam";

// export const insecureBackgroundsService = createBackgroundsService(
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
