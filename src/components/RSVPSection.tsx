'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, CheckCircle2, Send, RefreshCw, Smartphone, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';

export function RSVPSection({ declaration }: { declaration: any }) {
  const [rsvpAnswered, setRsvpAnswered] = useState(declaration?.rsvpAnswer === 'yes');
  const [divineContact, setDivineContact] = useState(declaration?.divinePhoneOrInsta || '');
  const [divineNote, setDivineNote] = useState(declaration?.divineReply || '');
  const [submitting, setSubmitting] = useState(false);
  const [submittedContact, setSubmittedContact] = useState(!!declaration?.divinePhoneOrInsta);

  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [noClicks, setNoClicks] = useState(0);

  const recipient = declaration?.recipientName || 'Divine';
  const suitor = declaration?.suitorName || 'Ton Admirateur';
  const dateIdea = declaration?.dateIdea || 'un dîner sous les étoiles ou un café chaleureux';

  const noPhrases = [
    "Non 🙈",
    "Oops, ça glisse ! 😅",
    "Essaye encore ! 😜",
    "Le destin dit non au non ! ✨",
    "Tu t'approches du bouton rose... 💕",
    "C'est physiquement impossible ! 🙈"
  ];

  const handleDodge = () => {
    // Generate random offsets
    const randomX = Math.floor(Math.random() * 260) - 130;
    const randomY = Math.floor(Math.random() * 160) - 80;

    setNoButtonPos({ x: randomX, y: randomY });
    setNoClicks((prev) => (prev + 1) % noPhrases.length);
  };

  const handleYes = async () => {
    setRsvpAnswered(true);

    // Multi-stage spectacular confetti
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#f472b6', '#fb7185', '#c084fc', '#ffd700', '#e879f9']
    });

    setTimeout(() => {
      confetti({
        particleCount: 120,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors: ['#f472b6', '#fb7185', '#ffd700']
      });
      confetti({
        particleCount: 120,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors: ['#c084fc', '#e879f9', '#ffd700']
      });
    }, 400);

    // Initial silent save to database
    try {
      await fetch('/api/declarations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'rsvp',
          id: declaration?.id || 1,
          rsvpAnswer: 'yes',
        }),
      });
    } catch {
      // ignore
    }
  };

  const handleConfirmContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/declarations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'rsvp',
          id: declaration?.id || 1,
          rsvpAnswer: 'yes',
          divinePhoneOrInsta: divineContact,
          divineReply: divineNote,
        }),
      });

      if (res.ok) {
        setSubmittedContact(true);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.5 },
        });
      }
    } catch (err) {
      console.error('Error recording contact:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="relative py-24 px-4 max-w-4xl mx-auto text-center">
      
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Glassmorphic Container */}
      <div className="relative bg-gradient-to-br from-purple-900/30 via-rose-900/20 to-black/40 backdrop-blur-2xl rounded-3xl p-8 md:p-16 border-2 border-pink-500/40 shadow-2xl shadow-pink-500/20 overflow-hidden">
        
        {!rsvpAnswered ? (
          <div>
            <span className="text-xs uppercase font-mono tracking-widest bg-rose-500/20 border border-rose-500/30 text-rose-300 px-4 py-1.5 rounded-full inline-block mb-6">
              L'Invitation Magique 🥂
            </span>
            
            <h2 className="font-script text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-300 to-purple-200 mb-6">
              Alors {recipient}... Qu'en dis-tu ?
            </h2>

            <p className="font-serif text-pink-100 text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed mb-16">
              M'accorderais-tu l'honneur d'un rendez-vous pour partager <strong className="text-pink-300 font-medium">{dateIdea}</strong> et te dire tout cela de vive voix ?
            </p>

            {/* Interactive Buttons Container */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative min-h-[90px] max-w-xl mx-auto">
              
              {/* YES BUTTON */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleYes}
                className="w-full sm:w-auto z-20 px-10 py-5 bg-gradient-to-r from-pink-500 via-rose-600 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-xl rounded-2xl shadow-xl shadow-pink-500/40 border border-pink-300/40 flex items-center justify-center gap-3 cursor-pointer group"
              >
                <Heart className="w-6 h-6 text-yellow-300 fill-yellow-300 animate-bounce" />
                <span>Oui, avec grand plaisir ! 💕</span>
              </motion.button>

              {/* PLAYFUL DODGING NO BUTTON */}
              <motion.button
                animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                onMouseEnter={handleDodge}
                onClick={handleDodge}
                className="w-full sm:w-auto z-10 px-8 py-5 bg-white/10 hover:bg-white/20 text-pink-300/80 font-medium text-lg rounded-2xl border border-white/10 transition-colors cursor-pointer select-none"
              >
                {noPhrases[noClicks]}
              </motion.button>

            </div>
          </div>
        ) : (
          /* RSVP YES SUCCESS SCREEN */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-left max-w-2xl mx-auto"
          >
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 text-green-400 rounded-full border border-green-500/40 text-4xl mb-6 shadow-xl shadow-green-500/20 animate-bounce">
                🥂
              </div>
              <h3 className="font-script text-6xl text-pink-300 mb-4">C'est un OUI !</h3>
              <p className="font-serif text-2xl text-pink-100">
                Tu viens de faire de <span className="text-pink-400 font-script text-3xl">{suitor}</span> la personne la plus heureuse de l'univers ! ✨
              </p>
            </div>

            {!submittedContact ? (
              <form onSubmit={handleConfirmContact} className="bg-white/5 p-8 rounded-3xl border border-pink-500/30 space-y-6">
                <div className="border-b border-white/10 pb-4">
                  <h4 className="text-xl font-serif text-white font-bold flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-pink-400" />
                    Confirmons les détails pratiques
                  </h4>
                  <p className="text-xs text-pink-200/80 mt-1">Laisse ton numéro WhatsApp ou ton pseudo Instagram pour planifier notre moment.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-pink-200 mb-2">Ton WhatsApp ou Instagram *</label>
                  <input
                    type="text"
                    required
                    placeholder="ex: @divine_magique ou 06 12 34 56 78"
                    value={divineContact}
                    onChange={(e) => setDivineContact(e.target.value)}
                    className="w-full bg-black/40 border border-pink-500/40 rounded-2xl px-4 py-3.5 text-white placeholder-gray-500 focus:border-pink-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-pink-200 mb-2">Un petit mot pour {suitor} ? (Optionnel)</label>
                  <textarea
                    rows={3}
                    placeholder="Une préférence pour le jour ou un message poétique..."
                    value={divineNote}
                    onChange={(e) => setDivineNote(e.target.value)}
                    className="w-full bg-black/40 border border-pink-500/40 rounded-2xl p-4 text-white placeholder-gray-500 focus:border-pink-400 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold py-4 rounded-2xl shadow-xl transition-all transform hover:scale-[1.02] cursor-pointer disabled:opacity-50"
                >
                  {submitting ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  Envoyer ma réponse magique
                </button>
              </form>
            ) : (
              /* CONFIRMED CONTACT */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 bg-green-500/10 border border-green-500/30 rounded-3xl text-center space-y-4"
              >
                <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto" />
                <h4 className="text-2xl font-serif text-white font-bold">Tout est enregistré avec succès !</h4>
                <p className="text-pink-100 font-light">
                  Ton numéro / Instagram a bien été transmis en direct. Prépare-toi pour une soirée mémorable, {recipient}. 💕
                </p>
              </motion.div>
            )}

          </motion.div>
        )}

      </div>

    </section>
  );
}
