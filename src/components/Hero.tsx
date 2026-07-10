'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, ChevronDown } from 'lucide-react';

export function Hero({ declaration }: { declaration: any }) {
  const recipient = declaration?.recipientName || 'Divine';
  const suitor = declaration?.suitorName || 'Ton Admirateur';

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 overflow-hidden text-center">
      
      {/* Background ambient glowing orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-rose-600/10 via-pink-600/10 to-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Floating subtle romantic particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              y: Math.random() * 1000,
              x: Math.random() * 1000 - 500,
              opacity: Math.random() * 0.5 + 0.2,
              scale: Math.random() * 0.6 + 0.4
            }}
            animate={{
              y: [null, -200],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute text-rose-400/30 text-xs"
          >
            {i % 2 === 0 ? '🌸' : '✨'}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Subtitle Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-rose-500/10 border border-pink-500/30 text-pink-300 text-xs md:text-sm font-medium tracking-wide mb-8 shadow-xl backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-pink-400 animate-spin" style={{ animationDuration: '4s' }} />
          <span>Une déclaration d'évidence secrète</span>
          <Heart className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
        </motion.div>

        {/* Main Majestic Heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-script text-7xl sm:text-8xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-300 to-purple-200 mb-6 drop-shadow-2xl font-bold tracking-tight"
        >
          Pour {recipient}
        </motion.h1>

        {/* Heartfelt Quote */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-xl sm:text-2xl md:text-3xl text-pink-100/90 max-w-2xl font-light leading-relaxed mb-12 italic"
        >
          "Parce qu'il y a des prénoms qui résonnent comme une poésie, et des personnes qui illuminent tout sur leur passage."
        </motion.p>

        {/* Call to action to continue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#lettre"
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-medium text-base rounded-2xl shadow-xl shadow-pink-500/25 transition-all transform hover:scale-105 flex items-center gap-3 border border-pink-400/30 group"
          >
            <span>Découvrir ma Lettre</span>
            <Sparkles className="w-4 h-4 text-yellow-300 group-hover:rotate-45 transition-transform" />
          </a>
          
          <a
            href="#rsvp"
            className="px-8 py-4 bg-white/5 hover:bg-white/10 text-pink-200 hover:text-white font-medium text-base rounded-2xl border border-white/10 transition-all flex items-center gap-2"
          >
            <span>Aller à l'invitation</span>
            <Heart className="w-4 h-4 text-rose-400" />
          </a>
        </motion.div>

      </div>

      {/* Subtle Scroll Down Arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-pink-300/60 flex flex-col items-center gap-1 cursor-pointer"
      >
        <span className="text-xs uppercase tracking-widest font-mono">Faire défiler</span>
        <ChevronDown className="w-5 h-5 text-pink-400" />
      </motion.div>

    </section>
  );
}
