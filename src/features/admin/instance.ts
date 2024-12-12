import { db } from "@/db";
import { createAdminService } from "./service";

export const adminService = createAdminService(db);
