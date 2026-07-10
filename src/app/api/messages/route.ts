import { NextResponse } from 'next/server';
import { db, ensureDatabaseSchema } from '@/db';
import { loveMessages } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';

export async function GET() {
  try {
    await ensureDatabaseSchema();
    let messages = await db.select().from(loveMessages).orderBy(desc(loveMessages.createdAt));

    if (messages.length === 0) {
      const defaultMessages = [
        {
          author: "Ton Admirateur",
          message: "Divine, j'ai créé ce petit recueil numérique spécialement pour toi. J'espère qu'il te fera sourire autant que tu me fais sourire ! 💖",
          heartCount: 5,
        },
        {
          author: "Cupidon 🏹",
          message: "Il paraît que ces deux-là feraient le couple le plus magnifique de l'année... Je pose ça là !",
          heartCount: 12,
        }
      ];

      await db.insert(loveMessages).values(defaultMessages);
      messages = await db.select().from(loveMessages).orderBy(desc(loveMessages.createdAt));
    }

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureDatabaseSchema();
    const body = await request.json();
    const { action, id, author, message } = body;

    if (action === 'heart') {
      const [msg] = await db.select().from(loveMessages).where(eq(loveMessages.id, id));
      if (!msg) return NextResponse.json({ error: 'Not found' }, { status: 404 });

      const [updated] = await db.update(loveMessages)
        .set({ heartCount: (msg.heartCount || 0) + 1 })
        .where(eq(loveMessages.id, id))
        .returning();
      return NextResponse.json(updated);
    }

    if (action === 'create') {
      const [inserted] = await db.insert(loveMessages).values({
        author: author || 'Anonyme',
        message,
        heartCount: 1,
      }).returning();
      return NextResponse.json(inserted);
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error updating message:', error);
    return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
  }
}
