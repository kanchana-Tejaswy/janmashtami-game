'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { JOURNEY_STEPS } from '@/lib/constants';
import { JourneyStep } from '@/types';
import { OceanCanvas } from './ocean-canvas';
import {
  ShoppingBag,
  ThumbsUp,
  Coins,
  Trophy,
  Heart,
  SmartphoneCharging,
  Briefcase,
  HeartCrack,
  TrendingDown,
  Pause,
  Feather,
  Sun,
  ChevronRight,
  ChevronLeft,
  Sparkle,
  SacredLotusIcon,
  RotateCcw,
} from '@/components/ui/icons';
import { AudioManager } from '@/audio/audio-manager';
import confetti from 'canvas-confetti';

interface Level3ContainerProps {
  onComplete: () => void;
  onContinue: () => void;
}

export function Level3Container({ onComplete, onContinue }: Level3ContainerProps) {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const totalSteps = JOURNEY_STEPS.length;
  const currentStep: JourneyStep = JOURNEY_STEPS[currentStepIdx];

  const handleNextStep = () => {
    const nextIdx = currentStepIdx + 1;

    if (nextIdx < totalSteps) {
      setCurrentStepIdx(nextIdx);
      const nextStep = JOURNEY_STEPS[nextIdx];

      // Play appropriate sound effect based on step phase
      if (nextStep.sfx === 'drop') {
        AudioManager.getInstance().playTick({ volume: 0.25 });
      } else if (nextStep.sfx === 'chime') {
        AudioManager.getInstance().playChime({ pitchMultiplier: 1.0 + nextIdx * 0.05 });
      } else if (nextStep.sfx === 'calm') {
        AudioManager.getInstance().playFluteNote(392.0, 1.8);
      } else if (nextStep.sfx === 'divine') {
        AudioManager.getInstance().playCelebration();
      }
    } else {
      setIsCompleted(true);
      onComplete();
      AudioManager.getInstance().playCelebration();
      try {
        confetti({
          particleCount: 75,
          spread: 85,
          origin: { y: 0.6 },
          colors: ['#fef08a', '#14b8a6', '#fbbf24', '#f59e0b'],
        });
      } catch {
        // Fallback gracefully
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(currentStepIdx - 1);
      AudioManager.getInstance().playTick({ volume: 0.15 });
    }
  };

  const handleResetRide = () => {
    setCurrentStepIdx(0);
    setIsCompleted(false);
    AudioManager.getInstance().playTick({ volume: 0.2 });
  };

  const getStepIcon = (iconName: JourneyStep['iconName']) => {
    switch (iconName) {
      case 'shopping':
        return <ShoppingBag className="w-5 h-5 text-gold-300" />;
      case 'likes':
        return <ThumbsUp className="w-5 h-5 text-gold-300" />;
      case 'money':
        return <Coins className="w-5 h-5 text-gold-300" />;
      case 'success':
        return <Trophy className="w-5 h-5 text-gold-300" />;
      case 'love':
        return <Heart className="w-5 h-5 text-rose-400" />;
      case 'phone':
        return <SmartphoneCharging className="w-5 h-5 text-amber-400" />;
      case 'job':
        return <Briefcase className="w-5 h-5 text-amber-400" />;
      case 'heartbreak':
        return <HeartCrack className="w-5 h-5 text-rose-400" />;
      case 'finance':
        return <TrendingDown className="w-5 h-5 text-rose-400" />;
      case 'pause':
        return <Pause className="w-5 h-5 text-teal-300" />;
      case 'peace':
        return <Feather className="w-5 h-5 text-teal-300" />;
      case 'spiritual':
        return <Sun className="w-5 h-5 text-gold-300" />;
    }
  };

  // Dynamic progress meter styling
  const getMeterGradient = () => {
    if (currentStep.phase === 'drop' || currentStep.meterValue < 35) {
      return 'bg-gradient-to-r from-rose-500 via-amber-500 to-amber-600 shadow-[0_0_12px_rgba(244,63,94,0.35)]';
    }
    if (currentStep.phase === 'divine' || currentStep.meterValue >= 85) {
      return 'bg-gradient-to-r from-amber-400 via-gold-300 to-yellow-200 shadow-[0_0_16px_rgba(251,191,36,0.55)]';
    }
    return 'bg-gradient-to-r from-teal-400 via-teal-300 to-gold-400 shadow-[0_0_10px_rgba(20,184,166,0.3)]';
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-6" aria-label="Station 3: The Quest for Joy">
      {/* Station Kicker & Intro Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-8"
      >
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-peacock-900/80 border border-teal-500/30 text-teal-300 text-xs font-semibold tracking-[0.15em] uppercase mb-3 shadow-[0_0_15px_rgba(20,184,166,0.15)]">
          <Sparkle className="w-3.5 h-3.5 text-gold-400" />
          STATION III • THE QUEST FOR JOY
        </span>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-b from-white via-gold-100 to-gold-300 drop-shadow-[0_0_30px_rgba(245,158,11,0.25)] mb-3">
          WHAT REALLY MAKES ME HAPPY?
        </h2>

        <p className="max-w-xl mx-auto text-sm sm:text-base text-ivory-dim font-body leading-relaxed">
          The boat represents the self. The ocean represents life. The waves represent changing
          circumstances. Journey across life’s highs and drops to discover what happiness endures.
        </p>
      </motion.div>

      {/* Dynamic Journey Phase Tracker Banner */}
      <div className="flex items-center justify-between max-w-2xl mx-auto mb-3 px-2">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-peacock-900/80 border border-gold-500/25 shadow-sm">
          <span className="text-[10.5px] font-sans font-semibold tracking-widest uppercase text-gold-400">
            PHASE:
          </span>
          <span className="text-xs font-display font-medium text-ivory tracking-wide">
            {currentStep.phaseLabel}
          </span>
        </div>

        <div className="px-3 py-1 rounded-full bg-slate-900/70 border border-white/[0.08] text-xs font-mono text-ivory-dim">
          Step {currentStepIdx + 1} of {totalSteps}
        </div>
      </div>

      {/* Interactive 2D Ocean & Buoyant Boat Canvas */}
      <div className="mb-6 max-w-4xl mx-auto">
        <OceanCanvas
          progressRatio={currentStep.boatProgressRatio}
          phase={currentStep.phase}
        />
      </div>

      {/* Dynamic Happiness Meter & Step Insight Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch max-w-4xl mx-auto mb-6">
        {/* Bottom-Left: Happiness Meter */}
        <div className="md:col-span-5 p-5 rounded-2xl bg-slate-900/75 backdrop-blur-md border border-white/[0.08] shadow-glass-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-display font-semibold tracking-wider text-gold-300 uppercase">
                Happiness Meter
              </span>
              <span className="font-mono text-sm font-bold text-ivory">
                {currentStep.meterValue}%
              </span>
            </div>

            {/* Smooth fluid progress bar */}
            <div className="w-full h-3.5 bg-peacock-950 rounded-full overflow-hidden border border-white/[0.08] p-0.5">
              <div
                className={`h-full rounded-full transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] ${getMeterGradient()}`}
                style={{ width: `${currentStep.meterValue}%` }}
              />
            </div>
          </div>

          <p className="text-[11px] text-ivory-dim/80 font-sans mt-3 leading-snug">
            {currentStep.bannerText}
          </p>
        </div>

        {/* Bottom-Right: Step Detail Insight Card & Controls */}
        <div className="md:col-span-7 p-5 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-white/[0.08] shadow-glass-card flex flex-col justify-between">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-xl bg-peacock-900/80 border border-gold-400/30 text-gold-300 shadow-sm shrink-0">
                {getStepIcon(currentStep.iconName)}
              </span>
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-sans font-semibold uppercase tracking-wider bg-teal-950/70 border border-teal-400/30 text-teal-300 shadow-[0_0_10px_rgba(20,184,166,0.15)] inline-block mb-0.5">
                  {currentStep.badge}
                </span>
                <h3 className="text-base sm:text-lg font-display font-bold text-ivory">
                  {currentStep.title}
                </h3>
              </div>
            </div>

            {/* Step Controls: Previous & Next */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={currentStepIdx === 0}
                aria-label="Previous step"
                className="p-2 rounded-xl bg-slate-800/80 border border-white/[0.1] text-ivory-dim hover:text-ivory hover:border-gold-400/40 hover:bg-peacock-800 transition-all disabled:opacity-25 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleNextStep}
                className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[#0F172A] font-display font-bold text-xs tracking-wider uppercase transition-all duration-200 active:scale-95 shadow-[0_4px_16px_rgba(245,158,11,0.3)] hover:shadow-[0_4px_22px_rgba(245,158,11,0.5)]"
                style={{
                  background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                }}
              >
                <span>{currentStepIdx === totalSteps - 1 ? 'Finish' : 'Next'}</span>
                <ChevronRight className="w-3.5 h-3.5 stroke-[2.5] transform transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>

          <p className="text-xs sm:text-[13px] text-gold-100 font-quote italic my-1.5 leading-relaxed">
            &ldquo;{currentStep.quote}&rdquo;
          </p>
          <p className="text-xs sm:text-[12.5px] text-slate-300 font-body leading-relaxed">
            {currentStep.description}
          </p>
        </div>
      </div>

      {/* Climax Station 3 Reveal & Reflection */}
      <AnimatePresence>
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 sm:mt-12 mb-8 py-10 px-6 sm:px-10 rounded-3xl text-center max-w-[740px] mx-auto relative overflow-hidden backdrop-blur-2xl border border-amber-500/40 ring-1 ring-amber-400/20 shadow-[0_0_40px_-10px_rgba(245,158,11,0.2),0_25px_50px_-12px_rgba(0,0,0,0.7)]"
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
                <SacredLotusIcon className="w-8 h-8" />
              </div>
            </div>

            {/* Overline & Title */}
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-gold-400 uppercase font-sans mb-1.5">
              THE OCEAN REALIZATION
            </p>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-ivory mb-4 tracking-wide">
              The Waves Changed. The Boat Remained.
            </h3>

            <p className="text-xs sm:text-sm text-ivory-dim font-body max-w-lg mx-auto mb-5 leading-relaxed">
              Circumstances in life will inevitably rise and fall like ocean waves. Shopping,
              validation, and status fade; hardships come and pass. But the soul who is anchored in
              divine connection remains peaceful in all weather.
            </p>

            {/* Sacred Sanskrit Verse & Glass Inset */}
            <p
              className="text-lg sm:text-2xl font-sanskrit font-normal text-amber-200 mb-4 leading-[1.8] tracking-wide"
              style={{
                textShadow: '0 0 12px rgba(253, 230, 138, 0.25)',
                color: '#FDE68A',
              }}
            >
              यं लब्ध्वा चापरं लाभं मन्यते नाधिकं ततः ।<br />
              यस्मिन्स्थितो न दुःखेन गुरुणापि विचाल्यते ॥
            </p>

            <div
              className="max-w-xl mx-auto mb-6 text-left rounded-xl p-4 sm:p-5"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderLeft: '2px solid rgba(245, 158, 11, 0.5)',
              }}
            >
              <blockquote className="text-xs sm:text-sm text-slate-300 font-quote italic leading-relaxed">
                &ldquo;Upon gaining this, one considers no other gain greater, and established in
                such truth, one is never shaken, even in the midst of greatest difficulty.&rdquo;
              </blockquote>
              <footer className="text-gold-400 font-sans text-xs font-medium not-italic mt-2 flex items-center gap-1.5">
                <Sparkle className="w-3 h-3 text-gold-400" />
                Bhagavad Gita 6.22
              </footer>
            </div>

            {/* Action Buttons: Replay & Enter Final Station */}
            <div className="flex items-center justify-center gap-3.5 flex-wrap">
              <button
                type="button"
                onClick={handleResetRide}
                className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-slate-800/80 hover:bg-slate-700 border border-teal-500/30 text-ivory text-xs font-display tracking-wider uppercase transition-all duration-200 active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5 text-teal-300" />
                <span>Replay Ocean</span>
              </button>

              <button
                type="button"
                onClick={onContinue}
                className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-[#0F172A] font-display font-bold text-sm tracking-[0.06em] uppercase transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-gold-300 active:scale-95 shadow-[0_4px_16px_rgba(245,158,11,0.3)] hover:shadow-[0_4px_24px_rgba(245,158,11,0.5)]"
                style={{
                  background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                }}
              >
                <span>Enter Final Station</span>
                <ChevronRight className="w-4 h-4 stroke-[2.5] transform transition-transform duration-200 ease-out group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
