// Custom UJWALA SVG Icons and Sacred Line Art

/**
 * UJWALA Radiance Line-Art Emblem
 * Minimal, delicate inner light burst
 */
export function UjwalaRadianceIcon({ className = 'w-6 h-6', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true" {...props}>
      <circle cx="20" cy="20" r="3.5" fill="#D6B15E" />
      <circle cx="20" cy="20" r="7" stroke="#D6B15E" strokeWidth="1" strokeDasharray="2 2" opacity="0.8" />
      <path d="M20 4V10M20 30V36M4 20H10M30 20H36M8.68 8.68L12.92 12.92M27.08 27.08L31.32 31.32M8.68 31.32L12.92 27.08M27.08 12.92L31.32 8.68" stroke="#D6B15E" strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
}

/**
 * Delicate Lotus Line-Art (Feminine, minimal, spiritual)
 */
export function LotusLineArt({ className = 'w-6 h-6', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 40" fill="none" className={className} aria-hidden="true" {...props}>
      {/* Central petal */}
      <path d="M24 6 C21 15 20 25 24 34 C28 25 27 15 24 6 Z" stroke="#E8B7BE" strokeWidth="1.25" fill="#FDF7F8" fillOpacity="0.8" />
      {/* Inner left petal */}
      <path d="M22 12 C16 19 15 26 21 34 C22 26 22 18 22 12 Z" stroke="#D6B15E" strokeWidth="1.1" fill="#FAF2F4" fillOpacity="0.5" />
      {/* Inner right petal */}
      <path d="M26 12 C32 19 33 26 27 34 C26 26 26 18 26 12 Z" stroke="#D6B15E" strokeWidth="1.1" fill="#FAF2F4" fillOpacity="0.5" />
      {/* Outer wings */}
      <path d="M17 19 C10 24 9 30 19 34 C17 27 17 23 17 19 Z" stroke="#E8B7BE" strokeWidth="1" strokeLinecap="round" />
      <path d="M31 19 C38 24 39 30 29 34 C31 27 31 23 31 19 Z" stroke="#E8B7BE" strokeWidth="1" strokeLinecap="round" />
      {/* Base water line */}
      <path d="M12 36 C18 38 30 38 36 36" stroke="#D6B15E" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

/**
 * Sacred Diya Line-Art (Warm, subtle flame)
 */
export function DiyaLineArt({ className = 'w-6 h-6', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true" {...props}>
      <defs>
        <radialGradient id="diyaGlow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#FFF2B2" />
          <stop offset="60%" stopColor="#E8D18A" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#D6B15E" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Flame */}
      <path d="M20 7 C17 14 17 17 20 22 C23 17 23 14 20 7 Z" fill="url(#diyaGlow)" stroke="#D6B15E" strokeWidth="1" />
      <circle cx="20" cy="18" r="1.5" fill="#FFFDF9" />
      {/* Diya Bowl Line */}
      <path d="M10 23 C10 30 30 30 30 23 C26 25 14 25 10 23 Z" stroke="#C49B45" strokeWidth="1.25" fill="#FAF5EB" />
      <path d="M14 30 L26 30" stroke="#C49B45" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Refined Peacock Feather Line-Art (Delicate, spiritual accent)
 */
export function PeacockFeatherIcon({ className = 'w-6 h-6', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 60 100" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M30 95 C30 70 24 55 30 15" stroke="#24566A" strokeWidth="1.5" strokeLinecap="round" opacity="0.75" />
      <ellipse cx="30" cy="26" rx="16" ry="20" stroke="#D6B15E" strokeWidth="1.2" fill="#FAF6ED" />
      <ellipse cx="30" cy="26" rx="10" ry="13" stroke="#24566A" strokeWidth="1" fill="#E6F0F4" opacity="0.8" />
      <ellipse cx="30" cy="26" rx="6" ry="8" fill="#D6B15E" opacity="0.9" />
      <circle cx="30" cy="26" r="2.8" fill="#24566A" />
      <circle cx="29" cy="25" r="1" fill="#FFFDF9" />
      {/* Delicate barbs */}
      <path d="M23 34 C15 42 12 52 16 62" stroke="#E8B7BE" strokeWidth="0.9" opacity="0.7" />
      <path d="M37 34 C45 42 48 52 44 62" stroke="#E8B7BE" strokeWidth="0.9" opacity="0.7" />
      <path d="M25 48 C18 56 16 66 22 74" stroke="#D6B15E" strokeWidth="0.8" opacity="0.6" />
      <path d="M35 48 C42 56 44 66 38 74" stroke="#D6B15E" strokeWidth="0.8" opacity="0.6" />
    </svg>
  );
}

/**
 * Sacred Bansuri Flute Line-Art
 */
export function GoldenFluteIcon({ className = 'w-8 h-4', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 24" fill="none" className={className} aria-hidden="true" {...props}>
      <rect x="6" y="9.5" width="88" height="5" rx="2.5" stroke="#D6B15E" strokeWidth="1.2" fill="#FAF5EB" />
      <circle cx="24" cy="12" r="1.3" fill="#403A35" />
      <circle cx="38" cy="12" r="1.3" fill="#403A35" />
      <circle cx="52" cy="12" r="1.3" fill="#403A35" />
      <circle cx="66" cy="12" r="1.3" fill="#403A35" />
      <circle cx="80" cy="12" r="1.3" fill="#403A35" />
      {/* Thread binding tassels */}
      <rect x="14" y="8" width="1.5" height="8" rx="0.5" fill="#E8B7BE" />
      <rect x="86" y="8" width="1.5" height="8" rx="0.5" fill="#E8B7BE" />
    </svg>
  );
}

/**
 * Sacred Lotus Emblem (SVG)
 */
export function SacredLotusIcon({ className = 'w-6 h-6', ...props }: React.SVGProps<SVGSVGElement>) {
  return <LotusLineArt className={className} {...props} />;
}

/**
 * Sacred Diya / Lamp Icon (SVG)
 */
export function DiyaIcon({ className = 'w-6 h-6', ...props }: React.SVGProps<SVGSVGElement>) {
  return <DiyaLineArt className={className} {...props} />;
}

/**
 * Sacred Atman Radiant Spark (SVG)
 */
export function AtmanSparkIcon({ className = 'w-8 h-8', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 50 50" fill="none" className={className} aria-hidden="true" {...props}>
      <circle cx="25" cy="25" r="7" fill="#E8D18A" opacity="0.85" />
      <circle cx="25" cy="25" r="3.5" fill="#FFFDF9" />
      <path d="M25 2 L25 48 M2 25 L48 25 M9 9 L41 41 M9 41 L41 9" stroke="#D6B15E" strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />
    </svg>
  );
}

/**
 * Sacred Lock Icon (SVG) - Minimal, refined
 */
export function SacredLockIcon({ className = 'w-4 h-4', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M7 10V6.5C7 3.74 9.24 1.5 12 1.5C14.76 1.5 17 3.74 17 6.5V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="4.5" y="10" width="15" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.06" />
      <circle cx="12" cy="14.5" r="1.5" fill="currentColor" />
      <path d="M12 15.5V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

