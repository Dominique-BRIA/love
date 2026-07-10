'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Star, Quote } from 'lucide-react';

export function WhyDivine({ memories }: { memories: any[] }) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const displayMemories = memories?.length ? memories : [
    {
      id: 1,
      title: "Un Prénom Prédestiné ✨",
      description: "Divine... Ce n'est pas simplement un nom, c'est l'adjectif parfait pour décrire ta grâce, ta bienveillance et l'énergie merveilleuse que tu rayonnes.",
      tag: "Évidence"
    },
    {
      id: 2,
      title: "Un Sourire Envoûtant 🌸",
      description: "Chaque fois que tu souris, c'est comme si le temps s'arrêtait. Tu as cette capacité unique d'illuminer l'atmosphère et d'apporter de la joie tout autour de toi.",
      tag: "Solaire"
    },
    {
      id: 3,
      title: "L'Élégance et l'Esprit 🦋",
      description: "Ce qui me séduit le plus, au-delà de ta beauté éclatante, c'est ta vivacité d'esprit, nos échanges intenses et cette douceur qui te caractérise.",
      tag: "Admiration"
    },
    {
      id: 4,
      title: "Notre Prochain Chapitre 🥂",
      description: "J'aimerais tant t'emmener dans un endroit féerique, partager un délicieux moment et te prouver à quel point tu comptes pour moi.",
      tag: "Futur"
    }
  ];

  return (
    <section id="histoire" className="relative py-20 px-4 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs uppercase font-mono tracking-widest bg-rose-500/10 border border-rose-500/20 text-rose-300 px-3.5 py-1.5 rounded-full">
          Le Carnet Précieux
        </span>
        <h2 className="font-script text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-300 to-purple-200 mt-4 mb-4">
          Pourquoi Toi ?
        </h2>
        <p className="font-serif text-pink-100/80 text-lg md:text-xl font-light">
          Quelques-unes des innombrables raisons pour lesquelles tu as capturé mon attention.
        </p>
      </div>

      {/* Grid of Attributes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {displayMemories.map((m, index) => (
          <motion.div
            key={m.id || index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            onClick={() => setSelectedId(selectedId === m.id ? null : m.id)}
            className={`group relative p-8 rounded-3xl transition-all duration-500 cursor-pointer backdrop-blur-xl border ${
              selectedId === m.id
                ? 'bg-gradient-to-br from-rose-600/20 via-pink-600/20 to-purple-600/20 border-pink-400 shadow-2xl shadow-pink-500/30 scale-[1.02]'
                : 'bg-white/[0.03] hover:bg-white/[0.06] border-pink-500/20 hover:border-pink-500/40 shadow-xl'
            }`}
          >
            
            {/* Top Tag & Glow */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-950/80 text-pink-300 border border-pink-500/30 tracking-wider">
                {m.tag || 'Magique'}
              </span>
              <div className="p-2 rounded-2xl bg-white/5 text-pink-400 group-hover:scale-110 transition-transform">
                {index % 4 === 0 && <Sparkles className="w-5 h-5" />}
                {index % 4 === 1 && <Heart className="w-5 h-5" />}
                {index % 4 === 2 && <Star className="w-5 h-5" />}
                {index % 4 === 3 && <Quote className="w-5 h-5" />}
              </div>
            </div>

            {/* Title */}
            <h3 className="font-serif text-2xl md:text-3xl text-white mb-4 group-hover:text-pink-200 transition-colors">
              {m.title}
            </h3>

            {/* Description */}
            <p className="text-pink-100/90 text-base md:text-lg font-light leading-relaxed">
              {m.description}
            </p>

            {/* Bottom Glow Orb */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-pink-500/5 rounded-full blur-2xl group-hover:bg-pink-500/20 transition-all pointer-events-none" />

          </motion.div>
        ))}
      </div>

    </section>
  );
}
