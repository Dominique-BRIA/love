import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required");
}

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

export const pool =
  globalForDb.__arenaNextJsPostgresqlPool ??
  new Pool({
    connectionString: databaseUrl,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__arenaNextJsPostgresqlPool = pool;
}

export const db = drizzle(pool, { schema });
export { schema };

let schemaSetupPromise: Promise<void> | null = null;

/**
 * Create the application tables on first runtime access.
 * Vercel does not run `drizzle-kit push` during deployment, so this makes a
 * fresh Neon/Vercel Postgres database immediately usable after DATABASE_URL
 * is configured.
 */
export function ensureDatabaseSchema() {
  if (!schemaSetupPromise) {
    schemaSetupPromise = pool
      .query(`
        CREATE TABLE IF NOT EXISTS love_declarations (
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          suitor_name TEXT NOT NULL DEFAULT 'Ton Admirateur',
          recipient_name TEXT NOT NULL DEFAULT 'Divine',
          love_letter TEXT NOT NULL,
          rsvp_answer TEXT,
          divine_reply TEXT,
          divine_contact TEXT,
          date_idea TEXT,
          opened_at TIMESTAMP,
          responded_at TIMESTAMP,
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS romantic_memories (
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          date TEXT,
          description TEXT NOT NULL,
          tag TEXT DEFAULT 'Magique',
          category TEXT DEFAULT 'moment',
          display_order INTEGER DEFAULT 0,
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS love_messages (
          id SERIAL PRIMARY KEY,
          author TEXT NOT NULL,
          message TEXT NOT NULL,
          heart_count INTEGER DEFAULT 1,
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS love_responses (
          id SERIAL PRIMARY KEY,
          prenom TEXT,
          nom TEXT,
          name TEXT,
          reponse TEXT,
          response TEXT,
          answer TEXT,
          message TEXT,
          contact TEXT,
          phone TEXT,
          telephone TEXT,
          instagram TEXT,
          accepted BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
        );
      `)
      .then(() => undefined)
      .catch((error) => {
        schemaSetupPromise = null;
        throw error;
      });
  }

  return schemaSetupPromise;
}
