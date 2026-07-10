import { loveResponses } from "@/db/schema";
import { sql } from "drizzle-orm";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

type LoveResponsePayload = {
  answer?: unknown;
  note?: unknown;
};

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return null;
  }

  const cleaned = value.trim().slice(0, maxLength);
  return cleaned.length > 0 ? cleaned : null;
}

async function getDbWithTable() {
  const { db } = await import("@/db");

  await db.execute(sql`
    create table if not exists love_responses (
      id serial primary key,
      answer text not null,
      note text,
      created_at timestamp with time zone not null default now()
    )
  `);

  return db;
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json().catch(() => ({}))) as LoveResponsePayload;
    const answer = cleanText(payload.answer, 80) ?? "reponse_divine";
    const note = cleanText(payload.note, 500);

    if (!process.env.DATABASE_URL) {
      return Response.json({
        ok: true,
        persisted: false,
        message: "Réponse reçue avec douceur, sans base de données configurée.",
      });
    }

    const db = await getDbWithTable();

    await db.insert(loveResponses).values({
      answer,
      note,
    });

    return Response.json({ ok: true, persisted: true });
  } catch (error) {
    console.error("love-response-error", error);

    return Response.json(
      {
        ok: false,
        message:
          "La réponse n’a pas pu être enregistrée, mais l’intention reste intacte.",
      },
      { status: 500 },
    );
  }
}
