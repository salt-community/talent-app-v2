import { client } from "@/db";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

const db = drizzle({ client, schema });

export type DB = typeof db;
