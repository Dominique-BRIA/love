'use client';

import React from 'react';
import { Heart, Sparkles, Crown } from 'lucide-react';

export function Footer({ declaration, onOpenCreator }: { declaration: any; onOpenCreator: () => void }) {
  const recipient = declaration?.recipientName || 'Divine';
  const suitor = declaration?.suitorName || 'Ton Admirateur';

  return (
    <footer className="relative z-10 py-16 px-4 mt-20 border-t border-rose-500/20 bg-black/40 backdrop-blur-xl text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        <div className="flex items-center gap-2 text-2xl font-script text-pink-300 mb-6">
          <Sparkles className="w-5 h-5 text-yellow-300" />
          <span>Une poésie numérique dédiée à {recipient}</span>
        </div>

        <p className="font-serif text-pink-100/70 text-sm max-w-md leading-relaxed mb-8">
          Créé avec une immense passion, d'innombrables battements de cœur et un soupçon de magie par {suitor}.
        </p>

        {/* Action helper */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400">
          <span>© {new Date().getFullYear()} Pour {recipient}. Tous droits réservés au cœur.</span>
          
          <button
            onClick={onOpenCreator}
            className="flex items-center gap-1.5 text-pink-400 hover:text-pink-300 transition-colors font-medium cursor-pointer"
          >
            <Crown className="w-3.5 h-3.5 text-yellow-300" />
            <span>Mode Suprême Admirateur (Export .ZIP)</span>
          </button>
        </div>

      </div>
    </footer>
  );
}
