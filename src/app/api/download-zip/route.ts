import { NextResponse } from 'next/server';
import JSZip from 'jszip';
import fs from 'fs/promises';
import path from 'path';
import { db, ensureDatabaseSchema } from '@/db';
import { loveDeclarations } from '@/db/schema';

export async function GET() {
  try {
    const zip = new JSZip();

    // Fetch the latest customized declaration. Keep ZIP export available even
    // when a remote database is still being provisioned.
    const defaultData = {
      title: "Une Déclaration Sincère",
      suitorName: "Ton Admirateur Secret",
      recipientName: "Divine",
      loveLetter: "Divine,\n\nDepuis le premier instant où mes yeux se sont posés sur toi...",
      dateIdea: "Un dîner sous les étoiles",
    };

    let customData: typeof defaultData | (typeof loveDeclarations.$inferSelect) = defaultData;
    try {
      await ensureDatabaseSchema();
      const decls = await db.select().from(loveDeclarations);
      customData = decls[0] || defaultData;
    } catch (error) {
      console.warn('Database unavailable during ZIP export, using defaults:', error);
    }

    // Helper to add file from file system
    const addFileToZip = async (filePath: string, zipPath: string) => {
      try {
        const fullPath = path.join(process.cwd(), filePath);
        const content = await fs.readFile(fullPath);
        zip.file(zipPath, content);
      } catch (err) {
        console.warn(`Could not include file ${filePath}:`, err);
      }
    };

    // Add Vercel 1-click & custom README
    const readmeContent = `# 💖 Site de Déclaration pour ${customData.recipientName}

Ce magnifique site Next.js Fullstack (App Router + Tailwind + Drizzle ORM) a été personnalisé avec amour pour ${customData.recipientName} par ${customData.suitorName}.

## 🚀 Déploiement Gratuit sur Vercel en 2 minutes

1. Extrayez ce dossier \`.zip\` sur votre ordinateur.
2. Glissez-déposez le dossier complet (ou initialisez un dépôt GitHub) sur [Vercel](https://vercel.com/new).
3. Connectez votre base de données PostgreSQL (ex: Vercel Postgres ou Neon) dans les variables d'environnement Vercel (\`DATABASE_URL\`).
4. Cliquez sur **Deploy** ! Vous aurez votre lien en direct en quelques secondes pour l'envoyer à ${customData.recipientName} !
`;
    zip.file('README.md', readmeContent);

    // List of core files to bundle
    const filesToInclude = [
      'package.json',
      'tsconfig.json',
      'next.config.ts',
      'postcss.config.mjs',
      'eslint.config.mjs',
      'drizzle.config.ts',
      'src/app/globals.css',
      'src/app/layout.tsx',
      'src/app/page.tsx',
      'src/app/api/health/route.ts',
      'src/app/api/declarations/route.ts',
      'src/app/api/memories/route.ts',
      'src/app/api/messages/route.ts',
      'src/db/index.ts',
      'src/db/schema.ts',
    ];

    for (const f of filesToInclude) {
      await addFileToZip(f, f);
    }

    // Also include any new UI components we build in src/components
    const componentsDir = path.join(process.cwd(), 'src/components');
    try {
      const compFiles = await fs.readdir(componentsDir);
      for (const cf of compFiles) {
        await addFileToZip(`src/components/${cf}`, `src/components/${cf}`);
      }
    } catch {
      // Ignore if components dir not found or empty
    }

    const zipBuffer = await zip.generateAsync({ type: 'arraybuffer' });

    return new NextResponse(zipBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="site-declaration-${customData.recipientName.toLowerCase()}-nextjs.zip"`,
      },
    });
  } catch (error) {
    console.error('Error generating zip export:', error);
    return NextResponse.json({ error: 'Failed to generate zip file' }, { status: 500 });
  }
}
