import React from 'react';
import { db } from "@/db";
import { loveDeclarations, romanticMemories } from "@/db/schema";
import { asc } from "drizzle-orm";
import { MainApp } from '@/components/MainApp';

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // 1. Fetch Declaration
  let declarations = await db.select().from(loveDeclarations);
  if (declarations.length === 0) {
    // Seed default declaration
    const [inserted] = await db.insert(loveDeclarations).values({
      title: "Une Déclaration Sincère",
      suitorName: "Ton Admirateur Secret",
      recipientName: "Divine",
      loveLetter: "Divine,\n\nDepuis le premier instant où mes yeux se sont posés sur toi, quelque chose a changé en moi. Ton prénom reflète à la perfection l'élégance de ta personne, la douceur de ta voix et l'éclat de ton sourire.\n\nChaque moment passé à tes côtés ou à penser à toi est un véritable rayon de soleil. Je n'ai plus envie de garder ce sentiment silencieux. Tu es celle que mon cœur a choisie.\n\nVeux-tu m'accorder le privilège de t'écrire un nouveau chapitre ensemble ?",
      dateIdea: "un dîner sous les étoiles ou un café chaleureux",
    }).returning();
    declarations = [inserted];
  }

  // 2. Fetch Memories / Reasons
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

  return <MainApp initialDeclaration={declarations[0]} initialMemories={memories} />;
}
