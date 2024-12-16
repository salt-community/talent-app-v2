import { db } from "@/db";
import { createService } from "./service";
import { iamService } from "../iam/instance";

export const projectService = createService(db, iamService.getAllIdentities);
