import JSZip from 'jszip';

export async function generateDivineZip(data: {
  suitorName: string;
  recipientName: string;
  title: string;
  loveLetter: string;
  dateIdea: string;
}) {
  const zip = new JSZip();

  // 1. README with Vercel deployment instructions
  const readmeContent = `# 💖 Site de Déclaration pour ${data.recipientName}

Ce magnifique projet a été généré spécialement pour courtiser **${data.recipientName}**.

## 🚀 Comment déployer sur Vercel en 2 minutes (Gratuit)

1. **Option A : Déploiement direct Next.js**
   - Créez un compte gratuit sur [Vercel](https://vercel.com).
   - Installez Vercel CLI ou poussez ce projet sur un dossier GitHub.
   - Sur Vercel, cliquez sur **Add New Project** > Choisissez votre GitHub repo.
   - Laissez les réglages par défaut (Framework: Next.js) et cliquez sur **Deploy**.
   - En 2 minutes, vous obtenez un lien magique (ex: \`pour-divine.vercel.app\`) à envoyer à ${data.recipientName} !

2. **Option B : Version Standalone Universelle (HTML/CSS/JS directe)**
   - Ouvrez le fichier \`divine-interactive-love.html\` inclus dans ce ZIP.
   - Vous pouvez l'héberger en 1 clic et gratuitement sur [Netlify Drop](https://app.netlify.com/drop) ou [Vercel](https://vercel.com) en glissant-déposant le dossier !

---
Fait avec beaucoup d'amour et de poésie pour conquérir le cœur de ${data.recipientName}. 💕
`;

  zip.file('LISEZ-MOI_GUIDE_DEPLOIEMENT.md', readmeContent);

  // 2. Standalone fully beautiful interactive HTML version
  const standaloneHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.title} - Pour ${data.recipientName}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;600&family=Dancing+Script:wght@700&display=swap');
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: linear-gradient(135deg, #0f0c1b 0%, #2a1124 50%, #170b21 100%);
      color: #f3e8ff;
      overflow-x: hidden;
    }
    .font-serif { font-family: 'Playfair Display', serif; }
    .font-script { font-family: 'Dancing Script', cursive; }
    .glass-card {
      background: rgba(255, 255, 255, 0.04);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(244, 114, 182, 0.2);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), inset 0 0 2px rgba(255, 255, 255, 0.2);
    }
    .glow-pink {
      box-shadow: 0 0 30px rgba(236, 72, 153, 0.4);
    }
  </style>
</head>
<body class="min-h-screen pb-20">
  <!-- Starry Background Background -->
  <div class="fixed inset-0 pointer-events-none opacity-40">
    <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl"></div>
    <div class="absolute top-2/3 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
  </div>

  <div class="relative max-w-4xl mx-auto px-4 pt-16 text-center">
    <!-- Header -->
    <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-pink-300 text-sm mb-8">
      ✨ Une déclaration unique pour une personne unique
    </div>

    <h1 class="font-script text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-400 to-purple-300 mb-6">
      Pour ${data.recipientName}
    </h1>

    <p class="font-serif text-xl md:text-2xl text-pink-100 max-w-2xl mx-auto font-light leading-relaxed mb-16">
      "À celle qui illumine mon monde avec sa grâce et l'éclat de son sourire..."
    </p>

    <!-- Interactive Love Envelope -->
    <div class="glass-card rounded-3xl p-8 md:p-12 text-left max-w-2xl mx-auto mb-16 relative overflow-hidden group border-rose-500/30">
      <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-pink-500/10 rounded-full blur-2xl"></div>
      
      <div class="flex items-center justify-between mb-6 border-b border-pink-500/20 pb-4">
        <span class="font-script text-3xl text-pink-400">Lettre à mon Évidence</span>
        <span class="text-xs text-purple-300 uppercase tracking-widest bg-purple-950/60 px-3 py-1 rounded-full border border-purple-500/30">Confidentiel</span>
      </div>

      <div class="font-serif text-lg md:text-xl text-rose-100/90 whitespace-pre-line leading-relaxed mb-8">
        ${data.loveLetter}
      </div>

      <div class="text-right">
        <p class="text-sm text-purple-300 tracking-wider">Avec toute ma tendresse,</p>
        <p class="font-script text-3xl text-pink-400 mt-1">${data.suitorName}</p>
      </div>
    </div>

    <!-- The RSVP Invitation -->
    <div class="glass-card rounded-3xl p-8 md:p-12 max-w-xl mx-auto text-center border-pink-500/40 glow-pink" id="rsvp-section">
      <h3 class="font-serif text-2xl md:text-3xl text-white mb-4">
        La Grande Question... 💍
      </h3>
      <p class="text-pink-200 mb-8 font-light leading-relaxed">
        ${data.recipientName}, m'accorderais-tu l'honneur d'un rendez-vous pour partager ${data.dateIdea} ?
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 relative min-h-[70px]" id="buttons-container">
        <button onclick="acceptDate()" class="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 font-semibold text-white rounded-2xl shadow-lg hover:shadow-pink-500/50 transition-all duration-300 transform hover:scale-105">
          Oui, avec grand plaisir ! 💕
        </button>
        <button onmouseover="dodgeNo(this)" onclick="dodgeNo(this)" class="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-pink-300 font-medium rounded-2xl transition-all duration-200 cursor-pointer" id="no-btn">
          Non 🙈
        </button>
      </div>
    </div>

    <!-- Success Container (Hidden) -->
    <div id="success-message" class="hidden glass-card rounded-3xl p-12 max-w-xl mx-auto text-center border-green-500/40">
      <div class="text-6xl mb-6">🥂🎉🌹</div>
      <h3 class="font-script text-5xl text-pink-400 mb-4">C'est un Oui magique !</h3>
      <p class="text-pink-100 text-lg mb-6">
        Tu viens de faire de ${data.suitorName} la personne la plus heureuse de la Terre !
      </p>
      <div class="p-4 bg-purple-950/60 rounded-2xl border border-pink-500/30 text-pink-200 font-light">
        Prépare-toi pour un moment mémorable. J'ai tellement hâte de te voir. ✨
      </div>
    </div>
  </div>

  <script>
    function dodgeNo(btn) {
      btn.style.position = 'absolute';
      const container = document.getElementById('buttons-container');
      const maxLeft = container.clientWidth - btn.clientWidth;
      const maxTop = container.clientHeight - btn.clientHeight + 100;
      
      const randomLeft = Math.floor(Math.random() * (maxLeft > 0 ? maxLeft : 200)) - 100;
      const randomTop = Math.floor(Math.random() * 150) - 75;

      btn.style.transform = \`translate(\${randomLeft}px, \${randomTop}px)\`;
      btn.innerText = "Oops, tu as glissé ! 😅";
    }

    function acceptDate() {
      document.getElementById('rsvp-section').classList.add('hidden');
      document.getElementById('success-message').classList.remove('hidden');

      // Trigger Confetti
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#f472b6', '#fb7185', '#c084fc', '#e879f9', '#ffd700']
      });

      setTimeout(() => {
        confetti({
          particleCount: 100,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#f472b6', '#fb7185', '#ffd700']
        });
        confetti({
          particleCount: 100,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#c084fc', '#e879f9', '#ffd700']
        });
      }, 400);
    }
  </script>
</body>
</html>`;

  zip.file('divine-interactive-love.html', standaloneHtml);

  // Generate zip blob
  const blob = await zip.generateAsync({ type: 'blob' });
  return blob;
}
