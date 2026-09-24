'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FOIL_THEMES, VEDIC_VERSES } from '@/lib/constants';
import { renderSoulCardToCanvas } from './canvas-card-renderer';
import {
  Sparkle,
  Sparkles,
  Download,
  Share2,
  Copy,
  Check,
  RotateCcw,
  PeacockFeatherIcon,
  SacredLotusIcon,
  AtmanSparkIcon,
  DiyaIcon,
  ChevronRight,
  Flame,
} from '@/components/ui/icons';
import { AudioManager } from '@/audio/audio-manager';
import confetti from 'canvas-confetti';

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
    AudioManager.getInstance().playChime({ pitchMultiplier: 0.9, volume: 0.35 });
    AudioManager.getInstance().playFluteNote(392.0, 2.0);
  };

  /* ---------------- Step 2: Progress through Deep Self-Inquiry ---------------- */
  const INQUIRY_QUESTIONS = [
    {
      kicker: 'The Many Masks',
      lead: 'All your life, you have answered to external labels.',
      sub: 'Student, professional, child, parent, citizen, friend. You have collected degrees, bank balances, and titles.',
    },
    {
      kicker: 'The Transient Storms',
      lead: 'You have felt countless moods pass across your awareness.',
      sub: 'Joy, heartbreak, anger, pride, and anxiety. They came like summer clouds and then departed. Yet you remained.',
    },
    {
      kicker: 'The Silent Witness',
      lead: 'In this very moment, in the stillness behind your eyes...',
      sub: 'You are not your clothes. You are not your phone. You are not the body that ages, nor the restless mind that worries.',
    },
    {
      kicker: 'The Ultimate Question',
      lead: 'If everything you own and even this mortal body will one day return to dust...',
      sub: 'WHO IS THE CONSCIOUS OBSERVER WATCHING IT ALL RIGHT NOW?',
    },
  ];

  const handleNextInquiry = () => {
    if (inquiryIndex < INQUIRY_QUESTIONS.length - 1) {
      setInquiryIndex((prev) => prev + 1);
      AudioManager.getInstance().playTick({ volume: 0.18 });
    }
  };

  /* ---------------- Step 3: THE GOOSEBUMPS REVELATION! ---------------- */
  const handleRevealSoul = () => {
    setStage('soul_revelation');

    // Sacred audio soundscape: deep singing bowl + harmonic temple bells + soaring Bansuri
    AudioManager.getInstance().playGoosebumpsRevelation();
    onComplete();

    try {
      confetti({
        particleCount: 110,
        spread: 100,
        origin: { y: 0.55 },
        colors: ['#fef08a', '#fbbf24', '#f59e0b', '#14b8a6', '#ffffff'],
      });
    } catch {
      // Graceful fallback
    }
  };

  const handleProceedToKeepsake = () => {
    setStage('card_suite');
    AudioManager.getInstance().playTick({ volume: 0.2 });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardPreviewRef.current) return;
    const rect = cardPreviewRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y - rect.height / 2) / (rect.height / 2)) * -12;
    const ry = ((x - rect.width / 2) / (rect.width / 2)) * 12;
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
    link.download = `Vrindavan_Soul_Card_${safeName}.png`;
    link.href = dataUrl;
    link.click();

    AudioManager.getInstance().playCelebration();
  };

  const handleCopyVerse = () => {
    const textToCopy = `${selectedVerse.sanskrit}\n\n${selectedVerse.english}\n${selectedVerse.citation}\n\nJanmashtami — Journey to the Soul`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true);
      AudioManager.getInstance().playTick({ volume: 0.2 });
      setTimeout(() => setIsCopied(false), 2500);
    });
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Journey to the Soul — Janmashtami Keepsake',
      text: `I just completed the Janmashtami Quest: "I am an eternal soul."\n\n${selectedVerse.citation}: ${selectedVerse.english}`,
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
    <section className="max-w-4xl mx-auto px-4 py-6" aria-label="Final Station: The Sacred Mirror">
      {/* Station Kicker & Intro */}
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-peacock-900/80 border border-teal-500/30 text-teal-300 text-xs font-medium tracking-widest uppercase mb-3">
          <Sparkle className="w-3.5 h-3.5 text-gold-400" />
          Final Station · The Sacred Mirror
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-ivory tracking-wide drop-shadow-md">
          The Ultimate Reflection
        </h2>
        <p className="max-w-xl mx-auto text-sm sm:text-base text-ivory-dim font-body mt-2 leading-relaxed">
          The outer layers have been peeled. Life’s pursuits have been unveiled. The ocean waves
          have risen and fallen. Now, step before the sacred mirror of truth.
        </p>
      </div>

      {/* ========================================================
          STAGE 1: THE VEILED MIRROR
          ======================================================== */}
      {stage === 'mirror_closed' && (
        <div className="max-w-md mx-auto p-8 rounded-3xl bg-peacock-900/80 border border-gold-500/40 shadow-divine-md text-center relative overflow-hidden animate-in fade-in duration-400">
          <div className="relative w-56 h-72 mx-auto rounded-niche bg-gradient-to-b from-peacock-950 via-peacock-900 to-peacock-950 border-4 border-gold-400/60 shadow-divine-lg flex flex-col items-center justify-center p-4 overflow-hidden mb-6">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-gold-200/10 to-transparent animate-pulse pointer-events-none" />

            <div className="p-4 rounded-full bg-gold-500/20 border border-gold-400/40 text-gold-300 mb-3 shadow-divine-sm">
              <DiyaIcon className="w-8 h-8" />
            </div>

            <p className="text-xs font-display tracking-widest text-gold-300 uppercase">
              The Mirror of Truth
            </p>
            <p className="text-[11px] text-ivory-dim font-quote italic mt-1 text-center px-2">
              Ripples veil the surface until the heart dares to look within.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenMirror}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-peacock-950 font-display font-bold text-sm tracking-wider shadow-divine-md hover:shadow-divine-lg active:scale-95 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-gold-300"
          >
            <span>Look Into The Mirror</span>
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ========================================================
          STAGE 2: THE DEEP SELF-INQUIRY (PSYCHOLOGICAL BUILDUP)
          ======================================================== */}
      {stage === 'deep_inquiry' && (
        <div className="max-w-xl mx-auto p-7 sm:p-9 rounded-3xl bg-gradient-to-b from-peacock-900/95 via-peacock-950 to-peacock-900 border border-gold-500/40 shadow-divine-lg relative overflow-hidden animate-in fade-in duration-500">
          {/* Subtle cosmic aura backdrop in the mirror */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(20,184,166,0.12)_0%,transparent_60%)] pointer-events-none" />

          {/* Stepper Indicator */}
          <div className="flex items-center justify-between mb-6 border-b border-teal-500/20 pb-3">
            <span className="text-[11px] font-display font-semibold tracking-widest text-gold-300 uppercase">
              Inquiry {inquiryIndex + 1} of {INQUIRY_QUESTIONS.length}
            </span>
            <div className="flex items-center gap-1.5">
              {INQUIRY_QUESTIONS.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === inquiryIndex
                      ? 'w-6 bg-gold-400'
                      : i < inquiryIndex
                      ? 'w-2 bg-teal-400'
                      : 'w-2 bg-peacock-800'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Active Contemplative Inquiry Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={inquiryIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="min-h-[170px] flex flex-col justify-center text-center px-2 mb-6"
            >
              <span className="text-xs font-sans font-medium uppercase tracking-[0.2em] text-teal-300 mb-2 block">
                {INQUIRY_QUESTIONS[inquiryIndex].kicker}
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-ivory mb-3 leading-snug">
                {INQUIRY_QUESTIONS[inquiryIndex].lead}
              </h3>
              <p className="text-sm sm:text-base text-ivory-dim font-quote italic leading-relaxed">
                &ldquo;{INQUIRY_QUESTIONS[inquiryIndex].sub}&rdquo;
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Action Button: Next question OR Grand Climax Trigger */}
          <div className="text-center pt-2">
            {inquiryIndex < INQUIRY_QUESTIONS.length - 1 ? (
              <button
                type="button"
                onClick={handleNextInquiry}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-peacock-800 hover:bg-peacock-750 border border-gold-500/30 text-gold-200 hover:text-ivory font-display text-xs tracking-wider transition-all active:scale-95"
              >
                <span>Go Deeper</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              /* THE HIGH-STAKES CLIMAX BUTTON! */
              <div className="flex flex-col items-center gap-3">
                <motion.button
                  type="button"
                  onClick={handleRevealSoul}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(245, 158, 11, 0.3)',
                      '0 0 35px rgba(245, 158, 11, 0.65)',
                      '0 0 20px rgba(245, 158, 11, 0.3)',
                    ],
                  }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                  className="relative group px-8 py-4 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-peacock-950 font-display font-bold text-sm sm:text-base tracking-[0.15em] uppercase shadow-divine-lg cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-gold-300"
                >
                  <span className="flex items-center gap-2.5">
                    <Sparkles className="w-5 h-5 text-peacock-950 animate-spin" />
                    <span>Reveal Who I Am</span>
                    <Sparkles className="w-5 h-5 text-peacock-950 animate-spin" />
                  </span>
                </motion.button>
                <p className="text-[11px] text-gold-300/80 font-sans tracking-wide">
                  Tap to unveil your eternal, unchanging identity
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          STAGE 3: THE GOOSEBUMPS REVELATION! (CLIMAX REALIZATION)
          ======================================================== */}
      {stage === 'soul_revelation' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative max-w-2xl mx-auto p-7 sm:p-10 rounded-3xl bg-gradient-to-b from-peacock-900/95 via-peacock-950 to-peacock-900 border-2 border-gold-400 shadow-[0_0_60px_rgba(245,158,11,0.35)] text-center overflow-hidden"
        >
          {/* Luminous Golden Aura Shockwaves */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(254,240,138,0.2)_0%,rgba(245,158,11,0.08)_45%,transparent_70%)] pointer-events-none" />

          {/* Radiant Atman Spark Emblem */}
          <div className="relative inline-flex p-4 rounded-full bg-gradient-to-br from-gold-400/30 to-gold-600/30 border border-gold-300 text-gold-200 mb-4 shadow-[0_0_25px_rgba(254,240,138,0.5)]">
            <AtmanSparkIcon className="w-12 h-12 text-gold-200" />
          </div>

          {/* Sacred Sanskrit Epiphany */}
          <p className="text-xs sm:text-sm font-sans font-semibold tracking-[0.25em] text-teal-300 uppercase mb-2">
            The Eternal Truth Unveiled
          </p>

          <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold-100 via-gold-300 to-gold-500 mb-3 tracking-wide drop-shadow-md">
            I AM THE ETERNAL SOUL
          </h3>

          <p className="text-sm sm:text-base font-quote italic text-gold-200 tracking-wider mb-5">
            अहं ब्रह्मास्मि · Aham Brahmāsmi · Sac-cid-ānanda
          </p>

          {/* Deep Emotional Epiphany Text */}
          <div className="max-w-lg mx-auto text-xs sm:text-sm text-ivory font-body leading-relaxed mb-6 space-y-3">
            <p className="p-3.5 rounded-2xl bg-peacock-900/80 border border-gold-500/30 font-medium">
              You are not a mortal body trying to have a spiritual experience.<br />
              <span className="text-gold-300 font-semibold">
                You are an immortal soul on a sacred journey.
              </span>
            </p>
            <p className="text-ivory-dim">
              You were never born, and you will never die. Fire cannot burn you, water cannot wet
              you, and time cannot touch your conscious essence. You are eternal, full of knowledge,
              full of bliss, and forever connected to Lord Krishna.
            </p>
          </div>

          {/* Sacred Bhagavad Gita 2.20 Verse */}
          <blockquote className="text-xs sm:text-sm text-gold-100 font-quote italic max-w-lg mx-auto mb-6 border-t border-b border-gold-500/25 py-3.5">
            &ldquo;न जायते म्रियते वा कदाचिन्<br />
            नायं भूत्वा भविता वा न भूयः ।<br />
            अजो नित्यः शाश्वतोऽयं पुराणो<br />
            न हन्यते हन्यमाने शरीरे ॥&rdquo;
            <p className="text-xs font-sans not-italic text-ivory-dim mt-2">
              &ldquo;For the soul there is neither birth nor death at any time. He is unborn,
              eternal, ever-existing, and primeval. He is not slain when the body is slain.&rdquo;
            </p>
            <footer className="text-gold-300 font-sans text-xs not-italic mt-1 font-semibold">
              — Bhagavad Gita 2.20
            </footer>
          </blockquote>

          {/* Continue to Keepsake Card Suite */}
          <button
            type="button"
            onClick={handleProceedToKeepsake}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-peacock-950 font-display font-bold text-xs sm:text-sm tracking-wider shadow-divine-md hover:shadow-divine-lg active:scale-95 transition-all outline-none"
          >
            <span>Create Your Sacred Soul Card Keepsake</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      {/* ========================================================
          STAGE 4: KEEPSAKE CUSTOMIZER & 3D INTERACTIVE CARD
          ======================================================== */}
      {stage === 'card_suite' && (
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Customizer Controls (Left 6 Cols) */}
            <div className="lg:col-span-6 p-6 rounded-3xl bg-peacock-900/80 border border-teal-500/30 shadow-glass-panel space-y-6">
              <h4 className="text-lg font-display font-bold text-ivory flex items-center gap-2">
                <DiyaIcon className="w-5 h-5 text-gold-400" />
                <span>Personalize Your Keepsake</span>
              </h4>

              {/* Name Input */}
              <div>
                <label
                  htmlFor="seeker-name"
                  className="block text-xs font-semibold uppercase tracking-wider text-gold-300 mb-2 font-sans"
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
                  className="w-full px-4 py-3 rounded-2xl bg-peacock-950 border border-gold-500/30 text-ivory placeholder-ivory-dim/40 text-sm focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all"
                />
              </div>

              {/* Sacred Theme Selection */}
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-gold-300 mb-2 font-sans">
                  Sacred Foil Theme
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
                            ? 'bg-peacock-800 border-gold-400 ring-2 ring-gold-400/30 text-gold-200'
                            : 'bg-peacock-950/70 border-peacock-800 text-ivory-dim hover:border-gold-500/40 hover:text-ivory'
                        }`}
                      >
                        <div className="flex justify-center mb-1.5">
                          {theme.id === 'vrindavan' ? (
                            <PeacockFeatherIcon className="w-5 h-5" />
                          ) : theme.id === 'radha' ? (
                            <SacredLotusIcon className="w-5 h-5" />
                          ) : (
                            <DiyaIcon className="w-5 h-5" />
                          )}
                        </div>
                        <span className="text-[11px] font-display block leading-tight font-medium">
                          {theme.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sacred Vedic Verse Selection */}
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-gold-300 mb-2 font-sans">
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
                            ? 'bg-peacock-800 border-gold-400 ring-2 ring-gold-400/20 text-gold-200'
                            : 'bg-peacock-950/60 border-peacock-800/80 text-ivory-dim hover:border-gold-500/30 hover:text-ivory'
                        }`}
                      >
                        <div>
                          <p className="text-xs font-display font-semibold text-ivory">
                            {verse.citation} · {verse.kicker}
                          </p>
                          <p className="text-[11px] text-ivory-dim font-quote italic line-clamp-1 mt-0.5">
                            {verse.english}
                          </p>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />}
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
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-peacock-950 font-display font-bold text-xs tracking-wider shadow-divine-md active:scale-95 transition-all outline-none"
                >
                  <Download className="w-4 h-4" />
                  <span>Download 1200x1600 PNG</span>
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleCopyVerse}
                    className="p-3 rounded-2xl bg-peacock-800 hover:bg-peacock-750 border border-teal-500/30 text-ivory hover:text-gold-200 transition-colors"
                    title="Copy Verse"
                  >
                    {isCopied ? <Check className="w-4 h-4 text-teal-300" /> : <Copy className="w-4 h-4" />}
                  </button>

                  <button
                    type="button"
                    onClick={handleShare}
                    className="p-3 rounded-2xl bg-peacock-800 hover:bg-peacock-750 border border-teal-500/30 text-ivory hover:text-gold-200 transition-colors"
                    title="Share Keepsake"
                  >
                    {isShared ? <Check className="w-4 h-4 text-teal-300" /> : <Share2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Live 3D Interactive Keepsake Card Preview (Right 6 Cols) */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <span className="text-[11px] font-sans text-ivory-dim/70 uppercase tracking-widest mb-3">
                Interactive 3D Holographic Card (Hover / Tilt)
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
                  className="absolute inset-0 rounded-3xl pointer-events-none z-20 mix-blend-overlay transition-opacity duration-150"
                  style={{
                    background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.4) 0%, transparent 65%)`,
                  }}
                  aria-hidden="true"
                />

                {/* High-DPI Canvas Rendering Target */}
                <canvas
                  ref={canvasRef}
                  className="w-full h-full rounded-2xl shadow-divine-lg border border-gold-400/40 block"
                />
              </div>

              <p className="text-[11px] text-ivory-dim font-quote italic mt-3 text-center">
                Certified high-resolution keepsake · Ready for 1-click single PNG download.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
