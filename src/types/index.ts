export type StationId = '1' | '2' | '3' | 'final';

export interface StationStatus {
  id: StationId;
  title: string;
  subtitle: string;
  isCompleted: boolean;
  isUnlocked: boolean;
  romanNumeral: string;
}

export interface LayerItem {
  id: string;
  name: string;
  iconName: 'body' | 'emotions' | 'profession' | 'name' | 'identity' | 'thoughts';
  color: string;
  description: string;
  teaching: string;
}

export interface MysteryBoxItem {
  id: number;
  romanNumeral: string;
  title: string;
  tag: string;
  iconName: 'money' | 'career' | 'relationships' | 'experiences' | 'purpose';
  shortSummary: string;
  fullTeaching: string;
  isClimax?: boolean;
}

export type CoasterPhase = 'rise' | 'drop' | 'pause' | 'peace' | 'divine';

export interface JourneyStep {
  id: number;
  phase: CoasterPhase;
  phaseLabel: string;
  badge: string;
  iconName:
    | 'shopping'
    | 'likes'
    | 'money'
    | 'success'
    | 'love'
    | 'phone'
    | 'job'
    | 'heartbreak'
    | 'finance'
    | 'pause'
    | 'peace'
    | 'spiritual';
  title: string;
  quote: string;
  description: string;
  meterValue: number;
  boatProgressRatio: number; // 0 to 1
  bannerText: string;
  sfx: 'chime' | 'drop' | 'calm' | 'divine';
}

export interface FoilTheme {
  id: string;
  name: string;
  bgCenter: string;
  bgMid: string;
  bgEdge: string;
  primaryGold: string;
  lightGold: string;
  darkGold: string;
  accent: string;
  textIvory: string;
  auraColor: string;
  borderInner: string;
  boxBg: string;
  boxBorder: string;
}

export interface VedicVerse {
  id: string;
  kicker: string;
  sanskrit: string;
  english: string;
  citation: string;
  meaning: string;
}
