'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flower2, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export function VirtualBouquet({ declaration }: { declaration: any }) {
  const [bloomedFlowers, setBloomedFlowers] = useState<number[]>([]);
  const [activeMessage, setActiveMessage] = useState<string | null>(null);

  const flowers = [
    {
      id: 1,
      name: "La Rose Solaire 🌹",
      title: "Pour ton Éclat",
      quote: "Ton sourire est ma récompense préférée. Il parvient à dissiper le moindre nuage dans ma journée."
    },
    {
      id: 2,
      name: "La Pivoine Délicate 🌸",
      title: "Pour ta Douceur",
      quote: "Chaque mot que nous échangeons est empreint d'une bienveillance qui me touche droit au cœur."
    },
    {
      id: 3,
      name: "L'Orchidée Royale 🦋",
      title: "Pour ton Élégance",
      quote: "Tu te déplaces dans ce monde avec une grâce fascinante qui ne cesse d'attirer mon regard."
    },
    {
      id: 4,
      name: "Le Lys Éternel ✨",
      title: "Pour ton Esprit",
      quote: "Ton intelligence et ta perspicacité rendent chaque discussion absolument captivante."
    },
    {
      id: 5,
      name: "Le Bleuet Rêveur 💫",
      title: "Pour notre Complicité",
      quote: "J'ai l'impression que nous pourrions conquérir le monde ensemble, ou simplement rire de tout."
    },
    {
      id: 6,
      name: "La Fleur d'Or 👑",
      title: "Parce que tu es Divine",
      quote: "Tu es la définition absolue de ton prénom. Une véritable merveille."
    }
  ];

  const bloomFlower = (id: number, quote: string, e: React.MouseEvent) => {
    if (!bloomedFlowers.includes(id)) {
      setBloomedFlowers([...bloomedFlowers, id]);
      
      // Mini flower confetti at click position
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 30,
        spread: 60,
        origin: { x, y },
        colors: ['#f472b6', '#fb7185', '#c084fc', '#ffd700']
      });
    }

    setActiveMessage(quote);
  };

  const recipient = declaration?.recipientName || 'Divine';

  return (
    <section id="bouquet" className="relative py-20 px-4 max-w-5xl mx-auto text-center">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <span className="text-xs uppercase font-mono tracking-widest bg-pink-500/10 border border-pink-500/20 text-pink-300 px-3.5 py-1.5 rounded-full">
        Jardin Interactif
      </span>
      <h2 className="font-script text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-300 to-purple-200 mt-4 mb-4">
        Le Bouquet Virtuel Éternel
      </h2>
      <p className="font-serif text-pink-100/80 text-lg md:text-xl font-light max-w-xl mx-auto mb-16">
        Clique sur les bourgeons de ce jardin pour les faire éclore et découvrir un secret sur ce que j'admire chez toi.
      </p>

      {/* Flowers Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-8 mb-12">
        {flowers.map((f) => {
          const isBloomed = bloomedFlowers.includes(f.id);
          return (
            <motion.div
              key={f.id}
              whileHover={{ scale: 1.05, y: -5 }}
              onClick={(e) => bloomFlower(f.id, f.quote, e)}
              className={`p-6 md:p-8 rounded-3xl backdrop-blur-xl border transition-all duration-500 cursor-pointer flex flex-col items-center justify-center relative group ${
                isBloomed
                  ? 'bg-gradient-to-b from-rose-500/20 to-purple-500/20 border-pink-400/60 shadow-xl shadow-pink-500/20'
                  : 'bg-white/[0.03] hover:bg-white/[0.08] border-white/10 hover:border-pink-500/30'
              }`}
            >
              
              {/* Flower Visual Icon */}
              <div className="relative mb-4">
                <motion.div
                  animate={{
                    rotate: isBloomed ? [0, 10, -10, 0] : 0,
                    scale: isBloomed ? 1.3 : 1
                  }}
                  transition={{ duration: 0.5 }}
                  className="text-5xl sm:text-6xl filter drop-shadow-md transition-transform"
                >
                  {isBloomed ? f.name.slice(-2) : '🌱'}
                </motion.div>

                {isBloomed && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -top-1 -right-1 text-pink-400 bg-black/40 p-1 rounded-full border border-pink-500/30"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                  </motion.div>
                )}
              </div>

              <span className="font-serif text-white font-medium text-lg mb-1">
                {isBloomed ? f.name.slice(0, -2) : 'Bourgeon Secret'}
              </span>

              <span className={`text-xs font-light tracking-wide px-2.5 py-1 rounded-full transition-colors ${
                isBloomed ? 'text-pink-300 bg-pink-500/20 border border-pink-500/30' : 'text-gray-400 bg-white/5'
              }`}>
                {isBloomed ? f.title : 'Clique pour faire éclore'}
              </span>

            </motion.div>
          );
        })}
      </div>

      {/* Quote Revealer Banner */}
      <AnimatePresence mode="wait">
        {activeMessage && (
          <motion.div
            key={activeMessage}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="p-8 md:p-10 rounded-3xl bg-gradient-to-r from-pink-500/15 via-purple-500/15 to-rose-500/15 border border-pink-400/40 shadow-2xl backdrop-blur-2xl max-w-2xl mx-auto relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 text-8xl pointer-events-none font-script">
              {recipient[0]}
            </div>

            <Heart className="w-8 h-8 text-rose-400 mx-auto mb-4 animate-bounce" />
            <p className="font-serif text-xl md:text-2xl text-rose-100 italic leading-relaxed">
              "{activeMessage}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Complete Garden Progress */}
      <div className="mt-8 text-sm text-pink-200/60 font-light">
        {bloomedFlowers.length === flowers.length ? (
          <span className="text-pink-300 font-medium flex items-center justify-center gap-1.5 animate-pulse">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            Le jardin complet a éclos pour toi. Quelle splendeur ! 🌹
          </span>
        ) : (
          <span>Fleurs découvertes : {bloomedFlowers.length} / {flowers.length}</span>
        )}
      </div>

    </section>
  );
}
