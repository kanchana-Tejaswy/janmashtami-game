'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FOIL_THEMES, VEDIC_VERSES } from '@/lib/constants';
import { renderSoulCardToCanvas } from './canvas-card-renderer';
import {
  Download,
  Share2,
  Copy,
  Check,
  ChevronRight,
  UjwalaRadianceIcon,
  LotusLineArt,
  DiyaLineArt,
  AtmanSparkIcon,
  PeacockFeatherIcon,
} from '@/components/ui/icons';
import { UjwalaGlow, LightHalo } from '@/components/ui/light-system';
import { AudioManager } from '@/audio/audio-manager';
import confetti from 'canvas-confetti';
import { useRevealAutoScroll } from '@/hooks/use-reveal-auto-scroll';

interface FinalContainerProps {
  onComplete: () => void;
}

type ClimaxStage = 'mirror_closed' | 'deep_inquiry' | 'soul_revelation' | 'card_suite';

export function FinalContainer({ onComplete }: FinalContainerProps) {
  const [stage, setStage] = useState<ClimaxStage>('mirror_closed');
  const [inquiryIndex, setInquiryIndex] = useState<number>(0);
  const [playerName, setPlayerName] = useState<string>('');
  const [selectedThemeKey, setSelectedThemeKey] = useState<string>('vrindavan');
  const [selectedVerseKey, setSelectedVerseKey] = useState<string>('gita2_20');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isShared, setIsShared] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cardPreviewRef = useRef<HTMLDivElement | null>(null);
  const inquirySectionRef = useRef<HTMLDivElement | null>(null);
  const revelationSectionRef = useRef<HTMLDivElement | null>(null);
  const cardSuiteSectionRef = useRef<HTMLDivElement | null>(null);

  const { scrollIfOffscreen } = useRevealAutoScroll();

  // 3D holographic tilt states
  const [tilt, setTilt] = useState<{ rx: number; ry: number; glareX: number; glareY: number }>({
    rx: 0,
    ry: 0,
    glareX: 50,
    glareY: 50,
  });

  const selectedTheme = FOIL_THEMES[selectedThemeKey] || FOIL_THEMES.vrindavan;
  const selectedVerse = VEDIC_VERSES[selectedVerseKey] || VEDIC_VERSES.gita2_20;

  // Render to canvas whenever name, theme, or verse changes in card_suite stage
  useEffect(() => {
    if (stage === 'card_suite' && canvasRef.current) {
      renderSoulCardToCanvas(canvasRef.current, playerName, selectedTheme, selectedVerse);
    }
  }, [stage, playerName, selectedTheme, selectedVerse]);

  /* ---------------- Step 1: Open the Mirror ---------------- */
  const handleOpenMirror = () => {
    setStage('deep_inquiry');
    setInquiryIndex(0);
    scrollIfOffscreen(inquirySectionRef.current, { block: 'center', delay: 180 });
    AudioManager.getInstance().playChime({ pitchMultiplier: 0.9, volume: 0.35 });
    AudioManager.getInstance().playFluteNote(392.0, 2.0);
  };

  /* ---------------- Step 2: Progress through Deep Self-Inquiry ---------------- */
  const INQUIRY_QUESTIONS = [
    {
      kicker: 'The Outward Masks',
      lead: 'All your life, you have answered to external labels.',
      sub: 'Student, professional, child, parent, citizen, achiever. You have gathered degrees, titles, and possessions.',
    },
    {
      kicker: 'The Passing Waves',
      lead: 'You have felt countless emotions sweep across your awareness.',
      sub: 'Joy, heartache, excitement, and uncertainty. They drifted like clouds across the vast sky. Yet you remained.',
    },
    {
      kicker: 'The Silent Observer',
      lead: 'In this very moment, in the stillness behind your eyes...',
      sub: 'You are not your clothes. You are not your accomplishments. You are not the body that ages, nor the restless mind that worries.',
    },
    {
      kicker: 'The Radiance Within',
      lead: 'If everything you own and even this physical form changes with time...',
      sub: 'WHO IS THE LUMINOUS OBSERVER SHINING THROUGH IT ALL RIGHT NOW?',
    },
  ];

  const handleNextInquiry = () => {
    if (inquiryIndex < INQUIRY_QUESTIONS.length - 1) {
      setInquiryIndex((prev) => prev + 1);
      scrollIfOffscreen(inquirySectionRef.current, { block: 'center', delay: 120 });
      AudioManager.getInstance().playTick({ volume: 0.18 });
    }
  };

  /* ---------------- Step 3: THE SOUL REVELATION ---------------- */
  const handleRevealSoul = () => {
    setStage('soul_revelation');
    scrollIfOffscreen(revelationSectionRef.current, { block: 'center', delay: 250 });

    // Sacred audio soundscape
    AudioManager.getInstance().playGoosebumpsRevelation();
    onComplete();

    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#D6B15E', '#E8D18A', '#E8B7BE', '#DDD6EA', '#FBF7EF'],
      });
    } catch {
      // Graceful fallback
    }
  };

  const handleProceedToKeepsake = () => {
    setStage('card_suite');
    scrollIfOffscreen(cardSuiteSectionRef.current, { block: 'start', delay: 200 });
    AudioManager.getInstance().playTick({ volume: 0.2 });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardPreviewRef.current) return;
    const rect = cardPreviewRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y - rect.height / 2) / (rect.height / 2)) * -10;
    const ry = ((x - rect.width / 2) / (rect.width / 2)) * 10;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setTilt({ rx, ry, glareX, glareY });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0, glareX: 50, glareY: 50 });
  };

  const handleDownloadPNG = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    const safeName = (playerName.trim() || 'seeker').replace(/[^a-zA-Z0-9_-]/g, '_');
    link.download = `Ujwala_Soul_Card_${safeName}.png`;
    link.href = dataUrl;
    link.click();

    AudioManager.getInstance().playCelebration();
  };

  const handleCopyVerse = () => {
    const textToCopy = `${selectedVerse.sanskrit}\n\n${selectedVerse.english}\n${selectedVerse.citation}\n\nUJWALA — Let Your Light Shine`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true);
      AudioManager.getInstance().playTick({ volume: 0.2 });
      setTimeout(() => setIsCopied(false), 2500);
    });
  };

  const handleShare = async () => {
    const shareData = {
      title: 'UJWALA — Let Your Light Shine',
      text: `I just completed the UJWALA Journey to the Soul: "I am an eternal soul."\n\n${selectedVerse.citation}: ${selectedVerse.english}`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        setIsShared(true);
        setTimeout(() => setIsShared(false), 2500);
      } catch {
        handleCopyVerse();
      }
    } else {
      handleCopyVerse();
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-8" aria-label="Final Station: The Sacred Mirror">
      {/* Station Kicker & Intro */}
      <div className="text-center mb-10 relative">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ivory border border-gold/40 text-gold-700 text-xs font-serif tracking-[0.2em] uppercase mb-3 shadow-ujwala-sm">
          <UjwalaRadianceIcon className="w-3.5 h-3.5 text-gold-600 animate-pulse" />
          04 — ILLUMINATE · The Sacred Mirror
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-warm-900 tracking-wide">
          The Ultimate Reflection
        </h2>
        <p className="max-w-xl mx-auto text-sm sm:text-base text-warm-600 font-serif italic mt-2 leading-relaxed">
          The outer layers have dissolved. The pursuits of life have been unveiled. The ocean of circumstances has been crossed. Now, step before the sacred mirror of truth.
        </p>
      </div>

      {/* ========================================================
          STAGE 1: THE VEILED MIRROR
          ======================================================== */}
      {stage === 'mirror_closed' && (
        <div className="max-w-md mx-auto p-8 rounded-3xl bg-ivory border border-gold/30 shadow-ujwala-card text-center relative overflow-hidden animate-in fade-in duration-500">
          <UjwalaGlow color="gold" size="lg" className="top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2" />

          <div className="relative w-56 h-72 mx-auto rounded-3xl bg-gradient-to-b from-ivory-soft via-ivory to-ivory-soft border-2 border-gold/40 shadow-ujwala-md flex flex-col items-center justify-center p-5 overflow-hidden mb-8">
            <UjwalaGlow size="sm" color="gold" intensity={0.4} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            <LightHalo className="mb-4">
              <div className="p-4 rounded-full bg-ivory border border-gold/40 text-gold-600 shadow-ujwala-sm">
                <DiyaLineArt className="w-8 h-8" />
              </div>
            </LightHalo>

            <p className="relative text-xs font-serif tracking-[0.2em] text-warm-800 uppercase font-medium">
              The Mirror of Truth
            </p>
            <p className="relative text-[12px] text-warm-600 font-serif italic mt-2 text-center px-2">
              Ripples veil the surface until the heart dares to look within.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenMirror}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-400 via-gold to-gold-500 hover:from-gold-300 hover:to-gold-400 text-warm-900 font-serif font-semibold text-sm tracking-wider shadow-ujwala-md hover:shadow-ujwala-halo active:scale-98 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <span>Look Into The Mirror</span>
            <UjwalaRadianceIcon className="w-4 h-4 text-warm-900" />
          </button>
        </div>
      )}

      {/* ========================================================
          STAGE 2: THE DEEP SELF-INQUIRY (PSYCHOLOGICAL BUILDUP)
          ======================================================== */}
      {stage === 'deep_inquiry' && (
        <div ref={inquirySectionRef} className="max-w-xl mx-auto p-8 sm:p-10 rounded-3xl bg-ivory border border-gold/30 shadow-ujwala-card relative overflow-hidden animate-in fade-in duration-500 scroll-mt-28">
          <UjwalaGlow color="lavender" size="lg" className="top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2" />

          {/* Stepper Indicator */}
          <div className="flex items-center justify-between mb-8 border-b border-warm-200/80 pb-3">
            <span className="text-xs font-serif tracking-[0.2em] text-gold-700 uppercase font-medium">
              Inquiry {inquiryIndex + 1} of {INQUIRY_QUESTIONS.length}
            </span>
            <div className="flex items-center gap-1.5">
              {INQUIRY_QUESTIONS.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === inquiryIndex
                      ? 'w-6 bg-gold'
                      : i < inquiryIndex
                      ? 'w-2 bg-blush-400'
                      : 'w-2 bg-warm-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Active Contemplative Inquiry Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={inquiryIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="min-h-[170px] flex flex-col justify-center text-center px-2 mb-8 relative z-10"
            >
              <span className="text-xs font-serif uppercase tracking-[0.25em] text-warm-500 mb-2 block font-medium">
                {INQUIRY_QUESTIONS[inquiryIndex].kicker}
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-medium text-warm-900 mb-3 leading-snug">
                {INQUIRY_QUESTIONS[inquiryIndex].lead}
              </h3>
              <p className="text-sm sm:text-base text-warm-600 font-serif italic leading-relaxed">
                &ldquo;{INQUIRY_QUESTIONS[inquiryIndex].sub}&rdquo;
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Action Button: Next question OR Grand Climax Trigger */}
          <div className="text-center pt-2 relative z-10">
            {inquiryIndex < INQUIRY_QUESTIONS.length - 1 ? (
              <button
                type="button"
                onClick={handleNextInquiry}
                className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full bg-ivory-soft hover:bg-white border border-gold/40 text-warm-800 hover:text-warm-900 font-serif text-xs tracking-wider transition-all active:scale-98 shadow-ujwala-sm"
              >
                <span>Go Deeper</span>
                <ChevronRight className="w-4 h-4 text-gold-600" />
              </button>
            ) : (
              /* THE HIGH-STAKES CLIMAX BUTTON */
              <div className="flex flex-col items-center gap-3">
                <motion.button
                  type="button"
                  onClick={handleRevealSoul}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative group px-9 py-4 rounded-full bg-gradient-to-r from-gold-400 via-gold to-gold-500 text-warm-900 font-serif font-bold text-sm sm:text-base tracking-[0.2em] uppercase shadow-ujwala-halo cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-gold/30"
                >
                  <span className="flex items-center gap-3">
                    <UjwalaRadianceIcon className="w-5 h-5 text-warm-900 animate-spin" />
                    <span>Reveal Who I Am</span>
                    <UjwalaRadianceIcon className="w-5 h-5 text-warm-900 animate-spin" />
                  </span>
                </motion.button>
                <p className="text-xs text-warm-500 font-serif italic tracking-wide">
                  Tap to unveil your eternal, radiant inner light
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          STAGE 3: THE SOUL REVELATION (UJWALA CLIMAX REALIZATION)
          ======================================================== */}
      {stage === 'soul_revelation' && (
        <motion.div
          ref={revelationSectionRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative max-w-2xl mx-auto p-8 sm:p-12 rounded-3xl bg-ivory border-2 border-gold/50 shadow-ujwala-halo text-center overflow-hidden scroll-mt-28"
        >
          {/* Luminous Golden Halo & Ambient Glow */}
          <UjwalaGlow color="gold" size="xl" intensity={0.5} className="top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <UjwalaGlow color="blush" size="lg" className="bottom-1/4 left-1/2 -translate-x-1/2" />

          {/* Radiant Atman Spark Emblem */}
          <div className="relative mb-6">
            <LightHalo>
              <div className="p-5 rounded-full bg-ivory-soft border border-gold/40 text-gold-600 shadow-ujwala-md">
                <AtmanSparkIcon className="w-12 h-12 text-gold-600 animate-pulse" />
              </div>
            </LightHalo>
          </div>

          {/* Sanskrit & Epiphany Lead */}
          <p className="relative text-xs sm:text-sm font-serif font-medium tracking-[0.25em] text-gold-700 uppercase mb-2">
            04 — ILLUMINATE · The Eternal Light Within
          </p>

          <h3 className="relative text-3xl sm:text-4xl md:text-5xl font-display font-medium text-warm-900 mb-2 tracking-wide">
            I AM THE SOUL
          </h3>

          <p className="relative text-sm sm:text-base font-serif italic text-warm-600 tracking-wider mb-6">
            अहं ब्रह्मास्मि · Aham Brahmāsmi · Sac-cid-ānanda
          </p>

          {/* UJWALA Realization Suite */}
          <div className="relative max-w-lg mx-auto text-xs sm:text-sm text-warm-800 font-serif leading-relaxed mb-6 space-y-3">
            <div className="p-4 rounded-2xl bg-ivory-soft border border-gold/30 shadow-ujwala-sm space-y-1.5 text-center">
              <p className="font-serif italic text-warm-800 text-sm sm:text-base">
                &ldquo;I am more than what I own.&rdquo;
              </p>
              <p className="font-serif italic text-warm-800 text-sm sm:text-base">
                &ldquo;More than what I achieve.&rdquo;
              </p>
              <p className="font-serif italic text-warm-800 text-sm sm:text-base">
                &ldquo;More than what others think of me.&rdquo;
              </p>
              <p className="font-display font-semibold text-gold-700 text-base sm:text-lg pt-1">
                I am the soul.
              </p>
            </div>

            <p className="text-warm-600 font-serif italic pt-1">
              To discover who you truly are, connect with the Divine, and live with purpose.
            </p>
          </div>

          {/* Sacred Bhagavad Gita 2.20 & 6.22 Verses */}
          <blockquote className="relative text-xs sm:text-sm text-warm-800 font-serif italic max-w-lg mx-auto mb-8 border-t border-b border-gold/30 py-4">
            &ldquo;न जायते म्रियते वा कदाचिन्<br />
            नायं भूत्वा भविता वा न भूयः ।<br />
            अजो नित्यः शाश्वतोऽयं पुराणो<br />
            न हन्यते हन्यमाने शरीरे ॥&rdquo;
            <p className="text-xs not-italic text-warm-600 font-serif mt-2">
              &ldquo;For the soul there is neither birth nor death at any time. He is unborn, eternal, ever-existing, and primeval. He is not slain when the body is slain.&rdquo;
            </p>
            <footer className="text-gold-700 font-serif text-xs not-italic mt-1 font-semibold">
              — Bhagavad Gita 2.20
            </footer>
          </blockquote>

          {/* Continue to Keepsake Card Suite */}
          <button
            type="button"
            onClick={handleProceedToKeepsake}
            className="relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-gold-400 via-gold to-gold-500 hover:from-gold-300 hover:to-gold-400 text-warm-900 font-serif font-semibold text-xs sm:text-sm tracking-wider shadow-ujwala-md hover:shadow-ujwala-halo active:scale-98 transition-all outline-none"
          >
            <span>Create Your Sacred Keepsake</span>
            <ChevronRight className="w-4 h-4 text-warm-900" />
          </button>
        </motion.div>
      )}

      {/* ========================================================
          STAGE 4: KEEPSAKE CUSTOMIZER & 3D INTERACTIVE CARD
          ======================================================== */}
      {stage === 'card_suite' && (
        <div ref={cardSuiteSectionRef} className="space-y-8 animate-in fade-in duration-500 scroll-mt-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Customizer Controls (Left 6 Cols) */}
            <div className="lg:col-span-6 p-7 rounded-3xl bg-ivory border border-gold/30 shadow-ujwala-card space-y-6">
              <h4 className="text-lg font-display font-medium text-warm-900 flex items-center gap-2">
                <DiyaLineArt className="w-5 h-5 text-gold-600" />
                <span>Personalize Your Keepsake</span>
              </h4>

              {/* Name Input */}
              <div>
                <label
                  htmlFor="seeker-name"
                  className="block text-xs font-serif font-medium uppercase tracking-[0.2em] text-warm-700 mb-2"
                >
                  Your Name
                </label>
                <input
                  id="seeker-name"
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Enter your name (e.g. Radhika, Arjun)..."
                  maxLength={40}
                  className="w-full px-4 py-3 rounded-2xl bg-ivory-soft border border-gold/40 text-warm-900 placeholder-warm-400 text-sm focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                />
              </div>

              {/* Sacred Theme Selection */}
              <div>
                <span className="block text-xs font-serif font-medium uppercase tracking-[0.2em] text-warm-700 mb-2">
                  Festival Palette Theme
                </span>
                <div className="grid grid-cols-3 gap-2.5">
                  {Object.values(FOIL_THEMES).map((theme) => {
                    const isSelected = selectedThemeKey === theme.id;
                    return (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => {
                          setSelectedThemeKey(theme.id);
                          AudioManager.getInstance().playTick({ volume: 0.15 });
                        }}
                        className={`p-3 rounded-2xl border text-center transition-all outline-none ${
                          isSelected
                            ? 'bg-ivory border-gold ring-2 ring-gold/30 text-warm-900 shadow-ujwala-sm'
                            : 'bg-ivory-soft border-warm-200 text-warm-600 hover:border-gold/30 hover:text-warm-900'
                        }`}
                      >
                        <div className="flex justify-center mb-1.5 text-gold-600">
                          {theme.id === 'vrindavan' ? (
                            <UjwalaRadianceIcon className="w-5 h-5" />
                          ) : theme.id === 'radha' ? (
                            <LotusLineArt className="w-5 h-5 text-blush-500" />
                          ) : (
                            <DiyaLineArt className="w-5 h-5 text-lavender-500" />
                          )}
                        </div>
                        <span className="text-[11px] font-serif block leading-tight font-medium">
                          {theme.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sacred Vedic Verse Selection */}
              <div>
                <span className="block text-xs font-serif font-medium uppercase tracking-[0.2em] text-warm-700 mb-2">
                  Guiding Vedic Verse
                </span>
                <div className="space-y-2">
                  {Object.values(VEDIC_VERSES).map((verse) => {
                    const isSelected = selectedVerseKey === verse.id;
                    return (
                      <button
                        key={verse.id}
                        type="button"
                        onClick={() => {
                          setSelectedVerseKey(verse.id);
                          AudioManager.getInstance().playTick({ volume: 0.15 });
                        }}
                        className={`w-full p-3 rounded-2xl border text-left transition-all outline-none flex items-start justify-between gap-2 ${
                          isSelected
                            ? 'bg-ivory border-gold ring-2 ring-gold/20 text-warm-900 shadow-ujwala-sm'
                            : 'bg-ivory-soft border-warm-200/80 text-warm-600 hover:border-gold/30 hover:text-warm-900'
                        }`}
                      >
                        <div>
                          <p className="text-xs font-serif font-semibold text-warm-900">
                            {verse.citation} · {verse.kicker}
                          </p>
                          <p className="text-[11px] text-warm-600 font-serif italic line-clamp-1 mt-0.5">
                            {verse.english}
                          </p>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Keepsake Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleDownloadPNG}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-gold-400 via-gold to-gold-500 hover:from-gold-300 hover:to-gold-400 text-warm-900 font-serif font-semibold text-xs tracking-wider shadow-ujwala-md hover:shadow-ujwala-halo active:scale-98 transition-all outline-none"
                >
                  <Download className="w-4 h-4" />
                  <span>Download 1200x1600 Keepsake</span>
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleCopyVerse}
                    className="p-3.5 rounded-2xl bg-ivory-soft hover:bg-white border border-gold/30 text-warm-700 hover:text-warm-900 transition-colors shadow-ujwala-sm"
                    title="Copy Verse"
                  >
                    {isCopied ? <Check className="w-4 h-4 text-gold-600" /> : <Copy className="w-4 h-4" />}
                  </button>

                  <button
                    type="button"
                    onClick={handleShare}
                    className="p-3.5 rounded-2xl bg-ivory-soft hover:bg-white border border-gold/30 text-warm-700 hover:text-warm-900 transition-colors shadow-ujwala-sm"
                    title="Share Keepsake"
                  >
                    {isShared ? <Check className="w-4 h-4 text-gold-600" /> : <Share2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Live 3D Interactive Keepsake Card Preview (Right 6 Cols) */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <span className="text-[11px] font-serif text-warm-500 uppercase tracking-[0.2em] mb-3">
                Interactive Keepsake Card (Hover / Tilt)
              </span>

              <div
                ref={cardPreviewRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative w-full max-w-[340px] aspect-[3/4] rounded-3xl p-1 transition-transform duration-150 ease-out select-none cursor-pointer"
                style={{
                  perspective: '1000px',
                  transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                }}
              >
                {/* Dynamic Glare Sheen */}
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none z-20 mix-blend-soft-light transition-opacity duration-150"
                  style={{
                    background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.6) 0%, transparent 60%)`,
                  }}
                  aria-hidden="true"
                />

                {/* High-DPI Canvas Rendering Target */}
                <canvas
                  ref={canvasRef}
                  className="w-full h-full rounded-2xl shadow-ujwala-card border border-gold/40 block"
                />
              </div>

              <p className="text-[11px] text-warm-500 font-serif italic mt-3 text-center">
                High-resolution keepsake · 1-click 1200x1600 PNG download.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
