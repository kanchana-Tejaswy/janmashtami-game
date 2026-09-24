'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  PeacockFeatherIcon,
  SacredLotusIcon,
  Check,
} from '@/components/ui/icons';
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

  const totalBoxes = MYSTERY_BOXES.length;
  const isAllOpened = openedBoxes.size === totalBoxes;

  const handleOpenBox = (box: MysteryBoxItem) => {
    // Sequential validation: cannot open if previous is not opened
    if (box.id > 1 && !openedBoxes.has(box.id - 1)) {
      AudioManager.getInstance().playTick({ volume: 0.15 });
      return;
    }

    if (!openedBoxes.has(box.id)) {
      const nextSet = new Set(openedBoxes);
      nextSet.add(box.id);
      setOpenedBoxes(nextSet);

      if (box.isClimax) {
        AudioManager.getInstance().playCelebration();
        onComplete();
        try {
          confetti({
            particleCount: 65,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#fef08a', '#fbbf24', '#f59e0b', '#14b8a6'],
          });
        } catch {
          // Graceful fallback
        }
      } else {
        AudioManager.getInstance().playChime({ pitchMultiplier: 0.9 + box.id * 0.12 });
      }
    } else {
      AudioManager.getInstance().playTick({ volume: 0.1 });
    }

    setActiveBoxDetail(box);
  };

  const getBoxIcon = (iconName: MysteryBoxItem['iconName'], isClimax?: boolean) => {
    if (isClimax) {
      return <PeacockFeatherIcon className="w-5 h-5 text-gold-300" />;
    }
    switch (iconName) {
      case 'money':
        return <Coins className="w-5 h-5 text-amber-400" />;
      case 'career':
        return <Trophy className="w-5 h-5 text-amber-400" />;
      case 'relationships':
        return <Users className="w-5 h-5 text-teal-300" />;
      case 'experiences':
        return <Compass className="w-5 h-5 text-teal-300" />;
      case 'purpose':
        return <SacredLotusIcon className="w-5 h-5 text-gold-300" />;
    }
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-6" aria-label="Station 2: The Human Privilege">
      {/* Station Kicker & Intro Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-10 sm:mb-12"
      >
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-peacock-900/80 border border-teal-500/30 text-teal-300 text-xs font-semibold tracking-[0.15em] uppercase mb-4 shadow-[0_0_15px_rgba(20,184,166,0.15)]">
          <Sparkle className="w-3.5 h-3.5 text-gold-400" />
          STATION II • THE HUMAN PRIVILEGE
        </span>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-b from-white via-gold-100 to-gold-300 drop-shadow-[0_0_30px_rgba(245,158,11,0.25)] mb-4">
          WHY IS LIFE SPECIAL?
        </h2>

        <div className="max-w-xl mx-auto space-y-1">
          <p className="text-sm sm:text-base text-ivory/60 font-body">
            Animals eat, sleep, defend, and mate.
          </p>
          <p className="text-sm sm:text-base text-gold-100 font-quote italic font-medium leading-relaxed drop-shadow-sm">
            Only in the human form can consciousness ask: What is the true purpose behind all our striving?
          </p>
        </div>
      </motion.div>

      {/* 5 Mystery Boxes Sequential Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-8">
        {MYSTERY_BOXES.map((box) => {
          const isOpened = openedBoxes.has(box.id);
          const isReady = box.id === 1 || openedBoxes.has(box.id - 1);
          const isLocked = !isOpened && !isReady;
          const isSelected = activeBoxDetail?.id === box.id;

          // 1. LOCKED CARD: Minimalist, clean, zero redundant text
          if (isLocked) {
            return (
              <div
                key={box.id}
                className="flex flex-col items-center justify-between p-4 rounded-3xl border border-white/[0.04] bg-slate-950/50 backdrop-blur-md text-center min-h-[195px] select-none cursor-not-allowed"
                aria-label={`${box.romanNumeral}: Locked. Requires previous box.`}
              >
                {/* Top Label: "BOX [N]" (muted, 50% opacity) */}
                <span className="text-[11px] font-display tracking-widest text-ivory/50 uppercase">
                  {box.romanNumeral}
                </span>

                {/* Center: Standardized 44x44px Rounded Square Glass Icon Badge */}
                <div
                  className="w-[44px] h-[44px] rounded-[12px] flex items-center justify-center my-2 transition-transform duration-200"
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <SacredLockIcon className="w-5 h-5 text-slate-500/60" />
                </div>

                {/* Bottom Hint */}
                <p className="text-[12px] text-[#64748B] font-sans mt-auto">
                  Requires previous
                </p>
              </div>
            );
          }

          // 2. UNLOCKED OR OPENED CARD: Interactive, cohesive
          return (
            <button
              key={box.id}
              type="button"
              onClick={() => handleOpenBox(box)}
              aria-label={`${box.romanNumeral}: ${box.title} ${isOpened ? '(Revealed)' : '(Ready to open)'}`}
              className={`group relative flex flex-col items-center justify-between p-4 rounded-3xl border transition-all duration-300 text-center min-h-[195px] outline-none focus-visible:ring-2 focus-visible:ring-sky-400 hover:-translate-y-[3px] ${
                isSelected
                  ? 'bg-slate-900/85 backdrop-blur-md border-sky-400/50 shadow-[0_0_24px_-4px_rgba(56,189,248,0.25)]'
                  : isOpened
                  ? 'bg-slate-900/65 backdrop-blur-md border-white/[0.08] hover:border-sky-400/40'
                  : 'bg-slate-900/80 backdrop-blur-md border-amber-400/40 hover:border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.12)]'
              }`}
            >
              {/* Connecting notch pointing down to detail panel when selected */}
              {isSelected && (
                <div
                  className="hidden lg:block absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 border-r border-b border-sky-400/50 rotate-45 z-20"
                  aria-hidden="true"
                />
              )}

              {/* Box Top Label */}
              <span className="text-[11px] font-display tracking-widest text-gold-300 uppercase">
                {box.romanNumeral}
              </span>

              {/* Standardized 44x44px Rounded Square Glass Icon Badge */}
              <div
                className="w-[44px] h-[44px] rounded-[12px] flex items-center justify-center my-2 transition-transform duration-200 group-hover:scale-105"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                {isOpened ? (
                  getBoxIcon(box.iconName, box.isClimax)
                ) : (
                  <Sparkle className="w-5 h-5 text-amber-400 animate-pulse" />
                )}
              </div>

              {/* Box Title & Subtitle */}
              <div>
                <p className="text-xs font-semibold font-display text-ivory tracking-wide">
                  {box.title}
                </p>
                <p className="text-[11px] text-ivory-dim/60 font-sans mt-0.5 line-clamp-1">
                  {box.tag}
                </p>
              </div>

              {/* Bottom Action Pill or Revealed Badge */}
              <div className="mt-2">
                {isOpened ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-sans font-medium text-teal-300">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Revealed</span>
                  </span>
                ) : (
                  <motion.span
                    animate={{ scale: [1, 1.03, 1], opacity: [0.92, 1, 0.92] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-sans font-semibold tracking-wide border border-amber-400/50 bg-amber-500/15 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)] group-hover:bg-amber-500/30 group-hover:border-amber-300 group-hover:text-amber-100 group-hover:shadow-[0_0_16px_rgba(245,158,11,0.35)] transition-all duration-200"
                  >
                    <span>Tap to Open</span>
                    <ChevronRight className="w-3 h-3 stroke-[2.5]" />
                  </motion.span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Box Detail Card (Visually Anchored to Active Box Above) */}
      <AnimatePresence mode="wait">
        {activeBoxDetail && (
          <motion.div
            key={activeBoxDetail.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="p-6 sm:p-8 rounded-3xl bg-peacock-950/80 backdrop-blur-xl border border-sky-500/30 border-t-2 border-t-sky-400/70 shadow-[0_0_30px_-5px_rgba(56,189,248,0.18),0_20px_40px_-15px_rgba(6,16,36,0.8)] relative overflow-hidden mb-8"
          >
            {/* Subtle Watermarked Lotus Motif in bottom-right corner */}
            <div
              className="absolute -right-6 -bottom-6 w-44 h-44 opacity-[0.06] text-teal-300 pointer-events-none select-none"
              aria-hidden="true"
            >
              <SacredLotusIcon className="w-full h-full" />
            </div>

            <div className="flex items-start gap-5 relative z-10">
              {/* Highlight Icon Container */}
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 bg-peacock-900/85 border border-gold-400/30 text-gold-300 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
                {getBoxIcon(activeBoxDetail.iconName, activeBoxDetail.isClimax)}
              </div>

              {/* Text Information with Enhanced Balance */}
              <div className="flex-1 min-w-0">
                {/* Header Breadcrumbs */}
                <div className="flex items-center justify-between flex-wrap gap-2 mb-1.5">
                  <span className="text-xs font-display tracking-[0.16em] text-gold-300 uppercase flex items-center gap-1.5">
                    <Sparkle className="w-3.5 h-3.5 text-gold-400" />
                    {activeBoxDetail.romanNumeral.toUpperCase()} • {activeBoxDetail.tag.toUpperCase()}
                  </span>
                  <span className="text-xs font-sans font-medium text-teal-300 bg-teal-950/70 px-3 py-1 rounded-full border border-teal-500/30 shadow-[0_0_10px_rgba(20,184,166,0.15)]">
                    Human Pursuit
                  </span>
                </div>

                {/* Box Title */}
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-ivory mb-2.5 tracking-wide">
                  {activeBoxDetail.title}
                </h3>

                {/* Revelation Teaching Paragraph: Expanded line-height (1.7) & size (15-16px) */}
                <p className="text-[15px] sm:text-[16px] text-ivory-dim font-body leading-[1.7] max-w-3xl">
                  {activeBoxDetail.fullTeaching}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Climax Station 2 Reveal (When Box 5 is opened) */}
      <AnimatePresence>
        {isAllOpened && (
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
                <PeacockFeatherIcon className="w-8 h-10" />
              </div>
            </div>

            {/* Overline & Title */}
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-gold-400 uppercase font-sans mb-1.5">
              THE SACRED INQUIRY
            </p>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-ivory mb-5 tracking-wide">
              Who am I, and what is the purpose of my life?
            </h3>

            {/* Sacred Sanskrit Verse */}
            <p
              className="text-lg sm:text-2xl font-sanskrit font-normal text-amber-200 mb-5 leading-[1.8] tracking-wide"
              style={{
                textShadow: '0 0 12px rgba(253, 230, 138, 0.25)',
                color: '#FDE68A',
              }}
            >
              अथातो ब्रह्मजिज्ञासा
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
                &ldquo;Athāto brahma-jijñāsā — Now, therefore, in the human form of life, one should
                inquire into the Absolute Truth.&rdquo;
              </blockquote>
              <footer className="text-gold-400 font-sans text-xs font-medium not-italic mt-2 flex items-center gap-1.5">
                <Sparkle className="w-3 h-3 text-gold-400" />
                Vedānta-sūtra 1.1.1
              </footer>
            </div>

            {/* Philosophical Reflection Paragraph */}
            <p className="text-xs sm:text-sm text-ivory-dim font-body leading-relaxed max-w-xl mx-auto mb-8">
              Money provided comfort, career brought prestige, relationships offered warmth, and
              experiences filled your days — yet after all four, a quiet inner longing remained.
              Human life is sacred because only a human being can ask this ultimate question.
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
              <span>Continue to Station III</span>
              <ChevronRight className="w-4 h-4 stroke-[2.5] transform transition-transform duration-200 ease-out group-hover:translate-x-1" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
