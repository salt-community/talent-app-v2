import { db } from "./db";
import { createRepository } from "./repository";
import { createBackgroundsService } from "./service";
import { syncBackgroundSearchIndex } from "../../../meili-search";
const serviceMethods = {
  syncBackgroundSearchIndex: syncBackgroundSearchIndex,
};

export const backgroundsService = createBackgroundsService(
  createRepository(db),
  serviceMethods
);
