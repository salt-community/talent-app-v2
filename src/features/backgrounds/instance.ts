import { db } from "./db";
import { createRepository } from "./repository";
import { createBackgroundsService } from "./service";
import { syncBackgroundSearchIndex } from "../../../meili-search";
import { iamService } from "@/features";
const serviceMethods = {
  syncBackgroundSearchIndex: syncBackgroundSearchIndex,
};

export const backgroundsService = createBackgroundsService(
  createRepository(db),
  serviceMethods,
  iamService.checkAccess
);

export const mockBackgroundsService = createBackgroundsService(
  createRepository(db),
  serviceMethods,
  async function checkAcces(permission: string): Promise<void> {
    if (permission) {
      return;
    }
    return;
  }
);
