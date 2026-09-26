'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { MYSTERY_BOXES } from '@/lib/constants';
import { MysteryBoxItem } from '@/types';
import {
  Coins,
  Trophy,
  Users,
  Compass,
  SacredLockIcon,
  ChevronRight,
  Sparkle,
  LotusLineArt,
  DiyaLineArt,
  Check,
  UjwalaRadianceIcon,
} from '@/components/ui/icons';
import { UjwalaGlow, LightHalo, IlluminationReveal, GoldenPulse } from '@/components/ui/light-system';
import { AudioManager } from '@/audio/audio-manager';
import confetti from 'canvas-confetti';

interface Level2ContainerProps {
  onComplete: () => void;
  onContinue: () => void;
}

export function Level2Container({ onComplete, onContinue }: Level2ContainerProps) {
  // Box 1 is initially revealed, and Box 2 is ready with "Tap to Open"
  const [openedBoxes, setOpenedBoxes] = useState<Set<number>>(new Set([1]));
  const [activeBoxDetail, setActiveBoxDetail] = useState<MysteryBoxItem | null>(MYSTERY_BOXES[0]);
  const [justOpenedId, setJustOpenedId] = useState<number | null>(null);

  const detailSectionRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const totalBoxes = MYSTERY_BOXES.length;
  const isAllOpened = openedBoxes.size === totalBoxes;

  const handleOpenBox = (box: MysteryBoxItem) => {
    // Sequential rule: cannot open if previous is not opened
    if (box.id > 1 && !openedBoxes.has(box.id - 1)) {
      AudioManager.getInstance().playTick({ volume: 0.15 });
      return;
    }

    const isNewlyOpened = !openedBoxes.has(box.id);

    if (isNewlyOpened) {
      const nextSet = new Set(openedBoxes);
      nextSet.add(box.id);
      setOpenedBoxes(nextSet);
      setJustOpenedId(box.id);

      if (box.isClimax) {
        AudioManager.getInstance().playCelebration();
        onComplete();
        try {
          confetti({
            particleCount: 75,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#D6B15E', '#E8D18A', '#E8B7BE', '#F3D9DC', '#DDD6EA'],
          });
        } catch {
          // Graceful fallback
        }
      } else {
        AudioManager.getInstance().playChime({ pitchMultiplier: 0.95 + box.id * 0.1 });
      }
    } else {
      AudioManager.getInstance().playTick({ volume: 0.1 });
    }

    setActiveBoxDetail(box);

    // Smooth scroll down to details if on mobile
    if (window.innerWidth < 768 && detailSectionRef.current) {
      setTimeout(() => {
        detailSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  };

  const getBoxIcon = (iconName: MysteryBoxItem['iconName'], isClimax?: boolean) => {
    if (isClimax) {
      return <LotusLineArt className="w-6 h-6 text-gold-600" />;
    }
    switch (iconName) {
      case 'money':
        return <Coins className="w-5 h-5 text-gold-600" strokeWidth={1.5} />;
      case 'career':
        return <Trophy className="w-5 h-5 text-gold-600" strokeWidth={1.5} />;
      case 'relationships':
        return <Users className="w-5 h-5 text-blush-500" strokeWidth={1.5} />;
      case 'experiences':
        return <Compass className="w-5 h-5 text-warm-700" strokeWidth={1.5} />;
      case 'purpose':
        return <LotusLineArt className="w-6 h-6 text-gold-600" />;
    }
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-6 sm:py-8" aria-label="Stage 02: Connect — What Do We Chase?">
      {/* ========================================================
          1. LEVEL INTRODUCTION & REFINED HEADER
          ======================================================== */}
      <div className="text-center mb-10 sm:mb-12">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/95 border border-gold-400/45 text-gold-800 text-xs font-sans font-bold tracking-[0.2em] uppercase mb-3 shadow-ujwala-sm">
          <UjwalaRadianceIcon className="w-3.5 h-3.5 text-gold-600" />
          02 • CONNECT
        </span>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-wide text-warm-900 mb-3">
          What Do We Chase?
        </h2>

        <div className="max-w-xl mx-auto space-y-1">
          <p className="text-sm sm:text-base text-warm-700 font-quote italic leading-relaxed">
            &ldquo;Sometimes, what we chase reveals what we believe will make us happy.&rdquo;
          </p>
          <p className="text-xs sm:text-sm text-warm-600 font-sans tracking-wide pt-1 font-medium">
            Examine each worldly pursuit sequentially to uncover the deeper question beneath human striving.
          </p>
        </div>
      </div>

      {/* ========================================================
          2. FIVE-BOX ARRANGEMENT WITH CONNECTING JOURNEY LINE
          ======================================================== */}
      <div className="relative mb-10">
        {/* Subtle connecting golden journey line on desktop/tablet */}
        <div
          className="hidden lg:block absolute top-[90px] left-[10%] right-[10%] h-[1.5px] bg-gradient-to-r from-gold/20 via-gold/40 to-gold/20 pointer-events-none z-0"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-3.5 relative z-10">
          {MYSTERY_BOXES.map((box, index) => {
            const isOpened = openedBoxes.has(box.id);
            const isReady = box.id === 1 || openedBoxes.has(box.id - 1);
            const isLocked = !isOpened && !isReady;
            const isSelected = activeBoxDetail?.id === box.id;
            const isClimax = box.isClimax;
            const isCurrentFocus = isReady && !isOpened;

            // ----------------------------------------------------
            // STATE 1: LOCKED / NOT YET REACHED (Low contrast, subtle)
            // ----------------------------------------------------
            if (isLocked) {
              return (
                <div
                  key={box.id}
                  className="flex flex-col items-center justify-between p-5 rounded-3xl border border-warm-200/50 bg-ivory-soft/60 text-center min-h-[200px] select-none cursor-not-allowed opacity-45 transition-opacity duration-300"
                  aria-label={`Discovery 0${box.id}: Locked. Requires completing previous stage.`}
                  aria-disabled="true"
                >
                  {/* Top Roman Label */}
                  <span className="text-[11px] font-serif tracking-[0.2em] text-warm-400 uppercase">
                    0{box.id}
                  </span>

                  {/* Minimal geometric container with locked symbol */}
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center my-2 bg-warm-100/50 border border-warm-200/40 text-warm-400">
                    <SacredLockIcon className="w-4 h-4 text-warm-400" />
                  </div>

                  {/* Muted Title */}
                  <div className="space-y-0.5">
                    <p className="text-xs font-serif text-warm-400 font-medium">
                      {box.title}
                    </p>
                    <p className="text-[10px] text-warm-400/80 font-sans">
                      Locked
                    </p>
                  </div>

                  {/* Bottom indicator */}
                  <div className="w-1.5 h-1.5 rounded-full bg-warm-300/40 mt-1" />
                </div>
              );
            }

            // ----------------------------------------------------
            // STATE 2: CURRENT (Ready to open) OR COMPLETED (Illuminated)
            // ----------------------------------------------------
            return (
              <button
                key={box.id}
                type="button"
                onClick={() => handleOpenBox(box)}
                aria-label={`Discovery 0${box.id}: ${box.title}. ${isOpened ? 'Illuminated and reviewed.' : 'Ready to open.'}`}
                aria-expanded={isSelected}
                className={`group relative flex flex-col items-center justify-between p-5 rounded-3xl border text-center min-h-[200px] outline-none transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-ivory border-gold ring-2 ring-gold/40 shadow-ujwala-card-hover -translate-y-1'
                    : isCurrentFocus
                    ? 'bg-gradient-to-b from-ivory via-ivory-soft to-ivory border-gold/60 shadow-ujwala-md hover:border-gold hover:-translate-y-1 hover:shadow-ujwala-lg'
                    : 'bg-ivory-soft/90 border-gold/25 hover:border-gold/50 shadow-ujwala-sm hover:shadow-ujwala-md hover:-translate-y-0.5'
                } focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2`}
              >
                {/* Breathing golden glow when current active box */}
                {isCurrentFocus && !shouldReduceMotion && (
                  <UjwalaGlow
                    size="sm"
                    color={isClimax ? 'gold' : 'soft'}
                    intensity={0.4}
                    className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                )}

                {/* Connecting active pointer notch on desktop */}
                {isSelected && (
                  <div
                    className="hidden lg:block absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-ivory border-r border-b border-gold rotate-45 z-20"
                    aria-hidden="true"
                  />
                )}

                {/* Top Number & Tag */}
                <div className="w-full flex items-center justify-between px-1">
                  <span className="text-[11px] font-serif tracking-[0.2em] text-gold-700 uppercase font-semibold">
                    0{box.id}
                  </span>
                  {isOpened && (
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 shadow-ujwala-sm" />
                  )}
                </div>

                {/* Center Object: Geometric container with golden seam & central light */}
                <div className="relative my-2">
                  {isCurrentFocus ? (
                    <LightHalo active={!shouldReduceMotion}>
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-ivory border-2 border-gold/60 shadow-ujwala-sm group-hover:scale-105 transition-transform duration-200">
                        <UjwalaRadianceIcon className="w-5 h-5 text-gold-600 animate-pulse" />
                      </div>
                    </LightHalo>
                  ) : (
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-200 group-hover:scale-105 ${
                        isOpened
                          ? 'bg-ivory border-gold/40 shadow-ujwala-sm text-gold-700'
                          : 'bg-ivory-soft border-gold/30 text-warm-700'
                      }`}
                    >
                      {getBoxIcon(box.iconName, isClimax)}
                    </div>
                  )}
                </div>

                {/* Box Title & Short Tag */}
                <div>
                  <p className="text-xs font-serif font-semibold text-warm-900 tracking-wide">
                    {box.title}
                  </p>
                  <p className="text-[11px] text-warm-500 font-sans mt-0.5 line-clamp-1">
                    {box.tag}
                  </p>
                </div>

                {/* Bottom Action Pill or Revealed State Indicator */}
                <div className="mt-2 w-full pt-1 border-t border-warm-200/50">
                  {isOpened ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-serif text-warm-600 font-medium">
                      <Check className="w-3.5 h-3.5 stroke-[2] text-gold-600" />
                      <span>Illuminated</span>
                    </span>
                  ) : (
                    <motion.span
                      animate={shouldReduceMotion ? {} : { scale: [1, 1.03, 1] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10.5px] font-serif font-semibold tracking-wider border border-gold/50 bg-ivory text-warm-900 shadow-ujwala-sm group-hover:bg-gold-50 transition-colors"
                    >
                      <span>Open</span>
                      <ChevronRight className="w-3 h-3 stroke-[2] text-gold-700" />
                    </motion.span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================
          3. REVEALED CONTENT DETAIL PANEL (LIGHT → REVEAL)
          ======================================================== */}
      <div ref={detailSectionRef}>
        <AnimatePresence mode="wait">
          {activeBoxDetail && (
            <motion.div
              key={activeBoxDetail.id}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-8 rounded-3xl bg-ivory border border-gold/35 shadow-ujwala-card relative overflow-hidden mb-10"
            >
              {/* Subtle background ambient warmth */}
              <UjwalaGlow
                size="md"
                color={activeBoxDetail.isClimax ? 'gold' : 'blush'}
                intensity={0.25}
                className="top-0 right-0"
              />

              {/* Watermarked Lotus Motif */}
              <div
                className="absolute -right-8 -bottom-8 w-48 h-48 opacity-[0.04] text-gold-600 pointer-events-none select-none"
                aria-hidden="true"
              >
                <LotusLineArt className="w-full h-full" />
              </div>

              <div className="flex flex-col sm:flex-row items-start gap-5 relative z-10">
                {/* Highlight Icon Container */}
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 bg-ivory-soft border border-gold/40 text-gold-700 shadow-ujwala-sm">
                  {getBoxIcon(activeBoxDetail.iconName, activeBoxDetail.isClimax)}
                </div>

                {/* Text Information & Spiritual Hierarchy */}
                <div className="flex-1 min-w-0">
                  {/* Category Header */}
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                    <span className="text-xs font-serif tracking-[0.2em] text-gold-700 uppercase flex items-center gap-1.5 font-semibold">
                      <UjwalaRadianceIcon className="w-3.5 h-3.5 text-gold-600" />
                      0{activeBoxDetail.id} • {activeBoxDetail.tag.toUpperCase()}
                    </span>
                    <span className="text-[11px] font-serif text-warm-600 bg-ivory-soft px-3 py-0.5 rounded-full border border-warm-200">
                      Discovery {activeBoxDetail.id} of {totalBoxes}
                    </span>
                  </div>

                  {/* Box Title */}
                  <h3 className="text-xl sm:text-2xl font-display font-medium text-warm-900 mb-2 tracking-wide">
                    {activeBoxDetail.title}
                  </h3>

                  {/* Short Summary Statement */}
                  <p className="text-sm sm:text-base text-gold-800 font-serif italic font-medium mb-3">
                    &ldquo;{activeBoxDetail.shortSummary}&rdquo;
                  </p>

                  {/* Supporting Explanation / Full Teaching */}
                  <p className="text-sm sm:text-base text-warm-700 font-sans leading-relaxed max-w-3xl">
                    {activeBoxDetail.fullTeaching}
                  </p>

                  {/* Sequential Continue Action if next box is ready and not opened */}
                  {activeBoxDetail.id < totalBoxes && !openedBoxes.has(activeBoxDetail.id + 1) && (
                    <div className="mt-5 pt-4 border-t border-warm-200/60 flex items-center justify-between flex-wrap gap-3">
                      <p className="text-xs text-warm-500 font-serif italic">
                        Ready to examine the next pursuit?
                      </p>
                      <button
                        type="button"
                        onClick={() => handleOpenBox(MYSTERY_BOXES[activeBoxDetail.id])}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-ivory-soft hover:bg-white border border-gold/40 text-warm-900 font-serif text-xs font-semibold tracking-wider shadow-ujwala-sm hover:shadow-ujwala-md transition-all active:scale-98"
                      >
                        <span>Unveil Next: 0{activeBoxDetail.id + 1} — {MYSTERY_BOXES[activeBoxDetail.id].title}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-gold-600" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ========================================================
          4. BOX 5 — CLIMAX & FINAL REFLECTION
          ======================================================== */}
      <AnimatePresence>
        {isAllOpened && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 sm:mt-14 mb-8 py-10 px-6 sm:px-12 rounded-3xl text-center max-w-[760px] mx-auto relative overflow-hidden bg-ivory border-2 border-gold/40 shadow-ujwala-halo"
          >
            {/* Luminous Golden Ambient Halo */}
            <UjwalaGlow size="lg" color="gold" intensity={0.4} className="top-0 left-1/2 -translate-x-1/2" />
            <UjwalaGlow size="md" color="blush" intensity={0.2} className="bottom-0 right-10" />

            {/* Top Sacred Diya / Lotus Emblem with Breathing Halo */}
            <div className="relative inline-flex items-center justify-center mb-5">
              <LightHalo active={!shouldReduceMotion}>
                <div className="p-4 rounded-full bg-ivory border border-gold/50 text-gold-600 shadow-ujwala-sm">
                  <LotusLineArt className="w-8 h-8 text-blush-500" />
                </div>
              </LightHalo>
            </div>

            {/* Overline */}
            <p className="relative text-xs font-serif tracking-[0.25em] text-gold-700 uppercase font-semibold mb-2">
              02 • THE SACRED INQUIRY
            </p>

            {/* Philosophical Climax Title */}
            <h3 className="relative text-2xl sm:text-3xl md:text-4xl font-display font-medium text-warm-900 mb-4 tracking-wide">
              Who am I, and what is the purpose of my life?
            </h3>

            {/* Sacred Sanskrit Epiphany */}
            <p className="relative text-2xl sm:text-3xl font-serif font-normal text-gold-800 mb-5 tracking-wider">
              अथातो ब्रह्मजिज्ञासा
            </p>

            {/* Sanskrit Meaning Quote Box */}
            <div className="relative max-w-xl mx-auto mb-6 text-left rounded-2xl p-5 bg-ivory-soft border-l-4 border-l-gold shadow-ujwala-sm">
              <blockquote className="text-xs sm:text-sm text-warm-800 font-serif italic leading-relaxed">
                &ldquo;Athāto brahma-jijñāsā — Now, therefore, in the human form of life, one should
                inquire into the Absolute Truth.&rdquo;
              </blockquote>
              <footer className="text-gold-700 font-serif text-xs font-semibold not-italic mt-2 flex items-center gap-1.5">
                <Sparkle className="w-3.5 h-3.5 text-gold-600" />
                Vedānta-sūtra 1.1.1
              </footer>
            </div>

            {/* Philosophical Reflection Paragraph */}
            <p className="relative text-xs sm:text-sm text-warm-700 font-serif leading-relaxed max-w-xl mx-auto mb-8">
              Money provided comfort, career brought prestige, relationships offered warmth, and
              experiences filled your days — yet after all four, a quiet inner longing remained.
              Human life is sacred because only a conscious soul can pause and ask this ultimate question.
            </p>

            {/* Radiant Primary CTA Button to Level 3 */}
            <button
              type="button"
              onClick={onContinue}
              className="relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-gold-400 via-gold to-gold-500 hover:from-gold-300 hover:to-gold-400 text-warm-900 font-serif font-semibold text-xs sm:text-sm tracking-wider uppercase shadow-ujwala-md hover:shadow-ujwala-halo active:scale-98 transition-all outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <span>Continue to Stage 03 — EXPLORE</span>
              <ChevronRight className="w-4 h-4 text-warm-900" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
