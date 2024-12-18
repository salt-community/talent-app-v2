import { db } from "@/db";
import { createService } from "./service";
import { developerService } from "../developer-profiles";

export const iamService = createService(db, developerService.add);
