import { faker } from "@faker-js/faker";
import { roles } from "./schema";
import { createService } from "./service";
import { createRepository } from "./repository";
import { db } from "@/db";

const service = createService(createRepository(db));
export async function seedIdentities() {}
