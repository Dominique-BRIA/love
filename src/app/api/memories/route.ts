import { NextResponse } from 'next/server';
import { db, ensureDatabaseSchema } from '@/db';
import { romanticMemories } from '@/db/schema';
import { asc } from 'drizzle-orm';

export async function GET() {
  try {
    await ensureDatabaseSchema();
    let memories = await db.select().from(romanticMemories).orderBy(asc(romanticMemories.displayOrder));

    if (memories.length === 0) {
      const defaultMemories = [
        {
          title: "Un Prénom Prédestiné ✨",
          description: "Divine... Ce n'est pas simplement un nom, c'est l'adjectif parfait pour décrire ta grâce, ta bienveillance et l'énergie merveilleuse que tu rayonnes.",
          tag: "Évidence",
          category: "reason",
          displayOrder: 1,
        },
        {
          title: "Un Sourire Envoûtant 🌸",
          description: "Chaque fois que tu souris, c'est comme si le temps s'arrêtait. Tu as cette capacité unique d'illuminer l'atmosphère et d'apporter de la joie tout autour de toi.",
          tag: "Solaire",
          category: "reason",
          displayOrder: 2,
        },
        {
          title: "L'Élégance et l'Esprit 🦋",
          description: "Ce qui me séduit le plus, au-delà de ta beauté éclatante, c'est ta vivacité d'esprit, nos échanges et cette douceur qui te caractérise.",
          tag: "Admiration",
          category: "reason",
          displayOrder: 3,
        },
        {
          title: "Notre Prochain Chapitre 🥂",
          description: "J'aimerais tant t'emmener dans un endroit féerique, partager un délicieux moment et te prouver à quel point tu comptes pour moi.",
          tag: "Futur",
          category: "dream",
          displayOrder: 4,
        }
      ];

      await db.insert(romanticMemories).values(defaultMemories);
      memories = await db.select().from(romanticMemories).orderBy(asc(romanticMemories.displayOrder));
    }

    return NextResponse.json(memories);
  } catch (error) {
    console.error('Error fetching memories:', error);
    return NextResponse.json({ error: 'Failed to fetch memories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureDatabaseSchema();
    const body = await request.json();
    const { title, description, tag, category } = body;

    const [inserted] = await db.insert(romanticMemories).values({
      title,
      description,
      tag: tag || 'Souvenir',
      category: category || 'moment',
      displayOrder: 10,
    }).returning();

    return NextResponse.json(inserted);
  } catch (error) {
    console.error('Error adding memory:', error);
    return NextResponse.json({ error: 'Failed to add memory' }, { status: 500 });
  }
}
