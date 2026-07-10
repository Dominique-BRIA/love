import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/db";
import { loveResponses } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const responses = await db
      .select()
      .from(loveResponses)
      .orderBy(desc(loveResponses.createdAt));

    return NextResponse.json(responses);
  } catch (error) {
    console.error("Error fetching legacy love responses:", error);
    return NextResponse.json(
      { error: "Impossible de récupérer les réponses" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const [inserted] = await db
      .insert(loveResponses)
      .values({
        prenom: body.prenom ?? body.name ?? body.nom ?? "Divine",
        nom: body.nom ?? null,
        name: body.name ?? body.prenom ?? "Divine",
        reponse: body.reponse ?? body.response ?? body.answer ?? "oui",
        response: body.response ?? body.reponse ?? body.answer ?? "yes",
        answer: body.answer ?? body.reponse ?? body.response ?? "yes",
        message: body.message ?? body.divineReply ?? null,
        contact: body.contact ?? body.telephone ?? body.phone ?? body.instagram ?? null,
        phone: body.phone ?? body.telephone ?? null,
        telephone: body.telephone ?? body.phone ?? null,
        instagram: body.instagram ?? null,
        accepted: true,
      })
      .returning();

    return NextResponse.json(inserted, { status: 201 });
  } catch (error) {
    console.error("Error saving legacy love response:", error);
    return NextResponse.json(
      { error: "Impossible d'enregistrer la réponse" },
      { status: 500 }
    );
  }
}
