'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
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
  LotusLineArt,
  DiyaLineArt,
  RotateCcw,
} from '@/components/ui/icons';
import { AudioManager } from '@/audio/audio-manager';
import confetti from 'canvas-confetti';
import { useRevealAutoScroll } from '@/hooks/use-reveal-auto-scroll';

interface Level3ContainerProps {
  onComplete: () => void;
  onContinue: () => void;
}

export function Level3Container({ onComplete, onContinue }: Level3ContainerProps) {
  // Single Source of Truth for Current Journey Point (0 to 11)
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isBoatMoving, setIsBoatMoving] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const totalSteps = JOURNEY_STEPS.length;
  const currentStep: JourneyStep = JOURNEY_STEPS[currentStepIdx];

  const movementTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messageSectionRef = useRef<HTMLDivElement | null>(null);
  const climaxSectionRef = useRef<HTMLDivElement | null>(null);

  const { scrollIfOffscreen } = useRevealAutoScroll();

  const handleMovementComplete = useCallback(() => {
    setIsBoatMoving(false);
    if (movementTimeoutRef.current) {
      clearTimeout(movementTimeoutRef.current);
      movementTimeoutRef.current = null;
    }

    // Sequence: Boat reaches target -> Message reveals -> Short comfortable pause -> Context-aware smooth scroll
    scrollIfOffscreen(messageSectionRef.current, { block: 'nearest', delay: 120 });
  }, [scrollIfOffscreen]);

  // When climax revelation is unlocked, smoothly bring it into view
  useEffect(() => {
    if (isCompleted && climaxSectionRef.current) {
      scrollIfOffscreen(climaxSectionRef.current, { block: 'center', delay: 250 });
    }
  }, [isCompleted, scrollIfOffscreen]);

  const handleNextStep = () => {
    if (isBoatMoving) return; // Prevent conflicting animations (Option A)

    const nextIdx = currentStepIdx + 1;

    if (nextIdx < totalSteps) {
      setIsBoatMoving(true);
      setCurrentStepIdx(nextIdx);
      const nextStep = JOURNEY_STEPS[nextIdx];

      // Safety fallback timeout to ensure buttons are never locked indefinitely
      if (movementTimeoutRef.current) clearTimeout(movementTimeoutRef.current);
      movementTimeoutRef.current = setTimeout(() => {
        setIsBoatMoving(false);
      }, 900);

      // Play appropriate sound effect based on step phase
      if (nextStep.sfx === 'drop') {
        AudioManager.getInstance().playTick({ volume: 0.22 });
      } else if (nextStep.sfx === 'chime') {
        AudioManager.getInstance().playChime({ pitchMultiplier: 1.0 + nextIdx * 0.04 });
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
          colors: ['#D6B15E', '#E8D18A', '#E8B7BE', '#F3D9DC'],
        });
      } catch {
        // Fallback gracefully
      }
    }
  };

  const handlePrevStep = () => {
    if (isBoatMoving) return; // Prevent conflicting animations
    if (currentStepIdx > 0) {
      setIsBoatMoving(true);
      setCurrentStepIdx(currentStepIdx - 1);
      AudioManager.getInstance().playTick({ volume: 0.15 });

      if (movementTimeoutRef.current) clearTimeout(movementTimeoutRef.current);
      movementTimeoutRef.current = setTimeout(() => {
        setIsBoatMoving(false);
      }, 900);
    }
  };

  const handleResetRide = () => {
    setIsBoatMoving(true);
    setCurrentStepIdx(0);
    setIsCompleted(false);
    AudioManager.getInstance().playTick({ volume: 0.2 });

    if (movementTimeoutRef.current) clearTimeout(movementTimeoutRef.current);
    movementTimeoutRef.current = setTimeout(() => {
      setIsBoatMoving(false);
    }, 900);
  };

  const getStepIcon = (iconName: JourneyStep['iconName']) => {
    switch (iconName) {
      case 'shopping':
        return <ShoppingBag className="w-5 h-5 text-gold-600" />;
      case 'likes':
        return <ThumbsUp className="w-5 h-5 text-gold-600" />;
      case 'money':
        return <Coins className="w-5 h-5 text-gold-600" />;
      case 'success':
        return <Trophy className="w-5 h-5 text-gold-600" />;
      case 'love':
        return <Heart className="w-5 h-5 text-blush-dark" />;
      case 'phone':
        return <SmartphoneCharging className="w-5 h-5 text-warm-700" />;
      case 'job':
        return <Briefcase className="w-5 h-5 text-warm-700" />;
      case 'heartbreak':
        return <HeartCrack className="w-5 h-5 text-blush-dark" />;
      case 'finance':
        return <TrendingDown className="w-5 h-5 text-warm-700" />;
      case 'pause':
        return <Pause className="w-5 h-5 text-gold-600" />;
      case 'peace':
        return <Feather className="w-5 h-5 text-gold-600" />;
      case 'spiritual':
        return <Sun className="w-5 h-5 text-gold-600" />;
    }
  };

  // Dynamic progress meter styling
  const getMeterGradient = () => {
    if (currentStep.phase === 'drop' || currentStep.meterValue < 35) {
      return 'bg-gradient-to-r from-blush via-blush-dark to-warm-700 shadow-sm';
    }
    if (currentStep.phase === 'divine' || currentStep.meterValue >= 85) {
      return 'bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 shadow-ujwala-sm';
    }
    return 'bg-gradient-to-r from-gold-300 via-blush to-gold-500 shadow-sm';
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-4 sm:py-6" aria-label="Stage 03: Explore — What Really Makes Me Happy?">
      {/* Station Kicker & Intro Header */}
      <div className="text-center mb-7 sm:mb-8">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/95 border border-gold-400/45 text-gold-800 text-[11px] font-sans font-bold tracking-[0.2em] uppercase mb-3 shadow-ujwala-sm">
          <Sparkle className="w-3.5 h-3.5 text-gold-500" />
          STAGE 03 • EXPLORE
        </span>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-wide text-warm-900 drop-shadow-sm mb-2.5">
          WHAT REALLY MAKES ME HAPPY?
        </h2>

        <p className="max-w-xl mx-auto text-sm sm:text-base text-warm-700 font-body leading-relaxed">
          The boat represents the self. The ocean represents life. The waves represent changing
          circumstances. Journey across life’s highs and drops to discover what happiness endures.
        </p>
      </div>

      {/* Dynamic Journey Phase Tracker Banner */}
      <div className="flex items-center justify-between max-w-2xl mx-auto mb-3 px-2">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-gold-400/30 shadow-sm">
          <span className="text-[10px] font-sans font-semibold tracking-widest uppercase text-gold-800">
            PHASE:
          </span>
          <span className="text-xs font-display font-medium text-warm-800 tracking-wide">
            {currentStep.phaseLabel}
          </span>
        </div>

        <div className="px-3 py-1 rounded-full bg-white/90 border border-warm-200 text-xs font-mono text-warm-600 shadow-sm">
          Step {currentStepIdx + 1} of {totalSteps}
        </div>
      </div>

      {/* Interactive Ocean & Buoyant Boat Canvas with Continuous Step Progression */}
      <div className="mb-5 max-w-4xl mx-auto">
        <OceanCanvas
          currentPointIndex={currentStepIdx}
          progressRatio={currentStep.boatProgressRatio}
          phase={currentStep.phase}
          onMovementComplete={handleMovementComplete}
        />
      </div>

      {/* Dynamic Happiness Meter & Step Detail Grid (Auto-scroll target) */}
      <div
        ref={messageSectionRef}
        className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch max-w-4xl mx-auto mb-6 scroll-mt-28"
      >
        {/* Bottom-Left: Happiness Meter */}
        <div className="md:col-span-5 p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-gold-400/30 shadow-ujwala-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-display font-semibold tracking-wider text-gold-800 uppercase">
                Happiness Meter
              </span>
              <span className="font-mono text-sm font-bold text-warm-900">
                {currentStep.meterValue}%
              </span>
            </div>

            {/* Smooth fluid progress bar */}
            <div className="w-full h-3 bg-ivory-soft rounded-full overflow-hidden border border-gold-300/40 p-0.5">
              <div
                className={`h-full rounded-full transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] ${getMeterGradient()}`}
                style={{ width: `${currentStep.meterValue}%` }}
              />
            </div>
          </div>

          <p className="text-[11.5px] text-warm-600 font-sans mt-3 leading-snug">
            {currentStep.bannerText}
          </p>
        </div>

        {/* Bottom-Right: Step Detail Insight Card & Controls */}
        <div className="md:col-span-7 p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-gold-400/30 shadow-ujwala-card flex flex-col justify-between">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-xl bg-gold-50 border border-gold-300 text-gold-700 shadow-sm shrink-0">
                {getStepIcon(currentStep.iconName)}
              </span>
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-sans font-semibold uppercase tracking-wider bg-blush-light border border-blush text-warm-800 inline-block mb-0.5">
                  {currentStep.badge}
                </span>
                <h3 className="text-base sm:text-lg font-display font-bold text-warm-900">
                  {currentStep.title}
                </h3>
              </div>
            </div>

            {/* Step Controls: Previous & Next with Option A Guard */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={currentStepIdx === 0 || isBoatMoving}
                aria-label="Previous step"
                className="p-2 rounded-xl bg-ivory-soft hover:bg-white border border-warm-200 text-warm-700 hover:text-warm-900 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleNextStep}
                disabled={isBoatMoving}
                className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-warm-900 font-display font-bold text-xs tracking-wider uppercase transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-ujwala-sm hover:shadow-ujwala-md"
                style={{
                  background: 'linear-gradient(135deg, #FFFDF9 0%, #FAF3DC 50%, #E8D18A 100%)',
                  border: '1px solid #D6B15E',
                }}
              >
                <span>{currentStepIdx === totalSteps - 1 ? 'Finish' : isBoatMoving ? 'Sailing...' : 'Next'}</span>
                <ChevronRight className="w-3.5 h-3.5 stroke-[2.5] transform transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>

          <p className="text-xs sm:text-[13px] text-gold-800 font-quote italic my-1.5 leading-relaxed font-medium">
            &ldquo;{currentStep.quote}&rdquo;
          </p>
          <p className="text-xs sm:text-[12.5px] text-warm-600 font-body leading-relaxed">
            {currentStep.description}
          </p>
        </div>
      </div>

      {/* Climax Revelation & Reflection (Auto-scroll target on finish) */}
      <AnimatePresence>
        {isCompleted && (
          <motion.div
            ref={climaxSectionRef}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 sm:mt-12 mb-8 py-10 px-6 sm:px-10 rounded-3xl text-center max-w-[740px] mx-auto relative overflow-hidden backdrop-blur-2xl bg-white/95 border border-gold-400/50 shadow-ujwala-lg scroll-mt-28"
          >
            {/* Ambient Top Glow Diffusion */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-gradient-to-b from-gold-200/30 via-blush-soft/20 to-transparent blur-xl pointer-events-none"
              aria-hidden="true"
            />

            {/* Top Emblem */}
            <div className="relative inline-flex items-center justify-center mb-4">
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.35, 0.65, 0.35] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -inset-3 rounded-full bg-gold-300/30 blur-md pointer-events-none"
              />
              <div className="relative p-3 rounded-full bg-gold-50 border border-gold-400/60 ring-2 ring-gold-300/30 text-gold-700 shadow-ujwala-sm">
                <LotusLineArt className="w-7 h-7 text-blush" />
              </div>
            </div>

            {/* Overline & Title */}
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-gold-800 uppercase font-sans mb-1">
              THE OCEAN REALIZATION
            </p>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-warm-900 mb-3.5 tracking-wide">
              The Waves Changed. The Boat Remained.
            </h3>

            <p className="text-xs sm:text-sm text-warm-700 font-body max-w-lg mx-auto mb-5 leading-relaxed">
              Circumstances in life will inevitably rise and fall like ocean waves. Shopping,
              validation, and status fade; hardships come and pass. But the soul who is anchored in
              divine connection remains peaceful in all weather.
            </p>

            {/* Sacred Sanskrit Verse */}
            <p className="text-lg sm:text-2xl font-sanskrit font-normal text-warm-900 mb-4 leading-[1.8] tracking-wide">
              यं लब्ध्वा चापरं लाभं मन्यते नाधिकं ततः ।<br />
              यस्मिन्स्थितो न दुःखेन गुरुणापि विचाल्यते ॥
            </p>

            <div className="max-w-xl mx-auto mb-6 text-left rounded-xl p-4 sm:p-5 bg-ivory-soft/80 border-l-2 border-l-gold-500 shadow-sm">
              <blockquote className="text-xs sm:text-sm text-warm-800 font-quote italic leading-relaxed">
                &ldquo;Upon gaining this, one considers no other gain greater, and established in
                such truth, one is never shaken, even in the midst of greatest difficulty.&rdquo;
              </blockquote>
              <footer className="text-gold-800 font-sans text-xs font-medium not-italic mt-2 flex items-center gap-1.5">
                <Sparkle className="w-3 h-3 text-gold-600" />
                Bhagavad Gita 6.22
              </footer>
            </div>

            {/* Action Buttons: Replay & Enter Final Stage */}
            <div className="flex items-center justify-center gap-3.5 flex-wrap">
              <button
                type="button"
                onClick={handleResetRide}
                className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-white hover:bg-ivory-soft border border-warm-200 text-warm-800 text-xs font-display tracking-wider uppercase transition-all duration-200 active:scale-95 shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5 text-gold-600" />
                <span>Replay Ocean</span>
              </button>

              <button
                type="button"
                onClick={onContinue}
                className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-warm-900 font-display font-bold text-sm tracking-[0.08em] uppercase transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-gold-500 active:scale-95 shadow-ujwala-md hover:shadow-ujwala-lg"
                style={{
                  background: 'linear-gradient(135deg, #FFFDF9 0%, #FAF3DC 50%, #E8D18A 100%)',
                  border: '1px solid #D6B15E',
                }}
              >
                <span>Enter Stage 04 — ILLUMINATE</span>
                <ChevronRight className="w-4 h-4 stroke-[2.5] transform transition-transform duration-200 ease-out group-hover:translate-x-1 text-warm-800" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
