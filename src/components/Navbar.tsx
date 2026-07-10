'use client';

import React, { useState } from 'react';
import { Heart, Sparkles, Download, Settings, Flower2, Mail, MessageSquareQuote, Crown } from 'lucide-react';
import { AudioPlayer } from './AudioPlayer';
import { CreatorModal } from './CreatorModal';

export function Navbar({ declaration }: { declaration: any }) {
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between bg-black/40 backdrop-blur-xl px-6 py-3 rounded-full border border-rose-500/20 shadow-2xl shadow-purple-950/40">
          
          {/* Logo / Divine Branding */}
          <a href="#" className="flex items-center gap-2 text-xl font-bold tracking-tight text-white group">
            <span className="p-2 bg-gradient-to-tr from-pink-500 to-rose-500 rounded-full text-white shadow-lg shadow-pink-500/30 group-hover:scale-110 transition-transform">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="font-serif text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-300 to-purple-200">
              Pour {declaration?.recipientName || 'Divine'}
            </span>
          </a>

          {/* Desktop Anchor Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-pink-100/80">
            <a href="#histoire" className="hover:text-rose-300 transition-colors flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-rose-400" />
              Pourquoi Toi
            </a>
            <a href="#bouquet" className="hover:text-rose-300 transition-colors flex items-center gap-1.5">
              <Flower2 className="w-3.5 h-3.5 text-pink-400" />
              Bouquet Éternel
            </a>
            <a href="#lettre" className="hover:text-rose-300 transition-colors flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-purple-400" />
              Ma Déclaration
            </a>
            <a href="#rsvp" className="hover:text-rose-300 transition-colors flex items-center gap-1.5 bg-gradient-to-r from-rose-500/20 to-pink-500/20 px-3 py-1 rounded-full border border-rose-500/30 text-rose-200">
              <Sparkles className="w-3.5 h-3.5 animate-spin text-yellow-300" />
              L'Invitation
            </a>
            <a href="#mots-doux" className="hover:text-rose-300 transition-colors flex items-center gap-1.5">
              <MessageSquareQuote className="w-3.5 h-3.5 text-blue-400" />
              Mots Doux
            </a>
          </nav>

          {/* Controls: Audio & Creator Port */}
          <div className="flex items-center gap-3">
            <AudioPlayer />

            <button
              onClick={() => setIsCreatorOpen(true)}
              className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold px-3.5 py-2.5 rounded-full shadow-lg shadow-purple-600/30 transition-all transform hover:scale-105 border border-purple-400/30 cursor-pointer"
              title="Espace Admirateur (Personnalisation & Export .ZIP)"
            >
              <Crown className="w-4 h-4 text-yellow-300 animate-bounce" />
              <span className="hidden sm:inline">Espace Admirateur</span>
            </button>
          </div>

        </div>
      </header>

      {/* Creator Modal */}
      {isCreatorOpen && (
        <CreatorModal
          isOpen={isCreatorOpen}
          onClose={() => setIsCreatorOpen(false)}
          declaration={declaration}
        />
      )}
    </>
  );
}
