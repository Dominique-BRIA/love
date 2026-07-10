import { db, ensureDatabaseSchema } from "@/db";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await ensureDatabaseSchema();
    await db.execute(sql`select 1`);
    return Response.json({ ok: true, database: "ready", schema: "ready" });
  } catch (error) {
    console.error("Healthcheck failed:", error);
    return Response.json(
      { ok: false, database: "unavailable" },
      { status: 500 }
    );
  }
}
