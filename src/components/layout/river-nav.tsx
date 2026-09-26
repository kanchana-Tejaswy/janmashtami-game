'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { StationId } from '@/types';
import { Check } from 'lucide-react';
import { SacredLockIcon, DiyaLineArt, LotusLineArt, UjwalaRadianceIcon } from '@/components/ui/icons';

interface RiverNavProps {
  activeStation: StationId;
  completedStations: Set<StationId>;
  onSelectStation: (id: StationId) => void;
  canEnter: (id: StationId) => { allowed: boolean; reason?: string };
}

/**
 * UJWALA Journey Stages Configuration
 */
const JOURNEY_STAGES = [
  {
    id: '1',
    number: '01',
    romanNumeral: 'I',
    title: 'DISCOVER',
    subtitle: 'Know yourself',
    insightPreview: 'Stage 01 · The Changeless Observer',
  },
  {
    id: '2',
    number: '02',
    romanNumeral: 'II',
    title: 'CONNECT',
    subtitle: 'Connect with others',
    insightPreview: 'Stage 02 · The Human Privilege',
  },
  {
    id: '3',
    number: '03',
    romanNumeral: 'III',
    title: 'EXPLORE',
    subtitle: 'Explore consciousness',
    insightPreview: 'Stage 03 · The Sacred Anchor',
  },
  {
    id: 'final',
    number: '04',
    romanNumeral: 'IV',
    title: 'ILLUMINATE',
    subtitle: 'Discover your light',
    insightPreview: 'Stage 04 · The Soul Revelation',
  },
] as const;

/**
 * UJWALA Journey of Light Progress Stepper
 *
 * Implements:
 * 1. Connecting Track: Anchored from Node 01 center (12.5%) to Node 04 center (87.5%)
 * 2. Inactive Track: Delicate translucent gold/ivory line
 * 3. Active Glowing Track: Fills smoothly with warm gold and blush gradient
 * 4. Active Node: Luminous warm ivory and gold halo with gentle breathing pulse
 * 5. Completed Nodes: Serene blush-ivory medallion with gold checkmark
 * 6. Locked Nodes: Subtle, elegant muted nodes
 */
export function RiverNav({
  activeStation,
  completedStations,
  onSelectStation,
  canEnter,
}: RiverNavProps) {
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
      className="relative max-w-5xl mx-auto px-2 sm:px-6 py-3 mb-10 select-none"
      aria-label="UJWALA Journey Navigation"
    >
      <div className="relative">
        {/* Connecting Track Background */}
        <div
          className="absolute left-[12.5%] right-[12.5%] top-[24px] -translate-y-1/2 h-[2px] bg-warm-200/80 rounded-full pointer-events-none z-0"
          aria-hidden="true"
        />

        {/* Active Illuminated Gold Progress Track */}
        <div
          className="absolute left-[12.5%] top-[24px] -translate-y-1/2 h-[2px] bg-gradient-to-r from-gold-400 via-blush to-gold-500 rounded-full pointer-events-none z-0 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(214,177,94,0.6)]"
          style={{ width: activeLineWidth }}
          aria-hidden="true"
        />

        {/* 4 Journey Stage Columns */}
        <div className="relative z-10 grid grid-cols-4 gap-2 sm:gap-4 items-start">
          {JOURNEY_STAGES.map((stage) => {
            const isActive = activeStation === stage.id;
            const isCompleted = completedStations.has(stage.id as StationId);
            const access = canEnter(stage.id as StationId);
            const isLocked = !access.allowed;
            const isUnlocked = !isLocked && !isActive;

            return (
              <div
                key={stage.id}
                className={`relative flex flex-col items-center text-center group transition-all duration-300 ${
                  isLocked ? 'opacity-40' : 'opacity-100 cursor-pointer'
                }`}
                onClick={() => {
                  if (!isLocked) onSelectStation(stage.id as StationId);
                }}
              >
                {/* Hover Preview Tooltip */}
                {!isLocked && (
                  <div
                    className="opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-warm-900/95 text-[10.5px] text-ivory whitespace-nowrap shadow-md z-30 font-sans tracking-normal border border-gold-400/30"
                    aria-hidden="true"
                  >
                    {stage.insightPreview}
                  </div>
                )}

                {/* Node Button Medallion (48x48px circle) */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isLocked) onSelectStation(stage.id as StationId);
                  }}
                  disabled={isLocked}
                  aria-current={isActive ? 'step' : undefined}
                  aria-label={`Stage ${stage.number}: ${stage.title} ${
                    isLocked ? '(Locked)' : isCompleted ? '(Completed)' : '(Active)'
                  }`}
                  className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-gold-500 select-none ${
                    isActive
                      ? 'scale-110 shadow-ujwala-md'
                      : isCompleted
                      ? 'bg-blush-light hover:scale-105 active:scale-95 border border-blush shadow-sm'
                      : isUnlocked
                      ? 'bg-white hover:bg-ivory-soft text-warm-800 border border-gold-400/50 hover:border-gold-500 hover:scale-105 shadow-ujwala-sm'
                      : 'bg-warm-100 text-warm-400 border border-warm-200 cursor-not-allowed'
                  }`}
                  style={
                    isActive
                      ? {
                          background: 'linear-gradient(135deg, #FFFDF9 0%, #FAF3DC 60%, #E8D18A 100%)',
                          border: '1.5px solid #D6B15E',
                          boxShadow: '0 0 20px rgba(214, 177, 94, 0.4), 0 4px 12px rgba(64, 58, 53, 0.08)',
                        }
                      : isCompleted
                      ? {
                          background: '#FAF2F4',
                          border: '1px solid #E8B7BE',
                        }
                      : undefined
                  }
                >
                  {/* Inside Node: Checkmark / Lock / Stage Number */}
                  {isCompleted && !isActive ? (
                    <Check className="w-4 h-4 text-warm-800 stroke-[2.5]" />
                  ) : isLocked ? (
                    <SacredLockIcon className="w-3.5 h-3.5 text-warm-400" />
                  ) : (
                    <span
                      className={`font-display font-bold text-xs sm:text-sm tracking-wider leading-none ${
                        isActive ? 'text-warm-900' : 'text-warm-700'
                      }`}
                    >
                      {stage.number}
                    </span>
                  )}

                  {/* Active Breathing Pulse Halo */}
                  {isActive && (
                    <motion.div
                      animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.7, 0.35] }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute -inset-2 rounded-full bg-gold-300/30 blur-sm pointer-events-none"
                      aria-hidden="true"
                    />
                  )}
                </button>

                {/* Vertical Rhythm & Stage Labels */}
                <div className="mt-3 flex flex-col items-center w-full px-1">
                  {/* Overline Number */}
                  <span
                    className={`text-[10px] sm:text-[10.5px] font-sans font-semibold tracking-[0.18em] uppercase transition-colors mb-1 ${
                      isActive
                        ? 'text-gold-700 font-bold'
                        : isCompleted
                        ? 'text-warm-600'
                        : isUnlocked
                        ? 'text-warm-500'
                        : 'text-warm-400'
                    }`}
                  >
                    STAGE {stage.number}
                  </span>

                  {/* Stage Title */}
                  <div className="h-[28px] flex items-center justify-center text-center px-1">
                    <p
                      className={`font-display text-xs sm:text-[13px] font-bold tracking-wider uppercase transition-colors text-balance max-w-[150px] ${
                        isActive
                          ? 'text-warm-900 drop-shadow-sm'
                          : isCompleted
                          ? 'text-warm-800'
                          : isUnlocked
                          ? 'text-warm-700 group-hover:text-warm-900'
                          : 'text-warm-400'
                      }`}
                    >
                      {stage.title}
                    </p>
                  </div>

                  {/* Stage Subtitle */}
                  <div className="mt-1 flex items-center justify-center h-4">
                    <span
                      className={`text-[10.5px] sm:text-[11px] font-quote italic tracking-wide transition-colors ${
                        isActive
                          ? 'text-gold-700 font-medium'
                          : isCompleted
                          ? 'text-warm-600'
                          : isUnlocked
                          ? 'text-warm-500 group-hover:text-warm-700'
                          : 'text-warm-400'
                      }`}
                    >
                      {stage.subtitle}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

