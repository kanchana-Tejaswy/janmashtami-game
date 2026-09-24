'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { StationId } from '@/types';
import { SacredLockIcon, Check } from '@/components/ui/icons';

interface RiverNavProps {
  activeStation: StationId;
  completedStations: Set<StationId>;
  onSelectStation: (id: StationId) => void;
  canEnter: (id: StationId) => { allowed: boolean; reason?: string };
}

/**
 * Standardized uppercase station configuration
 */
const STATION_CONFIG = [
  {
    id: '1',
    romanNumeral: 'I',
    title: 'WHO AM I?',
    subtitle: 'Remove the Layers',
    insightPreview: 'Station I · The Changeless Observer',
  },
  {
    id: '2',
    romanNumeral: 'II',
    title: 'WHY IS LIFE SPECIAL?',
    subtitle: '5 Mystery Boxes',
    insightPreview: 'Station II · The Human Privilege',
  },
  {
    id: '3',
    romanNumeral: 'III',
    title: 'WHAT REALLY MAKES ME HAPPY?',
    subtitle: 'Ocean Journey',
    insightPreview: 'Station III · The Sacred Anchor',
  },
  {
    id: 'final',
    romanNumeral: 'IV',
    title: 'THE SACRED MIRROR',
    subtitle: 'Who Are You?',
    insightPreview: 'Station IV · The Ultimate Reflection',
  },
] as const;

/**
 * Premium 4-Station Horizontal Progress Stepper
 *
 * Implements:
 * 1. Connecting Line: Anchored strictly from Node I center (12.5%) to Node IV center (87.5%), with zero overhang.
 * 2. Underlying Inactive Track: Subtle translucent line (rgba(255, 255, 255, 0.12)) behind all nodes.
 * 3. Active Glowing Track: Smoothly fills distance exactly to the active station center.
 * 4. Typography Rhythm: Locked title container height ensuring all 4 subtitles share the exact same baseline.
 * 5. Completed Nodes: Refined luminous teal glass badge (rgba(20, 184, 166, 0.2)) with dead-center checkmark.
 * 6. Active Node: Warm amber sun orb with layered glow (box-shadow: 0 0 24px rgba(245, 158, 11, 0.5)), obsidian bold numeral, and breathing pulse.
 * 7. Hover Preview Tooltip: Displays station realization preview on hover.
 */
export function RiverNav({
  activeStation,
  completedStations,
  onSelectStation,
  canEnter,
}: RiverNavProps) {
  // Line span is from Node 1 (12.5%) to Node 4 (87.5%) = 75% total container width.
  // Active progress fills to the exact center of the current active station.
  const activeLineWidth =
    activeStation === '1'
      ? '0%'
      : activeStation === '2'
      ? '33.333%'
      : activeStation === '3'
      ? '66.666%'
      : '100%';

  return (
    <nav
      className="relative max-w-5xl mx-auto px-2 sm:px-6 py-4 mb-8 select-none"
      aria-label="Vrindavan Quest Navigation Stepper"
    >
      <div className="relative">
        {/* ========================================================
            CONNECTING TRACK: Anchored strictly from Node I (12.5%)
            to Node IV (87.5%) at exact vertical node midpoint (24px)
            ======================================================== */}
        {/* Inactive Underlying Track */}
        <div
          className="absolute left-[12.5%] right-[12.5%] top-[24px] -translate-y-1/2 h-[3px] bg-white/[0.12] rounded-full pointer-events-none z-0"
          aria-hidden="true"
        />

        {/* Active Glowing Teal/Gold Progress Track */}
        <div
          className="absolute left-[12.5%] top-[24px] -translate-y-1/2 h-[3px] bg-gradient-to-r from-teal-400 via-teal-300 to-amber-400 rounded-full pointer-events-none z-0 transition-all duration-700 ease-out shadow-[0_0_12px_rgba(20,184,166,0.8)]"
          style={{ width: activeLineWidth }}
          aria-hidden="true"
        />

        {/* ========================================================
            4 MILESTONE COLUMNS (Grid Alignment)
            ======================================================== */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08, delayChildren: 0.1 },
            },
          }}
          className="relative z-10 grid grid-cols-4 gap-2 sm:gap-4 items-start"
        >
          {STATION_CONFIG.map((st) => {
            const isActive = activeStation === st.id;
            const isCompleted = completedStations.has(st.id as StationId);
            const access = canEnter(st.id as StationId);
            const isLocked = !access.allowed;
            const isUnlocked = !isLocked && !isActive;

            return (
              <motion.div
                key={st.id}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                }}
                className={`relative flex flex-col items-center text-center group transition-opacity duration-300 ${
                  isLocked ? 'opacity-45' : 'opacity-100 cursor-pointer'
                }`}
                onClick={() => {
                  if (!isLocked) onSelectStation(st.id as StationId);
                }}
              >
                {/* Hover Preview Tooltip for Accessible Stations */}
                {!isLocked && (
                  <div
                    className="opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-slate-900/95 border border-teal-500/30 text-[10px] text-teal-200 whitespace-nowrap shadow-xl z-30 font-sans tracking-normal"
                    aria-hidden="true"
                  >
                    {st.insightPreview}
                  </div>
                )}

                {/* Node Button Medallion (48x48px circle, z-index: 10) */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isLocked) onSelectStation(st.id as StationId);
                  }}
                  disabled={isLocked}
                  aria-current={isActive ? 'step' : undefined}
                  aria-label={`Station ${st.romanNumeral}: ${st.title} ${
                    isLocked ? '(Locked)' : isCompleted ? '(Completed)' : '(Active)'
                  }`}
                  className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-amber-400 select-none ${
                    isActive
                      ? 'scale-110'
                      : isCompleted
                      ? 'hover:scale-[1.08] active:scale-95'
                      : isUnlocked
                      ? 'bg-peacock-900 hover:bg-peacock-850 text-ivory border-2 border-amber-400/40 hover:border-amber-300 hover:scale-105 shadow-glass-card hover:shadow-divine-sm'
                      : 'bg-slate-950/85 text-ivory-dim/40 border border-white/[0.08] cursor-not-allowed shadow-inner'
                  }`}
                  style={
                    isActive
                      ? {
                          background:
                            'radial-gradient(circle at 35% 35%, #FDE68A 0%, #F59E0B 60%, #D97706 100%)',
                          border: '1.5px solid rgba(254, 240, 138, 0.7)',
                          boxShadow:
                            '0 0 24px rgba(245, 158, 11, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.6)',
                        }
                      : isCompleted
                      ? {
                          background: 'rgba(20, 184, 166, 0.2)',
                          border: '1px solid rgba(45, 212, 191, 0.6)',
                          boxShadow: '0 0 16px rgba(20, 184, 166, 0.3)',
                        }
                      : undefined
                  }
                >
                  {/* Inside Node: Checkmark / Lock / Roman Numeral */}
                  {isCompleted && !isActive ? (
                    <Check className="w-5 h-5 text-teal-200 stroke-[2.5] drop-shadow-[0_0_4px_rgba(45,212,191,0.6)]" />
                  ) : isLocked ? (
                    <SacredLockIcon className="w-4 h-4 text-ivory-dim/50" />
                  ) : (
                    <span
                      className={`font-display font-extrabold text-sm sm:text-base tracking-wider leading-none ${
                        isActive ? 'text-[#0F172A]' : 'text-ivory'
                      }`}
                    >
                      {st.romanNumeral}
                    </span>
                  )}

                  {/* Active Breathing Pulse Halo */}
                  {isActive && (
                    <motion.div
                      animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.7, 0.35] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute -inset-2.5 rounded-full bg-amber-400/25 blur-md pointer-events-none"
                      aria-hidden="true"
                    />
                  )}
                </button>

                {/* Vertical Rhythm & Baseline Alignment */}
                <div className="mt-3 flex flex-col items-center w-full px-1">
                  {/* Overline: Standardized 11px-12px, tracking: 0.18em */}
                  <span
                    className={`text-[11px] sm:text-xs font-sans font-semibold tracking-[0.18em] uppercase transition-colors mb-1.5 ${
                      isActive
                        ? 'text-amber-400 font-bold'
                        : isCompleted
                        ? 'text-teal-400 group-hover:text-teal-300'
                        : isUnlocked
                        ? 'text-amber-400/70'
                        : 'text-ivory-dim/40'
                    }`}
                  >
                    STATION {st.romanNumeral}
                  </span>

                  {/* Fixed Height Title Container: Guarantees Identical Baseline for Subtitles */}
                  <div className="h-[42px] flex items-center justify-center text-center px-1">
                    <p
                      className={`font-display text-xs sm:text-[13px] font-bold leading-snug tracking-wider uppercase transition-colors text-balance max-w-[160px] ${
                        isActive
                          ? 'text-gold-200 drop-shadow-[0_1px_8px_rgba(245,158,11,0.45)]'
                          : isCompleted
                          ? 'text-ivory-dim group-hover:text-ivory'
                          : isUnlocked
                          ? 'text-ivory/90 group-hover:text-gold-200'
                          : 'text-ivory-dim/40'
                      }`}
                    >
                      {st.title}
                    </p>
                  </div>

                  {/* Subtitle / Active Status Pip (Aligned to Exact Same Baseline) */}
                  <div className="mt-1.5 flex items-center justify-center h-5">
                    {isActive ? (
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B] animate-pulse shrink-0" />
                        <span className="text-[10.5px] sm:text-[11px] text-amber-300 font-sans font-semibold tracking-wide">
                          {st.subtitle}
                        </span>
                      </div>
                    ) : (
                      <span
                        className={`text-[10.5px] sm:text-[11px] font-sans tracking-wide transition-colors ${
                          isCompleted
                            ? 'text-teal-400/90'
                            : isUnlocked
                            ? 'text-teal-400/70 group-hover:text-teal-300'
                            : 'text-ivory-dim/30'
                        }`}
                      >
                        {st.subtitle}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </nav>
  );
}
