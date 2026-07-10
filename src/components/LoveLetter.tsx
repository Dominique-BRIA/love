'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Sparkles, Heart, Check, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';

export function LoveLetter({ declaration }: { declaration: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const recipient = declaration?.recipientName || 'Divine';
  const suitor = declaration?.suitorName || 'Ton Admirateur';
  const loveLetterText = declaration?.loveLetter || `Divine,\n\nDepuis le premier instant où mes yeux se sont posés sur toi, quelque chose a changé en moi. Ton prénom reflète à la perfection l'élégance de ta personne, la douceur de ta voix et l'éclat de ton sourire.\n\nChaque moment passé à tes côtés ou à penser à toi est un véritable rayon de soleil. Je n'ai plus envie de garder ce sentiment silencieux. Tu es celle que mon cœur a choisie.\n\nVeux-tu m'accorder le privilège de t'écrire un nouveau chapitre ensemble ?`;

  const openLetter = () => {
    if (!isOpen) {
      setIsOpen(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f472b6', '#fb7185', '#c084fc', '#ffd700', '#e879f9']
      });
    }
  };

  const copyText = () => {
    navigator.clipboard.writeText(loveLetterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="lettre" className="relative py-24 px-4 max-w-4xl mx-auto text-center">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <span className="text-xs uppercase font-mono tracking-widest bg-purple-500/10 border border-purple-500/20 text-purple-300 px-3.5 py-1.5 rounded-full">
        Confidentiel
      </span>
      <h2 className="font-script text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-300 to-purple-200 mt-4 mb-4">
        La Déclaration de Flamme
      </h2>
      <p className="font-serif text-pink-100/80 text-lg md:text-xl font-light mb-12">
        Une missive scellée qui attendait le moment propice pour être lue.
      </p>

      {/* Sealed Interactive Envelope Container */}
      {!isOpen ? (
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={openLetter}
          className="relative max-w-md mx-auto h-72 bg-gradient-to-br from-purple-950 via-rose-950 to-purple-950 rounded-3xl p-8 border-2 border-pink-500/40 shadow-2xl shadow-pink-500/20 cursor-pointer flex flex-col items-center justify-center group overflow-hidden"
        >
          {/* Envelope fold visual lines */}
          <div className="absolute inset-0 border-t-8 border-r-8 border-pink-500/10 transform rotate-45 translate-y-12 pointer-events-none" />
          <div className="absolute inset-0 border-b-8 border-l-8 border-purple-500/10 transform -rotate-45 -translate-y-12 pointer-events-none" />

          {/* Glowing Wax Seal */}
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-24 h-24 bg-gradient-to-tr from-rose-600 to-pink-500 rounded-full shadow-2xl shadow-rose-500/60 flex items-center justify-center text-white border-2 border-yellow-300/60 font-script text-4xl mb-4 group-hover:rotate-12 transition-transform"
          >
            {recipient[0]}
          </motion.div>

          <span className="font-serif text-xl text-pink-200 group-hover:text-white transition-colors">
            Pour les yeux de {recipient}
          </span>
          <span className="text-xs text-pink-400 font-light mt-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Clique pour briser le sceau
          </span>
        </motion.div>
      ) : (
        /* The Unfolded Parchment Paper */
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative max-w-2xl mx-auto bg-gradient-to-b from-purple-950/80 via-black/80 to-purple-950/80 backdrop-blur-2xl rounded-3xl p-8 md:p-14 text-left border border-pink-500/40 shadow-2xl shadow-pink-500/30"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent" />

          <div className="flex items-center justify-between mb-8 pb-6 border-b border-pink-500/20">
            <div>
              <span className="text-xs uppercase tracking-widest text-purple-300 block font-mono">Destinataire</span>
              <h3 className="font-script text-4xl text-pink-300 mt-1">{recipient}</h3>
            </div>
            <div className="p-3 bg-pink-500/10 rounded-2xl border border-pink-500/30 text-rose-400">
              <Mail className="w-6 h-6" />
            </div>
          </div>

          <div className="font-serif text-lg md:text-xl text-rose-100/90 whitespace-pre-line leading-relaxed mb-12">
            {loveLetterText}
          </div>

          <div className="flex items-end justify-between pt-6 border-t border-pink-500/20">
            <button
              onClick={copyText}
              className="flex items-center gap-2 text-xs text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 px-4 py-2.5 rounded-xl border border-white/10 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Texte copié !' : 'Copier la lettre'}
            </button>

            <div className="text-right">
              <span className="text-xs uppercase tracking-widest text-purple-300 block font-mono">Signé avec passion</span>
              <p className="font-script text-3xl text-pink-400 mt-1">{suitor}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Button to reseal if already open */}
      {isOpen && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsOpen(false)}
          className="mt-8 text-xs text-pink-300 hover:text-pink-200 underline font-light cursor-pointer"
        >
          Refermer l'enveloppe
        </motion.button>
      )}

    </section>
  );
}
