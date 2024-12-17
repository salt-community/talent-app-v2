import { db } from "@/db";
import { createRepository } from "./repository";
import { createBackgroundsService } from "./service";
import { addBackgroundSearchIndex } from "@/lib/meili-search";
const serviceMethods = {
  addToSearchIndex: addBackgroundSearchIndex,
};

export const backgroundsService = createBackgroundsService(
  createRepository(db),
  serviceMethods
);
