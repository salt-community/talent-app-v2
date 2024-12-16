import { db } from "@/db";
import { createService } from "./service";

export const iamService = createService(db);
