import { client } from "@/db";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import * as relations from "./relations.schema";

export const db = drizzle({ client, schema: { ...schema, ...relations } });

export type DB = typeof db;
