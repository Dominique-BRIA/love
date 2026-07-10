'use client';

import React, { useState } from 'react';
import { X, Save, Download, Sparkles, ExternalLink, Heart, Check, Copy, RefreshCw, Smartphone, MessageSquare } from 'lucide-react';
import { generateDivineZip } from '@/lib/zipExporter';

export function CreatorModal({ isOpen, onClose, declaration }: { isOpen: boolean; onClose: () => void; declaration: any }) {
  const [formData, setFormData] = useState({
    title: declaration?.title || "Une Déclaration Sincère",
    suitorName: declaration?.suitorName || "Ton Admirateur Secret",
    recipientName: declaration?.recipientName || "Divine",
    loveLetter: declaration?.loveLetter || "",
    dateIdea: declaration?.dateIdea || "Un dîner sous les étoiles ou un café chaleureux",
  });

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'rsvp' | 'edit' | 'export'>('rsvp');

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/declarations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_content',
          id: declaration?.id || 1,
          ...formData,
        }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (err) {
      console.error('Error saving:', err);
    } finally {
      setSaving(false);
    }
  };

  const downloadStandaloneZip = async () => {
    try {
      const zipBlob = await generateDivineZip(formData);
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `declaration-${formData.recipientName.toLowerCase()}-universelle.zip`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error creating standalone zip:', err);
    }
  };

  const copyLiveLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-gradient-to-b from-purple-950 via-gray-900 to-black border border-pink-500/30 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-pink-500/20 bg-purple-950/40">
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl text-white shadow-lg shadow-pink-500/30">
              <Sparkles className="w-6 h-6 animate-spin" />
            </span>
            <div>
              <h2 className="text-2xl font-serif text-white font-bold">Espace Suprême Courtisan</h2>
              <p className="text-xs text-pink-200/80">Pilotez votre déclaration, découvrez la réponse de Divine et exportez le site</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-8 pt-4 border-b border-white/10 bg-black/20">
          <button
            onClick={() => setActiveTab('rsvp')}
            className={`flex items-center gap-2 px-5 py-3 font-medium text-sm rounded-t-2xl border-b-2 transition-all cursor-pointer ${
              activeTab === 'rsvp'
                ? 'border-pink-500 text-pink-300 bg-pink-500/10'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-400" />
            Réponse de {formData.recipientName}
            {declaration?.rsvpAnswer === 'yes' && (
              <span className="w-2 h-2 rounded-full bg-green-400 animate-ping"></span>
            )}
          </button>
          
          <button
            onClick={() => setActiveTab('edit')}
            className={`flex items-center gap-2 px-5 py-3 font-medium text-sm rounded-t-2xl border-b-2 transition-all cursor-pointer ${
              activeTab === 'edit'
                ? 'border-pink-500 text-pink-300 bg-pink-500/10'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Save className="w-4 h-4 text-purple-400" />
            Personnaliser les Textes
          </button>

          <button
            onClick={() => setActiveTab('export')}
            className={`flex items-center gap-2 px-5 py-3 font-medium text-sm rounded-t-2xl border-b-2 transition-all cursor-pointer ${
              activeTab === 'export'
                ? 'border-pink-500 text-pink-300 bg-pink-500/10'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Download className="w-4 h-4 text-blue-400" />
            Export .ZIP & Vercel
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-8 overflow-y-auto flex-1 text-gray-200">
          
          {/* TAB 1: RSVP STATUS */}
          {activeTab === 'rsvp' && (
            <div className="max-w-2xl mx-auto py-4">
              <div className="bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-rose-500/10 p-8 rounded-3xl border border-pink-500/30 mb-8 backdrop-blur-md">
                <h3 className="font-serif text-2xl text-white mb-2 flex items-center gap-2">
                  <span>Le Verdict du Cœur</span>
                  {declaration?.rsvpAnswer === 'yes' ? '🎉🥂' : '⏳'}
                </h3>
                
                {declaration?.rsvpAnswer === 'yes' ? (
                  <div className="mt-6 space-y-4">
                    <div className="p-4 bg-green-500/20 border border-green-500/40 rounded-2xl flex items-start gap-4">
                      <div className="p-3 bg-green-500 rounded-xl text-black font-bold">OUI !</div>
                      <div>
                        <p className="text-green-200 font-semibold text-lg">{declaration.recipientName} a dit un grand OUI magique !</p>
                        <p className="text-sm text-green-300/80">Elle a accepté avec enthousiasme votre invitation.</p>
                      </div>
                    </div>

                    {declaration?.divinePhoneOrInsta && (
                      <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                        <Smartphone className="w-5 h-5 text-pink-400" />
                        <div>
                          <span className="text-xs text-gray-400">Contact / Instagram / Téléphone laissé par {declaration.recipientName} :</span>
                          <p className="text-white font-mono text-base font-semibold">{declaration.divinePhoneOrInsta}</p>
                        </div>
                      </div>
                    )}

                    {declaration?.divineReply && (
                      <div className="flex items-start gap-3 p-4 bg-pink-500/10 rounded-2xl border border-pink-500/30">
                        <MessageSquare className="w-6 h-6 text-pink-400 shrink-0 mt-1" />
                        <div>
                          <span className="text-xs text-pink-300">Petit mot doux écrit par {declaration.recipientName} :</span>
                          <p className="text-rose-100 font-serif italic text-lg mt-1">"{declaration.divineReply}"</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-3xl animate-pulse">
                      🌸
                    </div>
                    <h4 className="text-xl font-serif text-white mb-2">En attente de la lecture de {formData.recipientName}</h4>
                    <p className="text-sm text-gray-400 max-w-md mx-auto">
                      Envoyez-lui le lien de ce site. Dès qu'elle cliquera sur "Oui, avec grand plaisir !", sa réponse s'affichera instantanément ici en direct.
                    </p>
                  </div>
                )}
              </div>

              {/* Share Live Link Utility */}
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-white">Lien Magique de votre Site</h4>
                  <p className="text-xs text-gray-400">Copiez et envoyez ce lien par WhatsApp, Instagram ou SMS à {formData.recipientName}.</p>
                </div>
                <button
                  onClick={copyLiveLink}
                  className="flex items-center gap-2 px-5 py-3 bg-pink-600 hover:bg-pink-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-pink-600/30 shrink-0 cursor-pointer"
                >
                  {copiedLink ? <Check className="w-5 h-5 text-green-300" /> : <Copy className="w-5 h-5" />}
                  {copiedLink ? 'Copié !' : 'Copier le Lien'}
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: EDIT TEXTS */}
          {activeTab === 'edit' && (
            <div className="space-y-6 max-w-3xl mx-auto py-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-pink-300 mb-2">Ton Prénom / Surnom (Admirateur)</label>
                  <input
                    type="text"
                    value={formData.suitorName}
                    onChange={(e) => setFormData({ ...formData, suitorName: e.target.value })}
                    className="w-full bg-white/5 border border-pink-500/30 rounded-2xl px-4 py-3 text-white focus:border-pink-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-pink-300 mb-2">Prénom de la Fille Courtisée</label>
                  <input
                    type="text"
                    value={formData.recipientName}
                    onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                    className="w-full bg-white/5 border border-pink-500/30 rounded-2xl px-4 py-3 text-white focus:border-pink-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-pink-300 mb-2">Titre du Site</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-white/5 border border-pink-500/30 rounded-2xl px-4 py-3 text-white focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-pink-300 mb-2">La Déclaration d'Amour Cachée (Lettre Scellée)</label>
                <textarea
                  rows={6}
                  value={formData.loveLetter}
                  onChange={(e) => setFormData({ ...formData, loveLetter: e.target.value })}
                  className="w-full bg-white/5 border border-pink-500/30 rounded-2xl p-4 text-white font-serif leading-relaxed focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-pink-300 mb-2">Idée de Rendez-vous (Affichée sur la question RSVP)</label>
                <input
                  type="text"
                  value={formData.dateIdea}
                  onChange={(e) => setFormData({ ...formData, dateIdea: e.target.value })}
                  className="w-full bg-white/5 border border-pink-500/30 rounded-2xl px-4 py-3 text-white focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold px-8 py-4 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer disabled:opacity-50"
                >
                  {saving ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  {saved ? 'Enregistré avec Succès !' : 'Enregistrer les Modifications'}
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: EXPORT .ZIP & VERCEL GUIDE */}
          {activeTab === 'export' && (
            <div className="space-y-8 max-w-3xl mx-auto py-2">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Standalone HTML ZIP */}
                <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-blue-500/30 rounded-3xl p-6 flex flex-col justify-between">
                  <div>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30 uppercase font-semibold tracking-wider">
                      Version Portable 1-Fichier
                    </span>
                    <h4 className="text-xl font-serif text-white mt-4 mb-2 font-bold">
                      Export ZIP Universel
                    </h4>
                    <p className="text-sm text-gray-300 mb-6 font-light">
                      Un dossier \`.zip\` contenant le site en version HTML/CSS/JS directe avec toutes vos personnalisations. Parfait pour héberger en 1 clic sur Netlify ou Vercel sans base de données.
                    </p>
                  </div>

                  <button
                    onClick={downloadStandaloneZip}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 rounded-2xl transition-all shadow-lg shadow-blue-600/30 cursor-pointer"
                  >
                    <Download className="w-5 h-5" />
                    Télécharger ZIP Portable
                  </button>
                </div>

                {/* Complete Fullstack Next.js ZIP */}
                <div className="bg-gradient-to-br from-pink-900/30 to-purple-900/30 border border-pink-500/30 rounded-3xl p-6 flex flex-col justify-between">
                  <div>
                    <span className="px-3 py-1 bg-pink-500/20 text-pink-300 text-xs rounded-full border border-pink-500/30 uppercase font-semibold tracking-wider">
                      Version Pro Fullstack
                    </span>
                    <h4 className="text-xl font-serif text-white mt-4 mb-2 font-bold">
                      Code Source Next.js ZIP
                    </h4>
                    <p className="text-sm text-gray-300 mb-6 font-light">
                      Le projet Next.js App Router complet (TypeScript, Tailwind CSS, Drizzle ORM). Idéal si vous êtes développeur ou pour le pousser en production sur votre propre compte Vercel.
                    </p>
                  </div>

                  <a
                    href="/api/download-zip"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-semibold py-3.5 rounded-2xl transition-all shadow-lg shadow-pink-500/30 cursor-pointer text-center"
                  >
                    <Download className="w-5 h-5" />
                    Télécharger Source Next.js
                  </a>
                </div>

              </div>

              {/* Tutorial Vercel */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                <h4 className="text-xl font-serif text-white mb-4 font-bold flex items-center gap-2">
                  <ExternalLink className="w-5 h-5 text-purple-400" />
                  Comment déployer gratuitement sur Vercel ?
                </h4>

                <ol className="space-y-4 text-sm text-gray-300 font-light list-decimal list-inside">
                  <li className="pl-2">
                    <strong className="text-white">Créez votre dépôt :</strong> Décompressez l'un des ZIP téléchargés ci-dessus et envoyez-le sur un compte GitHub ou GitLab gratuit.
                  </li>
                  <li className="pl-2">
                    <strong className="text-white">Importez dans Vercel :</strong> Rendez-vous sur <a href="https://vercel.com/new" target="_blank" rel="noreferrer" className="text-pink-400 hover:underline">vercel.com/new</a> et sélectionnez votre dépôt.
                  </li>
                  <li className="pl-2">
                    <strong className="text-white">Configurez la base (Pour version Fullstack) :</strong> Créez une base Vercel Postgres en 1 clic dans l'onglet "Storage", elle injectera automatiquement \`DATABASE_URL\`.
                  </li>
                  <li className="pl-2">
                    <strong className="text-white">Déployez !</strong> Cliquez sur "Deploy". Vous obtiendrez votre URL personnalisée (ex: \`amour-divine.vercel.app\`) prête à être envoyée à votre dulcinée !
                  </li>
                </ol>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
