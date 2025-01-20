import { db } from "@/db";
import { createService } from "./service";
//import { developerProfilesService } from "@/features/developer-profiles/instance";


export const iamService = createService(db);
