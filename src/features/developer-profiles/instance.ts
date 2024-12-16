import { db } from "@/db";
import { createDevelopersService } from "./service";

export const developerService = createDevelopersService(db);
