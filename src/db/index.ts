import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

export const client = new Pool({
  connectionString: process.env.DATABASE_URL_2,
});

export const db = drizzle({ client });

export type Db = typeof db;
