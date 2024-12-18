import { db } from "@/db";
import { createService } from "./service";
import { developerService } from "@/features";

export const iamService = createService(db, developerService.add);
