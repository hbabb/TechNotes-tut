import { env } from "@/env/server";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";

if (env.NODE_ENV === "development") {
  config({ path: ".env.local" });
}

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const sql = neon(env.DATABASE_URL!);

// logger
// const db = drizzle(sql, { logger: true })
const db = drizzle(sql);

export { db };
