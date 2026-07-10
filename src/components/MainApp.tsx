'use client';

import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { WhyDivine } from './WhyDivine';
import { VirtualBouquet } from './VirtualBouquet';
import { LoveLetter } from './LoveLetter';
import { RSVPSection } from './RSVPSection';
import { LoveWall } from './LoveWall';
import { Footer } from './Footer';
import { CreatorModal } from './CreatorModal';

export function MainApp({ initialDeclaration, initialMemories }: { initialDeclaration: any; initialMemories: any[] }) {
  const [declaration, setDeclaration] = useState(initialDeclaration);
  const [memories, setMemories] = useState(initialMemories);
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0c1b] via-[#2a1124] to-[#170b21] text-[#f3e8ff] font-sans selection:bg-pink-500 selection:text-white">
      
      {/* Dynamic Navigation */}
      <Navbar declaration={declaration} />

      {/* Main Page Flow */}
      <main className="pt-8">
        <Hero declaration={declaration} />
        
        <div className="relative z-10 space-y-32 pb-20">
          <WhyDivine memories={memories} />
          <VirtualBouquet declaration={declaration} />
          <LoveLetter declaration={declaration} />
          <RSVPSection declaration={declaration} />
          <LoveWall declaration={declaration} />
        </div>
      </main>

      {/* Beautiful Poetic Footer */}
      <Footer declaration={declaration} onOpenCreator={() => setIsCreatorOpen(true)} />

      {/* Creator Dashboard Modal */}
      {isCreatorOpen && (
        <CreatorModal
          isOpen={isCreatorOpen}
          onClose={() => setIsCreatorOpen(false)}
          declaration={declaration}
        />
      )}

    </div>
  );
}
