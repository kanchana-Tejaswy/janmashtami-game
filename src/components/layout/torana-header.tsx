'use client';

import React from 'react';
import { Volume2, VolumeX, Sparkle } from 'lucide-react';
import { UjwalaRadianceIcon, LotusLineArt } from '@/components/ui/icons';
import { UjwalaGlow, LightHalo } from '@/components/ui/light-system';

interface ToranaHeaderProps {
  isSoundOn: boolean;
  onToggleSound: () => void;
}

/**
 * UJWALA Festival Hero Header
 *
 * Implements:
 * - Central focal point: "UJWALA — LET YOUR LIGHT SHINE"
 * - Subtle, diffused warm-gold radial glow / halo behind the title
 * - Feminine, spiritual, elegant typography & whitespace hierarchy
 * - Delicate lotus line-art ornament
 * - Harmonious sound toggle with live equalizer wave animation
 */
export function ToranaHeader({ isSoundOn, onToggleSound }: ToranaHeaderProps) {
  return (
    <header className="relative w-full pt-6 pb-8 sm:pt-8 sm:pb-12 overflow-hidden select-none" role="banner">
      {/* Central Diffused Soft Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 pointer-events-none overflow-hidden flex items-center justify-center" aria-hidden="true">
        <UjwalaGlow size="hero" color="gold" intensity={0.35} />
        <UjwalaGlow size="lg" color="blush" intensity={0.25} className="translate-y-8" />
      </div>

      {/* Main Header Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Top Control Bar: Brand Pip & Sound Toggle */}
        <div className="flex items-center justify-between mb-4 sm:mb-8">
          {/* Left: Minimal UJWALA Emblem */}
          <div className="flex items-center gap-2.5">
            <div className="relative p-2 rounded-full bg-white/90 border border-gold-400/50 shadow-ujwala-sm backdrop-blur-md">
              <UjwalaRadianceIcon className="w-5 h-5 text-gold-600" />
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-[10px] font-sans font-bold tracking-[0.22em] text-gold-800 uppercase">
                UJWALA FESTIVAL
              </span>
              <span className="text-[11.5px] font-quote italic text-warm-700 font-medium">
                A Journey from Within
              </span>
            </div>
          </div>

          {/* Right: Sound Toggle Button with Live Audio Visualizer */}
          <div>
            <button
              onClick={onToggleSound}
              type="button"
              className={`group relative flex items-center gap-2.5 h-9 px-4 sm:px-4.5 rounded-full border transition-all duration-300 backdrop-blur-md outline-none focus-visible:ring-2 focus-visible:ring-gold-500 select-none cursor-pointer ${
                isSoundOn
                  ? 'bg-white/95 border-gold-500 text-warm-900 shadow-ujwala-sm ring-1 ring-gold-400/40 active:scale-95'
                  : 'bg-white/80 hover:bg-white border-gold-400/40 hover:border-gold-500 text-warm-700 hover:text-warm-900 active:scale-95 shadow-sm'
              }`}
              aria-label={isSoundOn ? 'Mute ambient soundscape' : 'Unmute ambient soundscape'}
            >
              {isSoundOn ? (
                <div className="flex items-center gap-1">
                  {/* Miniature Animated Sound Equalizer Bars */}
                  <span className="w-0.5 h-3 bg-gold-600 rounded-full animate-pulse" />
                  <span className="w-0.5 h-4 bg-gold-500 rounded-full animate-bounce" style={{ animationDuration: '0.6s' }} />
                  <span className="w-0.5 h-2.5 bg-gold-600 rounded-full animate-pulse" style={{ animationDuration: '0.8s' }} />
                </div>
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-warm-500 group-hover:text-warm-800 transition-colors" />
              )}
              <span className="text-xs font-sans font-semibold tracking-wide">
                {isSoundOn ? 'Sound On' : 'Sound'}
              </span>
            </button>
          </div>
        </div>

        {/* Central Visual Focal Point: UJWALA Hero Typography */}
        <div className="text-center px-2 flex flex-col items-center max-w-2xl mx-auto">
          {/* Spiritual Overline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/95 border border-gold-400/45 text-gold-800 text-[10.5px] sm:text-[11px] font-sans font-bold tracking-[0.24em] uppercase shadow-ujwala-sm mb-3">
            <Sparkle className="w-3 h-3 text-gold-600 flex-shrink-0" />
            <span>A JOURNEY FROM WITHIN</span>
            <Sparkle className="w-3 h-3 text-gold-600 flex-shrink-0" />
          </div>

          {/* Grand Main Title: UJWALA */}
          <div className="relative inline-block my-1">
            {/* Breathing Behind-Title Halo */}
            <LightHalo active={true}>
              <h1 className="relative text-5xl sm:text-6xl md:text-7xl lg:text-[4.5rem] font-display font-bold tracking-[0.16em] text-warm-900 leading-none select-none drop-shadow-sm">
                UJWALA
              </h1>
            </LightHalo>
          </div>

          {/* Primary Tagline */}
          <p className="text-base sm:text-lg md:text-xl font-display font-semibold text-gold-800 tracking-[0.18em] uppercase mt-2">
            Let Your Light Shine
          </p>

          {/* Supporting Subtle Lotus Line-Art Underneath */}
          <div className="mt-3 flex items-center justify-center gap-3 text-gold-500/80" aria-hidden="true">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent via-gold-400/50 to-gold-500" />
            <LotusLineArt className="w-6 h-5 text-blush-dark" />
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent via-gold-400/50 to-gold-500" />
          </div>

          {/* Supporting Stage Intro Hierarchy */}
          <p className="text-[11px] sm:text-xs font-sans font-semibold tracking-[0.24em] text-warm-600 uppercase mt-3">
            Discover <span className="text-gold-500">•</span> Connect <span className="text-gold-500">•</span> Explore <span className="text-gold-500">•</span> Illuminate
          </p>
        </div>
      </div>
    </header>
  );
}
