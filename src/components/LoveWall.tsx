'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquareQuote, Heart, Send, Sparkles, RefreshCw, User } from 'lucide-react';
import confetti from 'canvas-confetti';

export function LoveWall({ declaration }: { declaration: any }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState(declaration?.recipientName || 'Divine');
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/messages');
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (err) {
      console.error('Error loading messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    // Poll every 10s for live chat feel
    const interval = setInterval(fetchMessages, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setSending(true);
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          author: author || 'Divine',
          message: newMessage,
        }),
      });

      if (res.ok) {
        const created = await res.json();
        setMessages([created, ...messages]);
        setNewMessage('');
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
        });
      }
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setSending(false);
    }
  };

  const handleHeart = async (id: number) => {
    // Optimistic UI update
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, heartCount: (msg.heartCount || 0) + 1 } : msg))
    );

    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'heart',
          id,
        }),
      });
    } catch (err) {
      console.error('Error hearting:', err);
    }
  };

  return (
    <section id="mots-doux" className="relative py-20 px-4 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs uppercase font-mono tracking-widest bg-blue-500/10 border border-blue-500/20 text-blue-300 px-3.5 py-1.5 rounded-full">
          Échanges Poétiques
        </span>
        <h2 className="font-script text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-300 to-purple-200 mt-4 mb-4">
          Le Mur des Mots Doux
        </h2>
        <p className="font-serif text-pink-100/80 text-lg md:text-xl font-light">
          Laissez une pensée, une réaction ou un message secret qui restera gravé ici.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        
        {/* Post Message Form */}
        <div className="lg:col-span-1 bg-gradient-to-b from-purple-950/40 to-black/60 backdrop-blur-xl p-8 rounded-3xl border border-pink-500/30 shadow-2xl">
          <h3 className="font-serif text-2xl text-white mb-6 flex items-center gap-2">
            <MessageSquareQuote className="w-6 h-6 text-pink-400" />
            Écrire un mot
          </h3>

          <form onSubmit={handleCreate} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-wider font-mono text-pink-300 mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" /> Ton Nom
              </label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-white/5 border border-pink-500/20 focus:border-pink-500 rounded-2xl px-4 py-3 text-white font-medium focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-mono text-pink-300 mb-2">Ton Message</label>
              <textarea
                rows={4}
                required
                placeholder="Exprime tes sentiments ou ta réaction face à ce site..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full bg-white/5 border border-pink-500/20 focus:border-pink-500 rounded-2xl p-4 text-white font-serif focus:outline-none transition-colors resize-none leading-relaxed"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold py-4 rounded-2xl shadow-xl transition-all transform hover:scale-[1.02] cursor-pointer disabled:opacity-50"
            >
              {sending ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              Publier sur le mur
            </button>
          </form>
        </div>

        {/* Messages Stream */}
        <div className="lg:col-span-2 space-y-6">
          {loading ? (
            <div className="py-12 text-center text-pink-200">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-pink-400" />
              <span>Chargement des messages doux...</span>
            </div>
          ) : messages.length === 0 ? (
            <div className="bg-white/5 border border-white/10 p-12 rounded-3xl text-center">
              <Sparkles className="w-10 h-10 text-pink-400 mx-auto mb-4 animate-bounce" />
              <h4 className="font-serif text-2xl text-white mb-2">Aucun mot doux pour l'instant !</h4>
              <p className="text-gray-400 font-light max-w-sm mx-auto">Soyez la première personne à signer ce magnifique livre d'or numérique.</p>
            </div>
          ) : (
            messages.map((m, idx) => (
              <motion.div
                key={m.id || idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white/[0.04] hover:bg-white/[0.07] border border-pink-500/20 hover:border-pink-500/40 p-6 md:p-8 rounded-3xl transition-all duration-300 shadow-xl relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                    <span className="font-serif text-xl font-bold text-pink-300">{m.author}</span>
                    <span className="text-xs text-gray-500 font-mono">
                      {m.createdAt ? new Date(m.createdAt).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : "À l'instant"}
                    </span>
                  </div>

                  <p className="font-serif text-rose-100/90 text-lg whitespace-pre-line leading-relaxed mb-6">
                    {m.message}
                  </p>
                </div>

                {/* Interactive Real-Time Heart Counter Button */}
                <div className="flex items-center justify-end">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleHeart(m.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-sm font-medium transition-colors cursor-pointer group"
                    title="Envoyer de l'amour à ce message"
                  >
                    <Heart className="w-4 h-4 text-rose-400 fill-rose-400 group-hover:scale-125 transition-transform" />
                    <span>{m.heartCount || 1}</span>
                  </motion.button>
                </div>

              </motion.div>
            ))
          )}
        </div>

      </div>

    </section>
  );
}
