'use client';

import React from 'react';
import { useQuestState } from '@/hooks/use-quest-state';
import { ToranaHeader } from '@/components/layout/torana-header';
import { RiverNav } from '@/components/layout/river-nav';
import { QuestToast } from '@/components/ui/toast';
import { ParticlesCanvas } from '@/components/game/particles-canvas';
import { Level1Container } from '@/features/level1/level1-container';
import { Level2Container } from '@/features/level2/level2-container';
import { Level3Container } from '@/features/level3/level3-container';
import { FinalContainer } from '@/features/final/final-container';
import { PeacockFeatherIcon } from '@/components/ui/icons';

export default function QuestPage() {
  const {
    activeStation,
    completedStations,
    toast,
    isSoundOn,
    goToStation,
    markStationComplete,
    canEnterStation,
    toggleSound,
  } = useQuestState();

  return (
    <div className="relative min-h-screen flex flex-col justify-between selection:bg-gold-500/25 selection:text-gold-200">
      {/* Background Interactive Particle Layer */}
      <ParticlesCanvas />

      {/* Progression Lock Notification Toast */}
      <QuestToast toast={toast} />

      {/* Top Experience Torana Header */}
      <ToranaHeader isSoundOn={isSoundOn} onToggleSound={toggleSound} />

      {/* Main Quest Canvas & Progression */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 z-10">
        {/* River Yamuna Navigation Progress Track */}
        <RiverNav
          activeStation={activeStation}
          completedStations={completedStations}
          onSelectStation={goToStation}
          canEnter={canEnterStation}
        />

        {/* Station Views */}
        <div className="transition-opacity duration-300">
          {activeStation === '1' && (
            <Level1Container
              onComplete={() => markStationComplete('1')}
              onContinue={() => goToStation('2')}
            />
          )}

          {activeStation === '2' && (
            <Level2Container
              onComplete={() => markStationComplete('2')}
              onContinue={() => goToStation('3')}
            />
          )}

          {activeStation === '3' && (
            <Level3Container
              onComplete={() => markStationComplete('3')}
              onContinue={() => goToStation('final')}
            />
          )}

          {activeStation === 'final' && (
            <FinalContainer onComplete={() => markStationComplete('final')} />
          )}
        </div>
      </main>

      {/* Sacred Vrindavan Footer */}
      <footer className="w-full py-8 mt-20 sm:mt-24 border-t border-peacock-800/60 text-center relative z-10 text-xs text-ivory-dim/70">
        <div className="max-w-xl mx-auto px-4 flex flex-col items-center gap-2.5">
          <div className="p-1.5 rounded-full bg-peacock-900 border border-teal-500/20 text-teal-400">
            <PeacockFeatherIcon className="w-4 h-6" />
          </div>
          <p className="font-display tracking-[0.18em] text-gold-400/80 uppercase text-[11px]">
            Janmashtami · Journey to the Soul
          </p>
          <p className="font-quote italic text-ivory-dim/40 text-xs sm:text-[13px] max-w-lg leading-relaxed">
            &ldquo;In this world, there is nothing so sublime and pure as transcendental knowledge.&rdquo; — Bhagavad Gita 4.38
          </p>
        </div>
      </footer>
    </div>
  );
}
