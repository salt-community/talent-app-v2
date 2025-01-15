import { db } from "@/db";

import { createDevelopersService } from "./service";

export const developerProfilesService = createDevelopersService(db);
