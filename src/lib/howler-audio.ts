'use client';

import { Howl, Howler } from 'howler';

export interface SoundEffectOptions {
  volume?: number;
  rate?: number;
}

/**
 * Reusable Audio Architecture using Howler.js
 *
 * Capabilities:
 * - Independent background music channel with smooth crossfade
 * - Sound effects (SFX) channel with volume controls
 * - Global mute/unmute management
 * - Automatic browser autoplay restriction unlock
 * - Full memory cleanup & instance teardown
 */
export class HowlerAudioManager {
  private static instance: HowlerAudioManager | null = null;
  private currentBgm: Howl | null = null;
  private currentBgmKey: string | null = null;
  private isMuted: boolean = false;
  private globalVolume: number = 0.85;
  private isAutoplayUnlocked: boolean = false;

  private constructor() {
    if (typeof window !== 'undefined') {
      this.setupAutoplayUnlock();
    }
  }

  public static getInstance(): HowlerAudioManager {
    if (!HowlerAudioManager.instance) {
      HowlerAudioManager.instance = new HowlerAudioManager();
    }
    return HowlerAudioManager.instance;
  }

  /**
   * Listen for first user gesture to unlock browser audio context if suspended
   */
  private setupAutoplayUnlock(): void {
    const unlock = () => {
      if (this.isAutoplayUnlocked) return;
      if (Howler.ctx && Howler.ctx.state === 'suspended') {
        Howler.ctx.resume().then(() => {
          this.isAutoplayUnlocked = true;
        }).catch(() => {});
      } else {
        this.isAutoplayUnlocked = true;
      }
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };

    window.addEventListener('pointerdown', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });
  }

  /**
   * Play background music with optional smooth fade-in
   */
  public playBgm(key: string, src: string | string[], options: { loop?: boolean; volume?: number; fadeInDuration?: number } = {}): void {
    if (this.currentBgmKey === key && this.currentBgm && this.currentBgm.playing()) {
      return;
    }

    const targetVolume = options.volume ?? 0.6;
    const fadeIn = options.fadeInDuration ?? 1000;

    // Fade out previous BGM if playing
    if (this.currentBgm) {
      const prev = this.currentBgm;
      prev.fade(prev.volume(), 0, fadeIn);
      setTimeout(() => {
        prev.stop();
        prev.unload();
      }, fadeIn);
    }

    this.currentBgmKey = key;
    this.currentBgm = new Howl({
      src: Array.isArray(src) ? src : [src],
      loop: options.loop ?? true,
      volume: 0,
      html5: true, // Use HTML5 Audio for streaming music tracks
    });

    this.currentBgm.play();
    this.currentBgm.fade(0, targetVolume, fadeIn);
  }

  /**
   * Stop background music with fade-out
   */
  public stopBgm(fadeOutDuration: number = 800): void {
    if (!this.currentBgm) return;
    const bgm = this.currentBgm;
    bgm.fade(bgm.volume(), 0, fadeOutDuration);
    setTimeout(() => {
      bgm.stop();
      this.currentBgm = null;
      this.currentBgmKey = null;
    }, fadeOutDuration);
  }

  /**
   * Play a one-shot sound effect
   */
  public playSfx(src: string | string[], options: SoundEffectOptions = {}): Howl {
    const sfx = new Howl({
      src: Array.isArray(src) ? src : [src],
      volume: (options.volume ?? 0.8) * this.globalVolume,
      rate: options.rate ?? 1.0,
      onend: () => {
        sfx.unload();
      },
    });

    sfx.play();
    return sfx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    Howler.mute(this.isMuted);
    return this.isMuted;
  }

  public setMute(muted: boolean): void {
    this.isMuted = muted;
    Howler.mute(muted);
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public setMasterVolume(vol: number): void {
    this.globalVolume = Math.max(0, Math.min(1, vol));
    Howler.volume(this.globalVolume);
  }

  /**
   * Completely unload all sounds and reset engine
   */
  public cleanup(): void {
    if (this.currentBgm) {
      this.currentBgm.stop();
      this.currentBgm.unload();
      this.currentBgm = null;
      this.currentBgmKey = null;
    }
    Howler.unload();
  }
}
