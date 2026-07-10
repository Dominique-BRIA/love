# 🚀 Guide Vercel Express — Obtenir ton lien magique pour Divine en 2 minutes

Objectif : déployer ce site Next.js romantique sur Vercel et obtenir un lien du type :

```txt
https://pour-divine.vercel.app
```

---

## ✅ Étape 1 — Mets le projet sur GitHub

1. Décompresse le fichier `.zip` du site si tu l’as téléchargé depuis l’**Espace Admirateur**.
2. Crée un nouveau dépôt GitHub, par exemple :
   ```txt
   pour-divine
   ```
3. Envoie tous les fichiers du projet dans ce dépôt.

💡 Astuce : si tu veux aller vite, tu peux aussi utiliser l’import GitHub Desktop ou le bouton “Upload files” sur GitHub.

---

## ✅ Étape 2 — Importe le projet dans Vercel

1. Va sur :
   ```txt
   https://vercel.com/new
   ```
2. Connecte ton compte GitHub.
3. Sélectionne le dépôt `pour-divine`.
4. Vercel détecte automatiquement **Next.js**.
5. Clique sur **Deploy**.

À ce stade, Vercel va construire le site et te donner une première URL publique.

---

## ✅ Étape 3 — Ajoute PostgreSQL puis redéploie

Comme le site enregistre la réponse de Divine, ses messages et ses cœurs dans une base de données, il faut ajouter `DATABASE_URL`.

Option recommandée : **Neon PostgreSQL** ou **Vercel Postgres / Marketplace Postgres**.

1. Dans Vercel, ouvre ton projet.
2. Va dans **Storage** ou **Integrations**.
3. Ajoute une base PostgreSQL, par exemple Neon.
4. Copie l’URL de connexion PostgreSQL.
5. Va dans :
   ```txt
   Project Settings > Environment Variables
   ```
6. Ajoute :
   ```txt
   DATABASE_URL=postgresql://...
   ```
7. Sauvegarde, puis clique sur **Redeploy**.

Après le redéploiement, ton site est prêt.

---

## 💖 Dernière touche — Personnalise ton lien

Dans Vercel :

```txt
Project Settings > Domains
```

Tu peux choisir un sous-domaine Vercel comme :

```txt
pour-divine.vercel.app
ma-lettre-pour-divine.vercel.app
une-flamme-pour-divine.vercel.app
```

Ensuite, copie le lien et envoie-lui un message doux :

> Divine, j’ai créé quelque chose rien que pour toi. Prends ton temps, ouvre ce lien quand tu seras tranquille… 💖
>
> https://pour-divine.vercel.app

---

## 🛠️ Si la base de données n’a pas encore les tables

Après avoir configuré `DATABASE_URL`, lance localement ou via un terminal connecté au projet :

```bash
npx drizzle-kit push
```

Cela crée les tables nécessaires pour :

- la déclaration d’amour ;
- la réponse de Divine ;
- les messages du mur des mots doux ;
- les souvenirs / qualités affichés sur le site.

---

## 🎯 Résumé ultra-rapide

1. **GitHub** : mets le projet dans un dépôt.
2. **Vercel** : importe le dépôt et clique sur Deploy.
3. **PostgreSQL** : ajoute `DATABASE_URL`, redéploie, puis envoie le lien à Divine.

Et voilà : ton lien magique est prêt à conquérir son cœur. 🌹
