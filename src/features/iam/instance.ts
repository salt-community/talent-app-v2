import { db } from "@/db";
import { createRepository } from "./repository";
import { createService } from "./service";

export const iamService = createService(createRepository(db));
