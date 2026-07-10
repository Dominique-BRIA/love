'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Pentatonic romantic notes in Hz (Eb Major / C minor soothing chords)
  const notes = [
    261.63, 293.66, 329.63, 392.00, 440.00, // C4, D4, E4, G4, A4
    523.25, 587.33, 659.25, 783.99, 880.00  // C5, D5, E5, G5, A5
  ];

  const playMagicalChime = () => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Pick 2 or 3 harmonic notes to create a soft celestial arpeggio
    const numNotes = 2 + Math.floor(Math.random() * 2);
    for (let i = 0; i < numNotes; i++) {
      setTimeout(() => {
        try {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          // Soft sine / triangle mix
          osc.type = i % 2 === 0 ? 'sine' : 'triangle';
          
          // Pick a random pentatonic note
          const randomNote = notes[Math.floor(Math.random() * notes.length)];
          osc.frequency.setValueAtTime(randomNote, ctx.currentTime);

          // Gentle fade in and long dreamy fade out
          gain.gain.setValueAtTime(0.001, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.3);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.5);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start();
          osc.stop(ctx.currentTime + 3.8);
        } catch {
          // ignore web audio edge cases
        }
      }, i * 400 + Math.random() * 200);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      if (!audioContextRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioContextRef.current = new AudioContextClass();
      }

      // Play an initial sweet arpeggio
      playMagicalChime();

      // Schedule periodic romantic chimes
      timerRef.current = setInterval(() => {
        playMagicalChime();
      }, 4500);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.suspend();
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  return (
    <button
      onClick={() => setIsPlaying(!isPlaying)}
      className={`flex items-center gap-2.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-lg backdrop-blur-md border cursor-pointer ${
        isPlaying
          ? 'bg-rose-500/20 border-rose-400 text-rose-200 shadow-rose-500/20'
          : 'bg-white/10 hover:bg-white/15 border-white/10 text-white/80'
      }`}
      title={isPlaying ? "Désactiver l'ambiance sonore" : "Activer l'ambiance poétique"}
    >
      <Music className={`w-4 h-4 ${isPlaying ? 'animate-pulse text-rose-400' : ''}`} />
      <span className="hidden sm:inline">
        {isPlaying ? 'Ambiance Poétique : Active' : 'Musique Magique'}
      </span>
      {isPlaying ? <Volume2 className="w-4 h-4 text-rose-400" /> : <VolumeX className="w-4 h-4 opacity-60" />}
    </button>
  );
}
