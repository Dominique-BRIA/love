import { NextResponse } from 'next/server';
import { db, ensureDatabaseSchema } from '@/db';
import { loveDeclarations } from '@/db/schema';
import { eq } from 'drizzle-orm';

// Get the main love declaration (or create default if not exists)
export async function GET() {
  try {
    await ensureDatabaseSchema();
    let declarations = await db.select().from(loveDeclarations);
    
    if (declarations.length === 0) {
      // Seed default declaration
      const [inserted] = await db.insert(loveDeclarations).values({
        title: "Une Déclaration Sincère",
        suitorName: "Ton Admirateur Secret",
        recipientName: "Divine",
        loveLetter: "Divine,\n\nDepuis le premier instant où mes yeux se sont posés sur toi, quelque chose a changé en moi. Ton prénom reflète à la perfection l'élégance de ta personne, la douceur de ta voix et l'éclat de ton sourire.\n\nChaque moment passé à tes côtés ou à penser à toi est un véritable rayon de soleil. Je n'ai plus envie de garder ce sentiment silencieux. Tu es celle que mon cœur a choisie.\n\nVeux-tu m'accorder le privilège de t'écrire un nouveau chapitre ensemble ?",
        dateIdea: "Un dîner sous les étoiles ou un café chaleureux, là où tu préfères.",
      }).returning();
      declarations = [inserted];
    }
    
    return NextResponse.json(declarations[0]);
  } catch (error) {
    console.error('Error fetching declaration:', error);
    return NextResponse.json({ error: 'Failed to fetch declaration' }, { status: 500 });
  }
}

// Update declaration or submit RSVP from Divine
export async function POST(request: Request) {
  try {
    await ensureDatabaseSchema();
    const body = await request.json();
    const { id, action, rsvpAnswer, divineReply, divinePhoneOrInsta, ...updateFields } = body;
    
    if (action === 'rsvp') {
      const updated = await db.update(loveDeclarations)
        .set({
          rsvpAnswer,
          divineReply,
          divinePhoneOrInsta,
          respondedAt: new Date(),
        })
        .where(eq(loveDeclarations.id, id))
        .returning();
      return NextResponse.json(updated[0]);
    }

    if (action === 'update_content') {
      const updated = await db.update(loveDeclarations)
        .set({
          ...updateFields,
        })
        .where(eq(loveDeclarations.id, id))
        .returning();
      return NextResponse.json(updated[0]);
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error updating declaration:', error);
    return NextResponse.json({ error: 'Failed to update declaration' }, { status: 500 });
  }
}
