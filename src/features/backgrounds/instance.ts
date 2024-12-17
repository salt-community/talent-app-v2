import { db } from "@/db";
import { createRepository } from "./repository";
import { createBackgroundsService } from "./service";
import { addBackgroundSearchIndex } from "../../../meili-search";
const serviceMethods = {
  addBackgroundSearchIndex: addBackgroundSearchIndex,
};

export const backgroundsService = createBackgroundsService(
  createRepository(db),
  serviceMethods
);
