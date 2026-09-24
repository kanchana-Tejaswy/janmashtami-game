'use client';

import React from 'react';
import {
  User,
  Heart,
  Briefcase,
  IdCard,
  Award,
  Sparkles,
  Coins,
  Trophy,
  Users,
  Compass,
  ShoppingBag,
  ThumbsUp,
  SmartphoneCharging,
  HeartCrack,
  TrendingDown,
  Pause,
  Feather,
  Sun,
  Lock,
  LockOpen,
  Volume2,
  VolumeX,
  ChevronRight,
  ChevronLeft,
  Share2,
  Download,
  Copy,
  Check,
  RotateCcw,
  Sparkle,
  Flame,
} from 'lucide-react';

export {
  User,
  Heart,
  Briefcase,
  IdCard,
  Award,
  Sparkles,
  Coins,
  Trophy,
  Users,
  Compass,
  ShoppingBag,
  ThumbsUp,
  SmartphoneCharging,
  HeartCrack,
  TrendingDown,
  Pause,
  Feather,
  Sun,
  Lock,
  LockOpen,
  Volume2,
  VolumeX,
  ChevronRight,
  ChevronLeft,
  Share2,
  Download,
  Copy,
  Check,
  RotateCcw,
  Sparkle,
  Flame,
};

/**
 * Bespoke Peacock Feather Icon (SVG)
 * Sacred Janmashtami / Vrindavan Emblem
 */
export function PeacockFeatherIcon({ className = 'w-6 h-6', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 60 100" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M30,95 C30,70 20,60 30,10" stroke="#14b8a6" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="30" cy="22" rx="18" ry="24" fill="#00695c" opacity="0.9" />
      <ellipse cx="30" cy="22" rx="12" ry="16" fill="#0d9488" />
      <ellipse cx="30" cy="22" rx="7" ry="10" fill="#f59e0b" />
      <circle cx="30" cy="22" r="3.2" fill="#061024" />
      <circle cx="28.8" cy="20.8" r="1.1" fill="#fef08a" />
      {/* Delicate feather barbs */}
      <path d="M22,32 C12,42 8,56 12,68" stroke="#14b8a6" strokeWidth="1.2" opacity="0.75" />
      <path d="M38,32 C48,42 52,56 48,68" stroke="#14b8a6" strokeWidth="1.2" opacity="0.75" />
      <path d="M25,48 C16,60 14,74 20,84" stroke="#00695c" strokeWidth="1" opacity="0.6" />
      <path d="M35,48 C44,60 46,74 40,84" stroke="#00695c" strokeWidth="1" opacity="0.6" />
    </svg>
  );
}

/**
 * Sacred Golden Bansuri Flute Icon (SVG)
 */
export function GoldenFluteIcon({ className = 'w-8 h-4', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 24" fill="none" className={className} aria-hidden="true" {...props}>
      <defs>
        <linearGradient id="fluteGoldGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#b45309" />
          <stop offset="30%" stopColor="#fbbf24" />
          <stop offset="70%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <rect x="4" y="9" width="92" height="6.5" rx="3.25" fill="url(#fluteGoldGrad)" />
      <circle cx="24" cy="12.2" r="1.5" fill="#061024" />
      <circle cx="38" cy="12.2" r="1.5" fill="#061024" />
      <circle cx="52" cy="12.2" r="1.5" fill="#061024" />
      <circle cx="66" cy="12.2" r="1.5" fill="#061024" />
      <circle cx="80" cy="12.2" r="1.5" fill="#061024" />
      {/* Thread binding tassels */}
      <rect x="14" y="8" width="2" height="8.5" rx="0.5" fill="#ef4444" />
      <rect x="88" y="8" width="2" height="8.5" rx="0.5" fill="#ef4444" />
    </svg>
  );
}

/**
 * Sacred Lotus Emblem (SVG)
 */
export function SacredLotusIcon({ className = 'w-6 h-6', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true" {...props}>
      <defs>
        <linearGradient id="lotusPetal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
      </defs>
      {/* Central petal */}
      <path d="M24,8 C21,18 20,28 24,38 C28,28 27,18 24,8 Z" fill="url(#lotusPetal)" />
      {/* Left petal */}
      <path d="M22,14 C15,22 13,30 20,38 C21,28 22,20 22,14 Z" fill="#fb7185" opacity="0.85" />
      {/* Right petal */}
      <path d="M26,14 C33,22 35,30 28,38 C27,28 26,20 26,14 Z" fill="#fb7185" opacity="0.85" />
      {/* Outer wings */}
      <path d="M16,22 C8,28 8,36 18,39 C17,31 16,26 16,22 Z" fill="#fda4af" opacity="0.7" />
      <path d="M32,22 C40,28 40,36 30,39 C31,31 32,26 32,22 Z" fill="#fda4af" opacity="0.7" />
      {/* Base node */}
      <ellipse cx="24" cy="38" rx="8" ry="3" fill="#14b8a6" />
    </svg>
  );
}

/**
 * Sacred Diya / Lamp Icon (SVG)
 */
export function DiyaIcon({ className = 'w-6 h-6', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true" {...props}>
      <defs>
        <radialGradient id="flameGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="60%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      {/* Flame */}
      <path d="M20,6 C16,14 16,18 20,24 C24,18 24,14 20,6 Z" fill="url(#flameGlow)" />
      <circle cx="20" cy="18" r="2.5" fill="#fef08a" />
      {/* Diya Clay Bowl */}
      <path d="M8,24 C8,32 32,32 32,24 C28,26 12,26 8,24 Z" fill="#b45309" />
      <path d="M12,32 L28,32 L26,35 L14,35 Z" fill="#78350f" />
    </svg>
  );
}

/**
 * Sacred Atman Radiant Spark (SVG)
 */
export function AtmanSparkIcon({ className = 'w-8 h-8', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 50 50" fill="none" className={className} aria-hidden="true" {...props}>
      <circle cx="25" cy="25" r="7" fill="#fef08a" filter="drop-shadow(0 0 8px #fbbf24)" />
      <circle cx="25" cy="25" r="3.5" fill="#ffffff" />
      <path d="M25,2 L25,48 M2,25 L48,25 M9,9 L41,41 M9,41 L41,9" stroke="#fef08a" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

/**
 * Sacred Temple Padlock Icon (SVG)
 * Elegant, antique lock matching the serif / Cinzel aesthetic
 */
export function SacredLockIcon({ className = 'w-4 h-4', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      {/* Ornate Arched Shackle */}
      <path
        d="M7 10V6.5C7 3.74 9.24 1.5 12 1.5C14.76 1.5 17 3.74 17 6.5V10"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      {/* Padlock Body with subtle beveled corners */}
      <rect
        x="4.5"
        y="10"
        width="15"
        height="12"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.75"
        fill="currentColor"
        fillOpacity="0.12"
      />
      {/* Antique Keyhole */}
      <circle cx="12" cy="14.5" r="1.5" fill="currentColor" />
      <path
        d="M12 15.5V18"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

