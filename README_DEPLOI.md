# Site “Pour Divine”

Ce projet est un site Next.js prêt pour Vercel, conçu comme une déclaration élégante et interactive pour Divine.

## Déploiement rapide sur Vercel

1. Pousse le projet sur GitHub, GitLab ou Bitbucket.
2. Dans Vercel, clique sur **Add New Project** puis importe le dépôt.
3. Framework détecté : **Next.js**.
4. Déploie.

## Option fullstack

Le site contient une route API qui peut enregistrer la réponse de Divine dans PostgreSQL via Drizzle ORM.

Si tu veux activer l’enregistrement persistant sur Vercel, ajoute une variable d’environnement :

```text
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

Sans `DATABASE_URL`, l’interface reste pleinement utilisable et affiche quand même un retour doux côté utilisateur.

## Personnalisation

Tu peux modifier les textes principaux dans :

- `src/app/components/LoveExperience.tsx`
- `src/app/layout.tsx` pour les métadonnées de partage

Le design et les animations globales sont dans :

- `src/app/globals.css`
