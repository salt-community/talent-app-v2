import { db } from "@/db";
import { createDeveloperService } from "./service";

export const developerService = createDeveloperService(db);
