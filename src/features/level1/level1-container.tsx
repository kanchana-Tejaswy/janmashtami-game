'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IDENTITY_LAYERS } from '@/lib/constants';
import { LayerItem } from '@/types';
import {
  User,
  Heart,
  Briefcase,
  IdCard,
  Award,
  Sparkles,
  ChevronRight,
  Sparkle,
  AtmanSparkIcon,
  Check,
} from '@/components/ui/icons';
import { AudioManager } from '@/audio/audio-manager';
import confetti from 'canvas-confetti';

interface Level1ContainerProps {
  onComplete: () => void;
  onContinue: () => void;
}

export function Level1Container({ onComplete, onContinue }: Level1ContainerProps) {
  const [removedLayers, setRemovedLayers] = useState<Set<string>>(new Set());
  const [activeTeaching, setActiveTeaching] = useState<LayerItem | null>(null);

  const totalLayers = IDENTITY_LAYERS.length;
  const isAllRemoved = removedLayers.size === totalLayers;

  const handleRemoveLayer = (layer: LayerItem) => {
    if (removedLayers.has(layer.id)) return;

    AudioManager.getInstance().playWhoosh({ duration: 0.45, volume: 0.2 });
    AudioManager.getInstance().playTick({ volume: 0.15 });

    const nextSet = new Set(removedLayers);
    nextSet.add(layer.id);
    setRemovedLayers(nextSet);
    setActiveTeaching(layer);

    if (nextSet.size === totalLayers) {
      AudioManager.getInstance().playCelebration();
      onComplete();
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#fef08a', '#fbbf24', '#14b8a6', '#f59e0b'],
        });
      } catch {
        // Fallback gracefully
      }
    }
  };

  const getLayerIcon = (iconName: LayerItem['iconName']) => {
    switch (iconName) {
      case 'body':
        return <User className="w-4 h-4" />;
      case 'emotions':
        return <Heart className="w-4 h-4" />;
      case 'profession':
        return <Briefcase className="w-4 h-4" />;
      case 'name':
        return <IdCard className="w-4 h-4" />;
      case 'identity':
        return <Award className="w-4 h-4" />;
      case 'thoughts':
        return <Sparkles className="w-4 h-4" />;
    }
  };

  const glowIntensity = (removedLayers.size / totalLayers) * 100;

  return (
    <section className="max-w-5xl mx-auto px-4 py-6" aria-label="Station 1: Who Am I?">
      {/* Station Kicker & Intro Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-8 sm:mb-10"
      >
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-peacock-900/80 border border-teal-500/30 text-teal-300 text-xs font-semibold tracking-[0.15em] uppercase mb-3 shadow-[0_0_15px_rgba(20,184,166,0.15)]">
          <Sparkle className="w-3.5 h-3.5 text-gold-400" />
          STATION I • THE FIRST INQUIRY
        </span>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-b from-white via-gold-100 to-gold-300 drop-shadow-[0_0_30px_rgba(245,158,11,0.25)]">
          WHO AM I?
        </h2>

        <p className="max-w-[680px] mx-auto text-sm sm:text-base text-ivory-dim font-body mt-3 leading-[1.6]">
          We often identify ourselves by what changes around us: our body, our emotions, our titles,
          and our memories. But peel away each outer layer, and who remains?
        </p>
      </motion.div>

      {/* Main Interactive Stage: Aligned Heights & Balanced Spacing */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
        {/* Left Column: Meditating Visual Canvas with Ethereal Glowing Border */}
        <div className="lg:col-span-5 flex flex-col justify-between items-center relative rounded-3xl p-6 sm:p-7 bg-peacock-950/60 backdrop-blur-xl border border-gold-500/20 shadow-[0_0_35px_rgba(245,158,11,0.08),inset_0_1px_1px_rgba(255,255,255,0.08)] overflow-hidden min-h-[460px]">
          {/* Subtle Ambient Cosmic Particles Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <span className="absolute top-6 left-8 w-1 h-1 rounded-full bg-gold-200/40 animate-pulse" />
            <span className="absolute top-20 right-10 w-1.5 h-1.5 rounded-full bg-teal-300/30 animate-pulse delay-700" />
            <span className="absolute bottom-28 left-12 w-1 h-1 rounded-full bg-amber-300/40 animate-pulse delay-1000" />
            <span className="absolute bottom-12 right-14 w-1.5 h-1.5 rounded-full bg-gold-100/30 animate-pulse delay-500" />
            <div className="absolute inset-0 rounded-3xl border border-gold-400/15 pointer-events-none" />
          </div>

          {/* Central Radial Bloom Aura expanding with each peeled layer */}
          <div
            className="absolute rounded-full transition-all duration-700 pointer-events-none"
            style={{
              width: `${160 + glowIntensity * 1.8}px`,
              height: `${160 + glowIntensity * 1.8}px`,
              top: '32%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(circle, rgba(254, 240, 138, ${0.12 + glowIntensity * 0.005}) 0%, rgba(245, 158, 11, ${0.08 + glowIntensity * 0.003}) 45%, transparent 75%)`,
              filter: `blur(${Math.max(14, glowIntensity * 0.4)}px)`,
            }}
            aria-hidden="true"
          />

          {/* Meditating Avatar SVG & Peelable Energy Shells */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center select-none my-auto">
            <svg
              viewBox="0 0 240 260"
              className="w-full h-full relative z-10 drop-shadow-[0_0_25px_rgba(245,158,11,0.25)]"
              aria-label="Meditating Figure and Cosmic Energy Layers"
            >
              <defs>
                <linearGradient id="atmanCore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="25%" stopColor="#fef08a" />
                  <stop offset="70%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#0d9488" />
                </linearGradient>

                <radialGradient id="heartPulse" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fb7185" stopOpacity="0.8" />
                  <stop offset="70%" stopColor="#fb7185" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#fb7185" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* LAYER 5: Identity & Status - Outer Orbit Ring */}
              <AnimatePresence>
                {!removedLayers.has('identity') && (
                  <motion.circle
                    key="layer-identity"
                    cx="120"
                    cy="130"
                    r="105"
                    fill="none"
                    stroke="#34d399"
                    strokeWidth="1.5"
                    strokeDasharray="6 6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 0.5, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.25, filter: 'blur(6px)' }}
                    transition={{ duration: 0.55 }}
                  />
                )}
              </AnimatePresence>

              {/* LAYER 3: Profession & Social Crest - Shoulder Orbital Arch */}
              <AnimatePresence>
                {!removedLayers.has('profession') && (
                  <motion.path
                    key="layer-profession"
                    d="M50,145 C50,90 190,90 190,145"
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.55 }}
                    exit={{ opacity: 0, scale: 1.15, filter: 'blur(5px)' }}
                    transition={{ duration: 0.55 }}
                  />
                )}
              </AnimatePresence>

              {/* LAYER 2: Emotions - Heart Astral Ripple */}
              <AnimatePresence>
                {!removedLayers.has('emotions') && (
                  <motion.circle
                    key="layer-emotions"
                    cx="120"
                    cy="125"
                    r="36"
                    fill="url(#heartPulse)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.35, 0.65, 0.35], scale: [0.96, 1.04, 0.96] }}
                    exit={{ opacity: 0, scale: 1.3, filter: 'blur(8px)', transition: { duration: 0.55 } }}
                    transition={{
                      opacity: { duration: 2.4, repeat: Infinity },
                      scale: { duration: 2.4, repeat: Infinity },
                    }}
                  />
                )}
              </AnimatePresence>

              {/* LAYER 4: Name - Vocal Resonance Ring */}
              <AnimatePresence>
                {!removedLayers.has('name') && (
                  <motion.ellipse
                    key="layer-name"
                    cx="120"
                    cy="95"
                    rx="32"
                    ry="12"
                    fill="none"
                    stroke="#a78bfa"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    exit={{ opacity: 0, scale: 1.25, filter: 'blur(5px)' }}
                    transition={{ duration: 0.55 }}
                  />
                )}
              </AnimatePresence>

              {/* LAYER 6: Thoughts & Mental Chatter - Ajna Orbit Sparks */}
              <AnimatePresence>
                {!removedLayers.has('thoughts') && (
                  <motion.g
                    key="layer-thoughts"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    exit={{ opacity: 0, scale: 1.2, filter: 'blur(6px)' }}
                    transition={{ duration: 0.55 }}
                  >
                    <ellipse
                      cx="120"
                      cy="60"
                      rx="42"
                      ry="22"
                      fill="none"
                      stroke="#f472b6"
                      strokeWidth="1.2"
                      strokeDasharray="2 4"
                    />
                    <circle cx="95" cy="52" r="2" fill="#f472b6" />
                    <circle cx="145" cy="52" r="2" fill="#f472b6" />
                  </motion.g>
                )}
              </AnimatePresence>

              {/* LAYER 1: Physical Body - Dense Outer Contour Shell */}
              <AnimatePresence>
                {!removedLayers.has('body') && (
                  <motion.g
                    key="layer-body"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.45 }}
                    exit={{ opacity: 0, scale: 1.1, filter: 'blur(6px)' }}
                    transition={{ duration: 0.55 }}
                  >
                    <circle cx="120" cy="65" r="26" fill="none" stroke="#38bdf8" strokeWidth="2" />
                    <path
                      d="M120,95 C96,98 74,112 68,140 C63,160 76,190 92,202 C104,210 136,210 148,202 C164,190 177,160 172,140 C166,112 144,98 120,95 Z"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="2"
                    />
                  </motion.g>
                )}
              </AnimatePresence>

              {/* Core Luminous Seated Figure (The Changeless Inner Observer) */}
              <g className="transition-all duration-700">
                {/* Head */}
                <circle
                  cx="120"
                  cy="65"
                  r="22"
                  fill="url(#atmanCore)"
                  opacity={0.65 + glowIntensity * 0.0035}
                />
                {/* Third Eye / Ajna Point */}
                <circle cx="120" cy="62" r="2.5" fill="#ffffff" />

                {/* Torso in Dhyana Mudra */}
                <path
                  d="M120,92 C98,94 78,110 72,136 C68,155 81,184 96,195 C107,203 133,203 144,195 C159,184 172,155 168,136 C162,110 142,94 120,92 Z"
                  fill="url(#atmanCore)"
                  opacity={0.55 + glowIntensity * 0.0045}
                />
                {/* Crossed Legs Lotus Base */}
                <path
                  d="M52,204 C46,215 68,236 120,236 C172,236 194,215 188,204 C172,196 68,196 52,204 Z"
                  fill="url(#atmanCore)"
                  opacity={0.55 + glowIntensity * 0.0045}
                />
              </g>
            </svg>

            {/* Radiant Atman Spark when all layers are peeled */}
            {isAllRemoved && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [1, 1.25, 1], opacity: 1 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute z-20 pointer-events-none"
              >
                <AtmanSparkIcon className="w-20 h-20 text-gold-200 drop-shadow-[0_0_20px_#f59e0b]" />
              </motion.div>
            )}
          </div>

          {/* Status Tracker & Glowing Pips */}
          <div className="mt-4 text-center z-10 w-full flex flex-col items-center">
            <p className="text-xs font-semibold text-gold-300 tracking-[0.14em] uppercase font-sans">
              {isAllRemoved
                ? 'ALL EXTERNAL LAYERS DISSOLVED'
                : `LAYERS REMAINING: ${totalLayers - removedLayers.size} OF ${totalLayers}`}
            </p>

            {/* 6 Glowing Mini Pip Dots / Segmented Progress Bar */}
            <div className="flex items-center gap-2 mt-2" aria-label="Layers peeled progress">
              {IDENTITY_LAYERS.map((layer) => {
                const isPeeled = removedLayers.has(layer.id);
                return (
                  <motion.div
                    key={layer.id}
                    initial={false}
                    animate={{
                      backgroundColor: isPeeled ? 'rgba(20, 184, 166, 0.25)' : 'rgba(245, 158, 11, 0.95)',
                      boxShadow: isPeeled
                        ? 'none'
                        : '0 0 10px rgba(245, 158, 11, 0.75), 0 0 2px rgba(254, 240, 138, 1)',
                      scale: isPeeled ? 0.85 : 1.05,
                    }}
                    className="w-5 sm:w-6 h-1.5 rounded-full transition-all duration-300"
                    title={`${layer.name}: ${isPeeled ? 'Peeled' : 'Active'}`}
                  />
                );
              })}
            </div>

            <p className="text-[13px] text-ivory-dim/70 font-quote italic mt-2.5 max-w-xs leading-snug">
              {isAllRemoved
                ? 'Only the eternal conscious observer remains.'
                : 'Tap each layer chip on the right to peel away the identity.'}
            </p>
          </div>
        </div>

        {/* Right Column: 6 "Peel" Cards & Insight Callout */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full gap-4">
          {/* 6 Layer Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {IDENTITY_LAYERS.map((layer, index) => {
              const isRemoved = removedLayers.has(layer.id);

              return (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => handleRemoveLayer(layer)}
                  disabled={isRemoved}
                  aria-pressed={isRemoved}
                  className={`group relative flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-gold-400 ${
                    isRemoved
                      ? 'bg-slate-900/65 backdrop-blur-md border-white/[0.04] opacity-35 cursor-default'
                      : 'bg-slate-900/65 backdrop-blur-md border-white/[0.08] hover:border-gold-400/40 text-ivory hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(245,158,11,0.18)] active:scale-[0.98]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    {/* Glassmorphic Rounded Icon Badge */}
                    <span
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                        isRemoved
                          ? 'bg-peacock-950/40 border-white/[0.05] text-ivory-dim/30'
                          : 'bg-gradient-to-br from-teal-500/15 via-peacock-900/60 to-peacock-950 border-teal-500/25 text-teal-300 group-hover:border-gold-400/40 group-hover:text-gold-300 shadow-inner'
                      }`}
                    >
                      {getLayerIcon(layer.iconName)}
                    </span>

                    {/* Title & Natural Wrapping 2-Line Subtitle */}
                    <div className="min-w-0">
                      <p
                        className={`text-xs font-semibold tracking-wider font-display uppercase ${
                          isRemoved ? 'line-through text-ivory-dim/50' : 'text-ivory'
                        }`}
                      >
                        {index + 1}. {layer.name}
                      </p>
                      <p className="text-[12px] sm:text-[12.5px] leading-snug text-ivory-dim/60 font-sans mt-0.5">
                        {layer.description}
                      </p>
                    </div>
                  </div>

                  {/* Action Pill Badge / Completed Checkmark */}
                  {isRemoved ? (
                    <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-teal-500/20 border border-teal-400/30 text-teal-300">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </span>
                  ) : (
                    <span className="shrink-0 px-2.5 py-1 rounded-full text-[11px] font-sans font-medium tracking-wide border border-gold-400/35 bg-gold-500/10 text-gold-300 shadow-[0_0_10px_rgba(245,158,11,0.12)] group-hover:bg-gold-500/25 group-hover:border-gold-300 group-hover:text-gold-100 group-hover:shadow-[0_0_14px_rgba(245,158,11,0.3)] transition-all duration-200">
                      Peel
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Teaching Sacred Insight Card */}
          <div className="min-h-[92px] flex items-center">
            <AnimatePresence mode="wait">
              {activeTeaching ? (
                <motion.div
                  key={activeTeaching.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="w-full p-4 rounded-2xl bg-peacock-950/80 backdrop-blur-md border border-teal-500/30 border-l-4 border-l-gold-400 text-xs sm:text-sm text-ivory shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkle className="w-3.5 h-3.5 text-gold-400" />
                    <span className="font-semibold text-gold-300 font-display tracking-wide uppercase text-xs">
                      Insight · {activeTeaching.name}
                    </span>
                  </div>
                  <p className="text-ivory-dim font-sans leading-relaxed text-xs sm:text-[13px]">
                    {activeTeaching.teaching}
                  </p>
                </motion.div>
              ) : (
                <div className="w-full p-4 rounded-2xl border border-dashed border-gold-500/15 text-center text-xs text-ivory-dim/40 font-quote italic">
                  Select a layer above to contemplate what happens when that identity dissolves.
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Sacred Revelation Completion Card (When all 6 layers are removed) */}
      <AnimatePresence>
        {isAllRemoved && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 sm:mt-14 mb-8 py-12 px-6 sm:px-10 rounded-3xl text-center max-w-[740px] mx-auto relative overflow-hidden backdrop-blur-2xl border border-amber-500/40 ring-1 ring-amber-400/20 shadow-[0_0_40px_-10px_rgba(245,158,11,0.2),0_25px_50px_-12px_rgba(0,0,0,0.7)]"
            style={{
              background: 'linear-gradient(180deg, rgba(10, 25, 47, 0.95) 0%, rgba(6, 16, 36, 0.98) 100%)',
            }}
          >
            {/* Ambient Top Glow Diffusion */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-gradient-to-b from-amber-500/15 via-gold-500/5 to-transparent blur-xl pointer-events-none"
              aria-hidden="true"
            />

            {/* Top Emblem with Breathing Halo & Delicate Double-Ring */}
            <div className="relative inline-flex items-center justify-center mb-5">
              <motion.div
                animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.65, 0.3] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -inset-3 rounded-full bg-gold-400/25 blur-md pointer-events-none"
              />
              <div className="relative p-3.5 rounded-full bg-peacock-900/90 border border-gold-400/60 ring-2 ring-gold-400/20 text-gold-300 shadow-[0_0_15px_rgba(245,158,11,0.25)]">
                <AtmanSparkIcon className="w-8 h-8" />
              </div>
            </div>

            {/* Overline & Title */}
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-gold-400 uppercase font-sans mb-1.5">
              SACRED REVELATION
            </p>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-ivory mb-5 tracking-wide">
              The Changeless Observer
            </h3>

            {/* Sacred Sanskrit Verse */}
            <p
              className="text-lg sm:text-2xl font-sanskrit font-normal text-amber-200 mb-5 leading-[1.8] tracking-wide"
              style={{
                textShadow: '0 0 12px rgba(253, 230, 138, 0.25)',
                color: '#FDE68A',
              }}
            >
              देहिनोऽस्मिन्यथा देहे कौमारं यौवनं जरा ।<br />
              तथा देहान्तरप्राप्तिर्धीरस्तत्र न मुह्यति ॥
            </p>

            {/* Sanskrit Meaning Quote Inset */}
            <div
              className="max-w-xl mx-auto mb-6 text-left rounded-xl p-4 sm:p-5"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderLeft: '2px solid rgba(245, 158, 11, 0.5)',
              }}
            >
              <blockquote className="text-xs sm:text-sm text-slate-300 font-quote italic leading-relaxed">
                &ldquo;As the embodied soul continuously passes, in this body, from boyhood to youth
                to old age, the soul similarly passes into another body at death. A sober person is
                not bewildered by such a change.&rdquo;
              </blockquote>
              <footer className="text-gold-400 font-sans text-xs font-medium not-italic mt-2 flex items-center gap-1.5">
                <Sparkle className="w-3 h-3 text-gold-400" />
                Bhagavad Gita 2.13
              </footer>
            </div>

            {/* Philosophical Reflection Paragraph */}
            <p className="text-xs sm:text-sm text-ivory-dim font-body leading-relaxed max-w-xl mx-auto mb-8">
              When body, emotions, status, labels, and thoughts are stripped away, you are still
              here. An unbroken, changeless conscious presence is watching it all. If you are not any
              of these outer coverings...{' '}
              <span className="text-gold-200 font-semibold italic">who are you really?</span>
            </p>

            {/* High-Contrast Radiant Primary CTA Button */}
            <button
              type="button"
              onClick={onContinue}
              className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-[#0F172A] font-display font-bold text-sm tracking-[0.06em] uppercase transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-gold-300 active:scale-95 shadow-[0_4px_16px_rgba(245,158,11,0.3)] hover:shadow-[0_4px_24px_rgba(245,158,11,0.5)]"
              style={{
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
              }}
            >
              <span>Continue to Station II</span>
              <ChevronRight className="w-4 h-4 stroke-[2.5] transform transition-transform duration-200 ease-out group-hover:translate-x-1" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
