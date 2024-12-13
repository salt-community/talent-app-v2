import { db } from "@/db";
import { createService } from "./service";
import { dashboardService } from "../identity-access-management/instance";

export const projectService = createService(
  db,
  dashboardService.getAllIdentities
);
