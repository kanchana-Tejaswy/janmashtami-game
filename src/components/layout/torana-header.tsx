'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, PeacockFeatherIcon, GoldenFluteIcon, Sparkle } from '@/components/ui/icons';

interface ToranaHeaderProps {
  isSoundOn: boolean;
  onToggleSound: () => void;
}

/**
 * Premium Torana Gateway Header
 *
 * Implements:
 * - Sacred canopy arch with central kalasha ornament & gentle golden glow
 * - Symmetrical, tight JANMASHTAMI jewel badge
 * - Grand presence for "JOURNEY TO THE SOUL" with high-contrast serif typography
 * - Balanced italic subheading with text-wrap: balance
 * - Harmonious button family in the top-right (zero awkward solid black boxes)
 * - Staggered sequential entrance animation
 */
export function ToranaHeader({ isSoundOn, onToggleSound }: ToranaHeaderProps) {
  return (
    <header className="relative w-full pt-4 pb-6 overflow-hidden select-none" role="banner">
      {/* Sacred Arch Canopy Backdrop (Gently crowns the top without crossing buttons) */}
      <div className="absolute inset-x-0 top-0 h-28 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Soft Radial Spiritual Illumination */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-32 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.18)_0%,rgba(20,184,166,0.06)_50%,transparent_75%)] blur-2xl" />

        {/* Delicate Golden Torana Arch Line */}
        <svg
          className="w-full h-16 opacity-70"
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="toranaGoldGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#b45309" stopOpacity="0" />
              <stop offset="20%" stopColor="#b45309" stopOpacity="0.4" />
              <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#fef08a" stopOpacity="1" />
              <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.8" />
              <stop offset="80%" stopColor="#b45309" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
            </linearGradient>
            <filter id="archGlowFilter" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <path
            d="M0,48 C350,6 850,6 1200,48"
            stroke="url(#toranaGoldGrad)"
            strokeWidth="2"
            fill="none"
            filter="url(#archGlowFilter)"
          />
          <path
            d="M80,52 C400,16 800,16 1120,52"
            stroke="url(#toranaGoldGrad)"
            strokeWidth="0.75"
            fill="none"
            opacity="0.45"
          />
        </svg>

        {/* Center Golden Kalasha Finial */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 opacity-85">
          <span className="w-1.5 h-1.5 rotate-45 bg-gold-400 shadow-divine-sm" />
          <span className="w-2.5 h-2.5 rotate-45 bg-gradient-to-br from-gold-100 to-gold-500 shadow-divine-md" />
          <span className="w-1.5 h-1.5 rotate-45 bg-gold-400 shadow-divine-sm" />
        </div>
      </div>

      {/* Main Header Row with Staggered Entrance */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: -10 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, staggerChildren: 0.1, delayChildren: 0.05 },
          },
        }}
        className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between relative z-10"
      >
        {/* Left: Peacock Feather Glass Medallion */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -15 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
          }}
          className="flex items-center gap-3"
        >
          <div className="relative p-2 sm:p-2.5 rounded-full bg-peacock-900/60 hover:bg-peacock-850/80 border border-teal-500/35 shadow-teal-glow backdrop-blur-md transition-all duration-300 hover:scale-105 group">
            <PeacockFeatherIcon className="w-7 h-9 sm:w-8 sm:h-10 text-teal-400 drop-shadow-[0_0_8px_rgba(20,184,166,0.5)]" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-gold-400 shadow-divine-sm" />
          </div>
          <div className="hidden md:flex flex-col text-left">
            <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-teal-300 uppercase">
              Vrindavan Quest
            </span>
            <span className="text-[11px] font-display text-gold-300/90 font-medium">
              A Sacred Discovery
            </span>
          </div>
        </motion.div>

        {/* Center: Title & Spiritual Branding */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.96 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
          }}
          className="text-center px-2 flex flex-col items-center max-w-lg"
        >
          {/* Symmetrical Janmashtami Jewel Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-peacock-900/80 border border-gold-500/35 text-gold-300 text-[10px] sm:text-[11px] font-sans font-semibold tracking-[0.25em] uppercase shadow-divine-sm mb-2">
            <Sparkle className="w-3 h-3 text-gold-400 flex-shrink-0" />
            <span>JANMASHTAMI</span>
            <Sparkle className="w-3 h-3 text-gold-400 flex-shrink-0" />
          </div>

          {/* Grand Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-display font-extrabold tracking-[0.06em] text-transparent bg-clip-text bg-gradient-to-b from-ivory via-ivory to-gold-100 drop-shadow-[0_4px_16px_rgba(6,16,36,0.95)] leading-tight text-balance uppercase">
            JOURNEY TO THE SOUL
          </h1>

          {/* Balanced Subtitle */}
          <p className="text-xs sm:text-sm md:text-base text-ivory-dim font-quote italic tracking-wide mt-1 text-balance">
            An inner voyage through Vrindavan
          </p>
        </motion.div>

        {/* Right: Harmonious Button Family (Sound Toggle & Golden Flute) */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 15 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
          }}
          className="flex items-center gap-2.5 sm:gap-3"
        >
          {/* Decorative Golden Flute Pill (Matches Sound button height, radius, and glassmorphism) */}
          <div className="hidden lg:flex items-center justify-center h-10 px-4 rounded-full bg-peacock-900/60 border border-gold-500/30 shadow-glass-card backdrop-blur-md transition-all duration-300 hover:border-gold-400/60 hover:shadow-divine-sm">
            <GoldenFluteIcon className="w-12 h-4 text-gold-300 drop-shadow-[0_0_6px_rgba(245,158,11,0.5)]" />
          </div>

          {/* Sound Toggle Button (Part of the same button family) */}
          <button
            onClick={onToggleSound}
            type="button"
            className={`group relative flex items-center gap-2 h-10 px-4 sm:px-5 rounded-full border transition-all duration-300 backdrop-blur-md outline-none focus-visible:ring-2 focus-visible:ring-gold-400 select-none ${
              isSoundOn
                ? 'bg-gradient-to-r from-peacock-850 to-peacock-900 border-gold-400/70 text-gold-200 shadow-divine-sm ring-1 ring-gold-400/30 active:scale-95'
                : 'bg-peacock-900/60 hover:bg-peacock-800/80 border-gold-500/30 hover:border-gold-400 text-ivory-dim hover:text-ivory active:scale-95 shadow-glass-card hover:shadow-divine-sm'
            }`}
            aria-label={isSoundOn ? 'Mute ambient Vrindavan sound' : 'Unmute ambient Vrindavan sound'}
          >
            {isSoundOn ? (
              <div className="relative flex items-center justify-center">
                <Volume2 className="w-4 h-4 text-gold-300 animate-pulse" />
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-gold-400 animate-ping" />
              </div>
            ) : (
              <VolumeX className="w-4 h-4 text-ivory-dim/75 group-hover:text-ivory transition-colors" />
            )}
            <span className="text-xs font-sans font-semibold tracking-wide">
              {isSoundOn ? 'Sound On' : 'Sound'}
            </span>
          </button>
        </motion.div>
      </motion.div>
    </header>
  );
}
