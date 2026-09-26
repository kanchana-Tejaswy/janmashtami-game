'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { UjwalaRadianceIcon } from '@/components/ui/icons';
import { fadeInVariants } from '@/lib/motion-presets';

export interface StationShellProps {
  stationNumber: '01' | '02' | '03' | '04' | 'I' | 'II' | 'III' | 'IV';
  kicker: string;
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

export function StationShell({
  stationNumber,
  kicker,
  title,
  description,
  children,
  className = '',
}: StationShellProps) {
  return (
    <motion.section
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`max-w-4xl mx-auto px-4 py-8 ${className}`}
      aria-label={`Station ${stationNumber}: ${title}`}
    >
      {/* Header & Subtitle */}
      <div className="text-center mb-8">
        <Badge variant="gold" className="mb-3">
          <UjwalaRadianceIcon className="w-3.5 h-3.5 text-gold-600" />
          <span>Stage {stationNumber} · {kicker}</span>
        </Badge>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-warm-900 tracking-wide">
          {title}
        </h2>
        <p className="max-w-xl mx-auto text-sm sm:text-base text-warm-600 font-serif italic mt-2 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Main Content Body */}
      <div>{children}</div>
    </motion.section>
  );
}
