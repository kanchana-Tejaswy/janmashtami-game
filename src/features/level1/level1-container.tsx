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
  DiyaLineArt,
} from '@/components/ui/icons';
import { AudioManager } from '@/audio/audio-manager';
import confetti from 'canvas-confetti';
import { useRevealAutoScroll } from '@/hooks/use-reveal-auto-scroll';
import { useRef, useEffect } from 'react';

interface Level1ContainerProps {
  onComplete: () => void;
  onContinue: () => void;
}

export function Level1Container({ onComplete, onContinue }: Level1ContainerProps) {
  const [removedLayers, setRemovedLayers] = useState<Set<string>>(new Set());
  const [activeTeaching, setActiveTeaching] = useState<LayerItem | null>(null);
  const { scrollIfOffscreen } = useRevealAutoScroll();

  const teachingSectionRef = useRef<HTMLDivElement | null>(null);
  const climaxSectionRef = useRef<HTMLDivElement | null>(null);

  const totalLayers = IDENTITY_LAYERS.length;
  const isAllRemoved = removedLayers.size === totalLayers;

  const handleRemoveLayer = (layer: LayerItem) => {
    if (removedLayers.has(layer.id)) {
      setActiveTeaching(layer);
      scrollIfOffscreen(teachingSectionRef.current, { block: 'nearest' });
      return;
    }

    const nextSet = new Set(removedLayers);
    nextSet.add(layer.id);
    setRemovedLayers(nextSet);
    setActiveTeaching(layer);

    // Context-aware auto-scroll to the newly revealed teaching insight card
    scrollIfOffscreen(teachingSectionRef.current, { block: 'nearest', delay: 150 });

    // Ascending harmonic chime progression for spiritual elevation
    AudioManager.getInstance().playWhoosh({ duration: 0.35, volume: 0.15 });
    AudioManager.getInstance().playChime({
      pitchMultiplier: 0.95 + nextSet.size * 0.08,
      volume: 0.22,
    });

    if (nextSet.size === totalLayers) {
      AudioManager.getInstance().playCelebration();
      onComplete();
      try {
        confetti({
          particleCount: 75,
          spread: 85,
          origin: { y: 0.6 },
          colors: ['#D6B15E', '#E8D18A', '#E8B7BE', '#F3D9DC', '#DDD6EA'],
        });
      } catch {
        // Fallback gracefully
      }
    }
  };

  // When all 6 layers are removed, guide the user to the Sacred Revelation
  useEffect(() => {
    if (isAllRemoved && climaxSectionRef.current) {
      scrollIfOffscreen(climaxSectionRef.current, { block: 'center', delay: 250 });
    }
  }, [isAllRemoved, scrollIfOffscreen]);

  const getLayerIcon = (iconName: LayerItem['iconName']) => {
    switch (iconName) {
      case 'body':
        return <User className="w-4 h-4 text-warm-700" />;
      case 'emotions':
        return <Heart className="w-4 h-4 text-blush-dark" />;
      case 'profession':
        return <Briefcase className="w-4 h-4 text-gold-600" />;
      case 'name':
        return <IdCard className="w-4 h-4 text-warm-700" />;
      case 'identity':
        return <Award className="w-4 h-4 text-gold-600" />;
      case 'thoughts':
        return <Sparkles className="w-4 h-4 text-blush-dark" />;
    }
  };

  const glowIntensity = (removedLayers.size / totalLayers) * 100;

  return (
    <section className="max-w-5xl mx-auto px-4 py-4 sm:py-6 select-none" aria-label="Stage 01: Discover — Who Am I?">
      {/* Station Kicker & Intro Header */}
      <div className="text-center mb-8 sm:mb-10">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/95 border border-gold-400/45 text-gold-800 text-[11px] font-sans font-bold tracking-[0.2em] uppercase mb-3 shadow-ujwala-sm">
          <Sparkle className="w-3.5 h-3.5 text-gold-500" />
          STAGE 01 • DISCOVER
        </span>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-wide text-warm-900 drop-shadow-sm">
          WHO AM I?
        </h2>

        <p className="max-w-[620px] mx-auto text-sm sm:text-base text-warm-700 font-body mt-2.5 leading-[1.6]">
          We often identify ourselves by what changes around us: our body, our emotions, our titles,
          and our memories. But peel away each outer layer, and who remains?
        </p>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        {/* Left Column: Exquisite Meditating Yogi & Lotus Pedestal */}
        <div className="lg:col-span-5 flex flex-col justify-between items-center relative rounded-3xl p-6 sm:p-7 bg-white/90 backdrop-blur-xl border border-gold-400/35 shadow-ujwala-card overflow-hidden min-h-[460px]">
          {/* Central Expanding Radial Light Glow */}
          <div
            className="absolute rounded-full transition-all duration-700 pointer-events-none"
            style={{
              width: `${200 + glowIntensity * 1.8}px`,
              height: `${200 + glowIntensity * 1.8}px`,
              top: '40%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(circle, rgba(232, 209, 138, ${0.22 + glowIntensity * 0.006}) 0%, rgba(243, 217, 220, ${0.14 + glowIntensity * 0.003}) 45%, transparent 75%)`,
              filter: `blur(${Math.max(16, glowIntensity * 0.35)}px)`,
            }}
            aria-hidden="true"
          />

          {/* Meditating Figure SVG with Layered Sheaths */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center select-none my-auto">
            <svg
              viewBox="0 0 240 260"
              className="w-full h-full relative z-10 drop-shadow-[0_4px_20px_rgba(214,177,94,0.25)]"
              aria-label="Meditating Yogi and Consciousness Sheaths"
            >
              <defs>
                {/* Atman Golden Core Gradient */}
                <linearGradient id="atmanYogiGold" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFFDF9" />
                  <stop offset="25%" stopColor="#F8EBC6" />
                  <stop offset="65%" stopColor="#D6B15E" />
                  <stop offset="100%" stopColor="#B8923F" />
                </linearGradient>

                {/* Soft Aura Glow Gradient */}
                <radialGradient id="yogiAuraHalo" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFFDF9" stopOpacity="0.95" />
                  <stop offset="50%" stopColor="#E8D18A" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#E8D18A" stopOpacity="0" />
                </radialGradient>

                {/* Heart Chakra Pulsing Gradient */}
                <radialGradient id="yogiHeartPulse" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#E8B7BE" stopOpacity="0.95" />
                  <stop offset="60%" stopColor="#F3D9DC" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#F3D9DC" stopOpacity="0" />
                </radialGradient>

                {/* Lotus Petals Gradient */}
                <linearGradient id="lotusPetalGold" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFFDF9" />
                  <stop offset="40%" stopColor="#F4E7BD" />
                  <stop offset="80%" stopColor="#D6B15E" />
                  <stop offset="100%" stopColor="#8E6F2B" />
                </linearGradient>
              </defs>

              {/* -------------------------------------------------------------
                  LAYER 5: IDENTITY & STATUS (Outer Cosmic Orbit with Diamond Stars)
                  ------------------------------------------------------------- */}
              <AnimatePresence>
                {!removedLayers.has('identity') && (
                  <motion.g
                    key="layer-identity"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.85 }}
                    exit={{ opacity: 0, scale: 1.25, filter: 'blur(6px)' }}
                    transition={{ duration: 0.5 }}
                    className="cursor-pointer"
                    onClick={() => {
                      const item = IDENTITY_LAYERS.find((l) => l.id === 'identity');
                      if (item) handleRemoveLayer(item);
                    }}
                  >
                    <circle
                      cx="120"
                      cy="125"
                      r="104"
                      fill="none"
                      stroke="#D6B15E"
                      strokeWidth="1.25"
                      strokeDasharray="4 6"
                    />
                    {/* 4 Orbit Diamond Stars */}
                    <path d="M120,18 L122,23 L127,23 L123,26 L125,31 L120,28 L115,31 L117,26 L113,23 L118,23 Z" fill="#D6B15E" />
                    <circle cx="224" cy="125" r="3" fill="#D6B15E" />
                    <circle cx="120" cy="229" r="3" fill="#D6B15E" />
                    <circle cx="16" cy="125" r="3" fill="#D6B15E" />
                  </motion.g>
                )}
              </AnimatePresence>

              {/* -------------------------------------------------------------
                  LAYER 3: PROFESSION & ROLES (Celestial Shoulder Crest Arcs)
                  ------------------------------------------------------------- */}
              <AnimatePresence>
                {!removedLayers.has('profession') && (
                  <motion.path
                    key="layer-profession"
                    d="M44,142 C44,78 196,78 196,142"
                    fill="none"
                    stroke="#C49B45"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.75 }}
                    exit={{ opacity: 0, scale: 1.2, filter: 'blur(5px)' }}
                    transition={{ duration: 0.5 }}
                    className="cursor-pointer"
                    onClick={() => {
                      const item = IDENTITY_LAYERS.find((l) => l.id === 'profession');
                      if (item) handleRemoveLayer(item);
                    }}
                  />
                )}
              </AnimatePresence>

              {/* -------------------------------------------------------------
                  LAYER 6: THOUGHTS & EGO (Crown Ajna Radiance Rays)
                  ------------------------------------------------------------- */}
              <AnimatePresence>
                {!removedLayers.has('thoughts') && (
                  <motion.g
                    key="layer-thoughts"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    exit={{ opacity: 0, scale: 1.2, filter: 'blur(5px)' }}
                    transition={{ duration: 0.5 }}
                    className="cursor-pointer"
                    onClick={() => {
                      const item = IDENTITY_LAYERS.find((l) => l.id === 'thoughts');
                      if (item) handleRemoveLayer(item);
                    }}
                  >
                    <ellipse
                      cx="120"
                      cy="56"
                      rx="38"
                      ry="20"
                      fill="none"
                      stroke="#E8B7BE"
                      strokeWidth="1.2"
                      strokeDasharray="3 3"
                    />
                    <circle cx="95" cy="48" r="2" fill="#D6B15E" />
                    <circle cx="145" cy="48" r="2" fill="#D6B15E" />
                    <circle cx="120" cy="34" r="2.5" fill="#D6B15E" />
                  </motion.g>
                )}
              </AnimatePresence>

              {/* -------------------------------------------------------------
                  LAYER 4: NAME & LABELS (Vocal Resonance Ring at Throat)
                  ------------------------------------------------------------- */}
              <AnimatePresence>
                {!removedLayers.has('name') && (
                  <motion.ellipse
                    key="layer-name"
                    cx="120"
                    cy="88"
                    rx="30"
                    ry="11"
                    fill="none"
                    stroke="#B8A9D1"
                    strokeWidth="1.3"
                    strokeDasharray="3 3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.85 }}
                    exit={{ opacity: 0, scale: 1.25, filter: 'blur(5px)' }}
                    transition={{ duration: 0.5 }}
                    className="cursor-pointer"
                    onClick={() => {
                      const item = IDENTITY_LAYERS.find((l) => l.id === 'name');
                      if (item) handleRemoveLayer(item);
                    }}
                  />
                )}
              </AnimatePresence>

              {/* -------------------------------------------------------------
                  LAYER 2: EMOTIONS (Heart Center Lotus Pulse)
                  ------------------------------------------------------------- */}
              <AnimatePresence>
                {!removedLayers.has('emotions') && (
                  <motion.circle
                    key="layer-emotions"
                    cx="120"
                    cy="120"
                    r="32"
                    fill="url(#yogiHeartPulse)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.5, 0.85, 0.5], scale: [0.95, 1.05, 0.95] }}
                    exit={{ opacity: 0, scale: 1.3, filter: 'blur(6px)', transition: { duration: 0.5 } }}
                    transition={{
                      opacity: { duration: 2.5, repeat: Infinity },
                      scale: { duration: 2.5, repeat: Infinity },
                    }}
                    className="cursor-pointer"
                    onClick={() => {
                      const item = IDENTITY_LAYERS.find((l) => l.id === 'emotions');
                      if (item) handleRemoveLayer(item);
                    }}
                  />
                )}
              </AnimatePresence>

              {/* -------------------------------------------------------------
                  LAYER 1: PHYSICAL BODY (Outer Body Contour Sheath)
                  ------------------------------------------------------------- */}
              <AnimatePresence>
                {!removedLayers.has('body') && (
                  <motion.g
                    key="layer-body"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.65 }}
                    exit={{ opacity: 0, scale: 1.15, filter: 'blur(6px)' }}
                    transition={{ duration: 0.5 }}
                    className="cursor-pointer"
                    onClick={() => {
                      const item = IDENTITY_LAYERS.find((l) => l.id === 'body');
                      if (item) handleRemoveLayer(item);
                    }}
                  >
                    <circle cx="120" cy="62" r="24" fill="none" stroke="#24566A" strokeWidth="1.25" strokeDasharray="4 3" />
                    <path
                      d="M120,86 C94,88 72,104 66,132 C60,154 74,180 90,192 C104,200 136,200 150,192 C166,180 180,154 174,132 C168,104 146,88 120,86 Z"
                      fill="none"
                      stroke="#24566A"
                      strokeWidth="1.25"
                      strokeDasharray="4 3"
                    />
                  </motion.g>
                )}
              </AnimatePresence>

              {/* -------------------------------------------------------------
                  CENTRAL SACRED MEDITATOR FIGURE & BLOOMING LOTUS THRONE
                  ------------------------------------------------------------- */}
              <g className="transition-all duration-700">
                {/* Serene Head Aura Halo */}
                <circle
                  cx="120"
                  cy="62"
                  r="28"
                  fill="url(#yogiAuraHalo)"
                  opacity={0.75 + glowIntensity * 0.003}
                />

                {/* Head Silhouette */}
                <circle
                  cx="120"
                  cy="62"
                  r="17"
                  fill="url(#atmanYogiGold)"
                  opacity={0.94 + glowIntensity * 0.001}
                />

                {/* Neck Transition */}
                <path
                  d="M116,78 L116,86 L124,86 L124,78 Z"
                  fill="url(#atmanYogiGold)"
                  opacity={0.92}
                />

                {/* Ajna / Third Eye Point */}
                <circle cx="120" cy="59" r="2.2" fill="#FFFFFF" />

                {/* Graceful Torso in Dhyāna Posture */}
                <path
                  d="M120,84 C104,86 86,98 80,124 C76,144 88,168 100,178 C108,184 132,184 140,178 C152,168 164,144 160,124 C154,98 136,86 120,84 Z"
                  fill="url(#atmanYogiGold)"
                  opacity={0.9 + glowIntensity * 0.001}
                />

                {/* Arms & Hands in Meditation Gesture (Dhyana Mudra) */}
                <path
                  d="M82,110 C76,134 88,162 108,168 C116,170 124,170 132,168 C152,162 164,134 158,110 C152,126 142,150 128,156 L112,156 C98,150 88,126 82,110 Z"
                  fill="url(#atmanYogiGold)"
                  opacity={0.85}
                />

                {/* Folded Crossed Legs (Padmasana) */}
                <path
                  d="M52,180 C46,192 70,206 120,206 C170,206 194,192 188,180 C172,172 68,172 52,180 Z"
                  fill="url(#atmanYogiGold)"
                  opacity={0.92}
                />

                {/* ---------------------------------------------------------
                    UPWARD BLOOMING LOTUS FLOWER THRONE
                    --------------------------------------------------------- */}
                <g className="transition-opacity duration-500" opacity={0.95}>
                  {/* Lotus Throne Pod Base */}
                  <ellipse cx="120" cy="204" rx="68" ry="14" fill="url(#lotusPetalGold)" />

                  {/* Central Upward Blooming Petal */}
                  <path
                    d="M120,186 C114,196 116,210 120,218 C124,210 126,196 120,186 Z"
                    fill="url(#lotusPetalGold)"
                    stroke="#D6B15E"
                    strokeWidth="0.75"
                  />
                  {/* Left Inner Petal */}
                  <path
                    d="M102,188 C94,198 98,212 106,218 C110,210 108,198 102,188 Z"
                    fill="url(#lotusPetalGold)"
                    stroke="#D6B15E"
                    strokeWidth="0.75"
                  />
                  {/* Right Inner Petal */}
                  <path
                    d="M138,188 C146,198 142,212 134,218 C130,210 132,198 138,188 Z"
                    fill="url(#lotusPetalGold)"
                    stroke="#D6B15E"
                    strokeWidth="0.75"
                  />
                  {/* Left Wing Petal */}
                  <path
                    d="M80,192 C72,200 78,214 90,218 C92,210 88,200 80,192 Z"
                    fill="url(#lotusPetalGold)"
                    stroke="#D6B15E"
                    strokeWidth="0.75"
                  />
                  {/* Right Wing Petal */}
                  <path
                    d="M160,192 C168,200 162,214 150,218 C148,210 152,200 160,192 Z"
                    fill="url(#lotusPetalGold)"
                    stroke="#D6B15E"
                    strokeWidth="0.75"
                  />
                  {/* Outer Left Calyx Petal */}
                  <path
                    d="M60,196 C54,204 62,216 74,218 C76,212 70,204 60,196 Z"
                    fill="url(#lotusPetalGold)"
                    stroke="#D6B15E"
                    strokeWidth="0.75"
                  />
                  {/* Outer Right Calyx Petal */}
                  <path
                    d="M180,196 C186,204 178,216 166,218 C164,212 170,204 180,196 Z"
                    fill="url(#lotusPetalGold)"
                    stroke="#D6B15E"
                    strokeWidth="0.75"
                  />
                </g>
              </g>
            </svg>

            {/* Radiant Inner Light Spark when all layers are peeled */}
            {isAllRemoved && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [1, 1.25, 1], opacity: 1 }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute z-20 pointer-events-none"
              >
                <AtmanSparkIcon className="w-24 h-24 text-gold-500 drop-shadow-[0_0_24px_rgba(214,177,94,0.85)]" />
              </motion.div>
            )}
          </div>

          {/* Status Tracker & Glowing Pips */}
          <div className="mt-3 text-center z-10 w-full flex flex-col items-center">
            <p className="text-[11px] font-bold text-gold-800 tracking-[0.18em] uppercase font-sans">
              {isAllRemoved
                ? '✨ ALL EXTERNAL COVERINGS DISSOLVED ✨'
                : `LAYERS REMAINING: ${totalLayers - removedLayers.size} OF ${totalLayers}`}
            </p>

            {/* 6 Glowing Progress Pips */}
            <div className="flex items-center gap-2 mt-2" aria-label="Layers peeled progress">
              {IDENTITY_LAYERS.map((layer) => {
                const isPeeled = removedLayers.has(layer.id);
                return (
                  <motion.div
                    key={layer.id}
                    initial={false}
                    animate={{
                      backgroundColor: isPeeled ? '#E8B7BE' : '#D6B15E',
                      boxShadow: isPeeled
                        ? '0 0 6px rgba(232, 183, 190, 0.6)'
                        : '0 0 10px rgba(214, 177, 94, 0.7)',
                      scale: isPeeled ? 0.9 : 1.1,
                    }}
                    className="w-5 sm:w-6 h-1.5 rounded-full transition-all duration-300"
                    title={`${layer.name}: ${isPeeled ? 'Dissolved' : 'Active'}`}
                  />
                );
              })}
            </div>

            <p className="text-xs text-warm-700 font-quote italic mt-2.5 max-w-xs leading-snug">
              {isAllRemoved
                ? 'Only the eternal conscious observer remains.'
                : 'Tap each layer card on the right to gently dissolve the outer identity.'}
            </p>
          </div>
        </div>

        {/* Right Column: 6 "Dissolve" Layer Cards & Contemplative Insight Callout */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full gap-3.5">
          {/* 6 Layer Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {IDENTITY_LAYERS.map((layer, index) => {
              const isRemoved = removedLayers.has(layer.id);

              return (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => handleRemoveLayer(layer)}
                  aria-pressed={isRemoved}
                  className={`group relative flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-gold-500 cursor-pointer ${
                    isRemoved
                      ? 'bg-ivory-soft/70 border-warm-200/80 text-warm-600 shadow-sm'
                      : 'bg-white hover:bg-white border-gold-400/35 hover:border-gold-500 text-warm-900 hover:-translate-y-0.5 shadow-ujwala-card hover:shadow-ujwala-card-hover active:scale-[0.98]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    {/* Rounded Icon Badge */}
                    <span
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                        isRemoved
                          ? 'bg-warm-100/70 border-warm-200/60 text-warm-400'
                          : 'bg-gradient-to-br from-gold-50 via-blush-light to-white border-gold-300/60 text-warm-900 group-hover:border-gold-500 shadow-sm'
                      }`}
                    >
                      {getLayerIcon(layer.iconName)}
                    </span>

                    {/* Title & Description without text clipping */}
                    <div className="min-w-0">
                      <p
                        className={`text-xs font-bold tracking-wider font-display uppercase ${
                          isRemoved ? 'line-through text-warm-400' : 'text-warm-900'
                        }`}
                      >
                        {index + 1}. {layer.name}
                      </p>
                      <p
                        className={`text-[11.5px] leading-snug font-sans mt-0.5 ${
                          isRemoved ? 'text-warm-400' : 'text-warm-600'
                        }`}
                      >
                        {layer.description}
                      </p>
                    </div>
                  </div>

                  {/* Action Pill Badge / Completed Checkmark */}
                  {isRemoved ? (
                    <span className="shrink-0 px-2.5 py-1 rounded-full text-[10px] font-sans font-semibold border border-blush bg-blush-soft/50 text-warm-800 flex items-center gap-1 shadow-sm">
                      <Check className="w-3 h-3 stroke-[2.5] text-gold-700" />
                      <span>Dissolved</span>
                    </span>
                  ) : (
                    <span className="shrink-0 px-3 py-1 rounded-full text-[10.5px] font-sans font-bold tracking-wide border border-gold-400/50 bg-gold-50 text-gold-800 shadow-sm group-hover:bg-gold-100 group-hover:border-gold-500 group-hover:shadow-ujwala-sm transition-all duration-200">
                      Dissolve
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Contemplative Insight Card */}
          <div ref={teachingSectionRef} className="min-h-[96px] flex items-center scroll-mt-28">
            <AnimatePresence mode="wait">
              {activeTeaching ? (
                <motion.div
                  key={activeTeaching.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="w-full p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-gold-400/40 border-l-4 border-l-gold-500 text-xs sm:text-sm text-warm-900 shadow-ujwala-card"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <DiyaLineArt className="w-4 h-4 text-gold-600 shrink-0" />
                    <span className="font-bold text-gold-800 font-display tracking-wider uppercase text-xs">
                      Insight · {activeTeaching.name}
                    </span>
                  </div>
                  <p className="text-warm-700 font-sans leading-relaxed text-xs sm:text-[13px]">
                    {activeTeaching.teaching}
                  </p>
                </motion.div>
              ) : (
                <div className="w-full p-4 rounded-2xl border border-dashed border-gold-400/35 bg-white/60 text-center flex items-center justify-center gap-2.5 text-xs text-warm-600 font-quote italic shadow-sm">
                  <DiyaLineArt className="w-4 h-4 text-gold-600 shrink-0" />
                  <span>Select any layer card above to contemplate what happens when that identity dissolves.</span>
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
            ref={climaxSectionRef}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 sm:mt-12 mb-8 py-10 px-6 sm:px-10 rounded-3xl text-center max-w-[740px] mx-auto relative overflow-hidden backdrop-blur-2xl bg-white/95 border border-gold-400/50 shadow-ujwala-lg scroll-mt-28"
          >
            {/* Ambient Diffused Top Glow */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-gradient-to-b from-gold-200/30 via-blush-soft/20 to-transparent blur-xl pointer-events-none"
              aria-hidden="true"
            />

            {/* Top Emblem with Delicate Ring */}
            <div className="relative inline-flex items-center justify-center mb-4">
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.35, 0.65, 0.35] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -inset-3 rounded-full bg-gold-300/30 blur-md pointer-events-none"
              />
              <div className="relative p-3 rounded-full bg-gold-50 border border-gold-400/60 ring-2 ring-gold-300/30 text-gold-700 shadow-ujwala-sm">
                <AtmanSparkIcon className="w-7 h-7 text-gold-600" />
              </div>
            </div>

            {/* Overline & Title */}
            <p className="text-[11px] sm:text-xs font-bold tracking-[0.22em] text-gold-800 uppercase font-sans mb-1">
              SACRED REVELATION
            </p>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-warm-900 mb-4 tracking-wide">
              The Changeless Observer
            </h3>

            {/* Sacred Sanskrit Verse */}
            <p className="text-lg sm:text-2xl font-sanskrit font-normal text-warm-900 mb-4 leading-[1.8] tracking-wide">
              देहिनोऽस्मिन्यथा देहे कौमारं यौवनं जरा ।<br />
              तथा देहान्तरप्राप्तिर्धीरस्तत्र न मुह्यति ॥
            </p>

            {/* Sanskrit Meaning Quote Inset */}
            <div className="max-w-xl mx-auto mb-6 text-left rounded-xl p-4 sm:p-5 bg-ivory-soft/80 border-l-2 border-l-gold-500 shadow-sm">
              <blockquote className="text-xs sm:text-sm text-warm-800 font-quote italic leading-relaxed">
                &ldquo;As the embodied soul continuously passes, in this body, from boyhood to youth
                to old age, the soul similarly passes into another body at death. A sober person is
                not bewildered by such a change.&rdquo;
              </blockquote>
              <footer className="text-gold-800 font-sans text-xs font-bold not-italic mt-2 flex items-center gap-1.5">
                <Sparkle className="w-3 h-3 text-gold-600" />
                Bhagavad Gita 2.13
              </footer>
            </div>

            {/* Philosophical Reflection Paragraph */}
            <p className="text-xs sm:text-sm text-warm-700 font-body leading-relaxed max-w-xl mx-auto mb-7">
              When body, emotions, status, labels, and thoughts are stripped away, you are still
              here. An unbroken, changeless conscious presence is watching it all. If you are not any
              of these outer coverings...{' '}
              <span className="text-warm-900 font-bold italic">who are you really?</span>
            </p>

            {/* Radiant Primary CTA Button */}
            <button
              type="button"
              onClick={onContinue}
              className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-warm-900 font-display font-bold text-sm tracking-[0.08em] uppercase transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-gold-500 active:scale-95 shadow-ujwala-md hover:shadow-ujwala-lg cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #FFFDF9 0%, #FAF3DC 50%, #E8D18A 100%)',
                border: '1px solid #D6B15E',
              }}
            >
              <span>Continue to Stage 02 — CONNECT</span>
              <ChevronRight className="w-4 h-4 stroke-[2.5] transform transition-transform duration-200 ease-out group-hover:translate-x-1 text-warm-800" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
