'use client';

import { useState, useCallback, useEffect } from 'react';
import { StationId } from '@/types';
import { AudioManager } from '@/audio/audio-manager';

export interface ToastMessage {
  id: string;
  title: string;
  subtitle?: string;
}

export function useQuestState() {
  const [activeStation, setActiveStation] = useState<StationId>('1');
  const [completedStations, setCompletedStations] = useState<Set<StationId>>(new Set());
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [isSoundOn, setIsSoundOn] = useState<boolean>(false);

  const showToast = useCallback((title: string, subtitle?: string) => {
    const id = Date.now().toString();
    setToast({ id, title, subtitle });
    AudioManager.getInstance().playTick({ volume: 0.15 });

    setTimeout(() => {
      setToast((curr) => (curr?.id === id ? null : curr));
    }, 4000);
  }, []);

  const canEnterStation = useCallback(
    (stationId: StationId): { allowed: boolean; reason?: string; subtitle?: string } => {
      if (stationId === '1' || stationId === '2') {
        return { allowed: true };
      }

      if (stationId === '3') {
        if (!completedStations.has('2')) {
          return {
            allowed: false,
            reason: 'Complete Level 2 first to continue your journey.',
            subtitle: 'Reveal all 5 Mystery Boxes to unlock the next level.',
          };
        }
        return { allowed: true };
      }

      if (stationId === 'final') {
        if (!completedStations.has('3')) {
          return {
            allowed: false,
            reason: 'Complete Level 3 first to continue your journey.',
            subtitle: 'Finish the Ocean Journey to unlock the sacred mirror reveal.',
          };
        }
        return { allowed: true };
      }

      return { allowed: true };
    },
    [completedStations]
  );

  const goToStation = useCallback(
    (target: StationId): boolean => {
      const check = canEnterStation(target);
      if (!check.allowed) {
        showToast(check.reason || 'Station is locked', check.subtitle);
        return false;
      }

      setActiveStation(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Track music transition
      if (target === 'final') {
        AudioManager.getInstance().transitionToTrack('final');
      } else {
        AudioManager.getInstance().transitionToTrack('main');
      }

      return true;
    },
    [canEnterStation, showToast]
  );

  const markStationComplete = useCallback((stationId: StationId) => {
    setCompletedStations((prev) => {
      const next = new Set(prev);
      next.add(stationId);
      return next;
    });
  }, []);

  const toggleSound = useCallback(() => {
    const nextState = AudioManager.getInstance().toggleSound();
    setIsSoundOn(nextState);
  }, []);

  return {
    activeStation,
    completedStations,
    toast,
    isSoundOn,
    goToStation,
    markStationComplete,
    canEnterStation,
    showToast,
    toggleSound,
  };
}
