import { db } from "@/db";
import { createRepository } from "./repository";
import { createService } from "./service";

export const dashboardService = createService(createRepository(db));
