import { db } from "@/db";
import { createRepository } from "./repository";
import { createBackgroundsService } from "./service";

export const backgroundsService = createBackgroundsService(
  createRepository(db)
);
