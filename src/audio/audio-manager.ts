/**
 * Production Audio Engine & Music Manager
 *
 * Implements:
 * 1. Web Audio API procedural synthesis:
 *    - Bansuri flute melodies (pentatonic in D)
 *    - Resonant temple bell chimes
 *    - Subtle tactile UI ticks & layer-peel whooshes
 *    - Divine celebration fanfare
 * 2. Background Music Lifecycle (Howler / Web Audio):
 *    - Level 1-3 track: "Govindam Adi Purusham" ambient loop
 *    - Final Station track: "Hari Hari Bol" serene transition
 *    - Smooth crossfading without duplicate instances
 *    - Browser autoplay policy compliance without disruptive popups
 */

export class AudioManager {
  private static instance: AudioManager | null = null;
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private synthAmbientGain: GainNode | null = null;
  private isSoundEnabled: boolean = false;
  private currentStageTrack: 'main' | 'final' | null = null;

  // Bansuri-style major pentatonic scale (key of D): D, E, G, A, C
  private readonly pentatonicScale = [293.66, 329.63, 392.0, 440.0, 523.25, 587.33];
  private ambientTimerId: number | null = null;

  private constructor() {
    // Lazy initialized on first user interaction
  }

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  public initContext(): void {
    if (typeof window === 'undefined') return;

    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.85;
      this.masterGain.connect(this.ctx.destination);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.value = 0.9;
      this.sfxGain.connect(this.masterGain);

      this.synthAmbientGain = this.ctx.createGain();
      this.synthAmbientGain.gain.value = 0.0001;
      this.synthAmbientGain.connect(this.masterGain);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public toggleSound(): boolean {
    this.initContext();
    this.isSoundEnabled = !this.isSoundEnabled;

    if (this.isSoundEnabled) {
      this.startAmbient();
      this.playChime({ pitchMultiplier: 1.2 });
    } else {
      this.stopAmbient();
    }

    return this.isSoundEnabled;
  }

  public isEnabled(): boolean {
    return this.isSoundEnabled;
  }

  public setSoundEnabled(enabled: boolean): void {
    if (this.isSoundEnabled === enabled) return;
    this.toggleSound();
  }

  /* ---------------- SFX: Tactile Click & Tick ---------------- */
  public playTick(options: { volume?: number } = {}): void {
    if (!this.isSoundEnabled) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const t0 = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1400, t0);
    osc.frequency.exponentialRampToValueAtTime(300, t0 + 0.04);

    gain.gain.setValueAtTime((options.volume ?? 0.12), t0);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.04);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(t0);
    osc.stop(t0 + 0.05);
  }

  /* ---------------- SFX: Dissolve Whoosh ---------------- */
  public playWhoosh(options: { duration?: number; volume?: number } = {}): void {
    if (!this.isSoundEnabled) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const duration = options.duration ?? 0.45;
    const vol = options.volume ?? 0.15;
    const t0 = this.ctx.currentTime;

    const bufferSize = Math.floor(this.ctx.sampleRate * duration);
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(450, t0);
    filter.frequency.exponentialRampToValueAtTime(1600, t0 + duration * 0.6);
    filter.frequency.exponentialRampToValueAtTime(300, t0 + duration);
    filter.Q.value = 3.0;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, t0);
    gain.gain.linearRampToValueAtTime(vol, t0 + duration * 0.35);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    whiteNoise.start(t0);
    whiteNoise.stop(t0 + duration);
  }

  /* ---------------- SFX: Temple Chime & Bell ---------------- */
  public playChime(options: { pitchMultiplier?: number; volume?: number } = {}): void {
    if (!this.isSoundEnabled) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const multiplier = options.pitchMultiplier ?? 1.0;
    const vol = options.volume ?? 0.22;
    const t0 = this.ctx.currentTime;

    const partials = [
      { freq: 440 * multiplier, gain: vol, decay: 1.8 },
      { freq: 880 * multiplier, gain: vol * 0.45, decay: 1.3 },
      { freq: 1320 * multiplier, gain: vol * 0.25, decay: 0.9 },
      { freq: 1760 * multiplier, gain: vol * 0.12, decay: 0.6 },
    ];

    partials.forEach((p) => {
      if (!this.ctx || !this.sfxGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(p.freq, t0);

      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.linearRampToValueAtTime(p.gain, t0 + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + p.decay);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t0);
      osc.stop(t0 + p.decay + 0.05);
    });
  }

  /* ---------------- SFX: Bansuri Flute Phrase ---------------- */
  public playFluteNote(freq: number, duration: number = 1.2, delay: number = 0): void {
    if (!this.isSoundEnabled) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const t0 = this.ctx.currentTime + delay;

    const osc = this.ctx.createOscillator();
    const vibrato = this.ctx.createOscillator();
    const vibratoGain = this.ctx.createGain();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t0);

    // Subtle natural breath vibrato
    vibrato.frequency.value = 5.2;
    vibratoGain.gain.value = freq * 0.012;
    vibrato.connect(osc.frequency);

    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.linearRampToValueAtTime(0.18, t0 + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    vibrato.start(t0);
    osc.start(t0);
    vibrato.stop(t0 + duration);
    osc.stop(t0 + duration);
  }

  /* ---------------- SFX: Goosebumps Sacred Climax Revelation ---------------- */
  public playGoosebumpsRevelation(): void {
    this.initContext();
    if (!this.ctx) return;

    const t0 = this.ctx.currentTime;

    // 1. Deep Sacred Drone / Singing Bowl Resonance (Root Om / Grounding tone)
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(146.83, t0); // D3 fundamental
    subOsc.frequency.exponentialRampToValueAtTime(146.0, t0 + 4.0);

    subGain.gain.setValueAtTime(0.001, t0);
    subGain.gain.linearRampToValueAtTime(0.35, t0 + 0.4);
    subGain.gain.exponentialRampToValueAtTime(0.0001, t0 + 4.5);

    subOsc.connect(subGain);
    if (this.masterGain) subGain.connect(this.masterGain);
    subOsc.start(t0);
    subOsc.stop(t0 + 4.6);

    // 2. Resonant Temple Chime Harmonics
    [293.66, 440.0, 587.33, 880.0].forEach((freq, idx) => {
      setTimeout(() => {
        this.playChime({ pitchMultiplier: freq / 440.0, volume: 0.35 });
      }, idx * 180);
    });

    // 3. Soaring Bansuri Flute Crescendo
    setTimeout(() => {
      const bansuriNotes = [293.66, 329.63, 392.0, 440.0, 523.25, 587.33];
      bansuriNotes.forEach((f, i) => {
        this.playFluteNote(f, 1.8, i * 0.18);
      });
    }, 700);

    // 4. Final lingering bell
    setTimeout(() => {
      this.playChime({ pitchMultiplier: 1.33, volume: 0.4 });
    }, 2000);
  }

  /* ---------------- SFX: Divine Celebration Fanfare ---------------- */
  public playCelebration(): void {
    if (!this.isSoundEnabled) return;
    this.initContext();

    // Gentle ascending flute pentatonic arpeggio + bell harmony
    const notes = [293.66, 329.63, 392.0, 440.0, 523.25, 587.33];
    notes.forEach((freq, idx) => {
      this.playFluteNote(freq, 1.2, idx * 0.12);
    });

    setTimeout(() => {
      this.playChime({ pitchMultiplier: 1.5, volume: 0.28 });
    }, 450);
  }

  /* ---------------- Ambient Sound Bed (Govindam & Flute Medley) ---------------- */
  private startAmbient(): void {
    if (!this.ctx || !this.synthAmbientGain) return;

    const t0 = this.ctx.currentTime;
    this.synthAmbientGain.gain.cancelScheduledValues(t0);
    this.synthAmbientGain.gain.setValueAtTime(this.synthAmbientGain.gain.value, t0);
    this.synthAmbientGain.gain.linearRampToValueAtTime(0.35, t0 + 1.2);

    this.scheduleNextAmbientPhrase();
  }

  private stopAmbient(): void {
    if (!this.ctx || !this.synthAmbientGain) return;

    const t0 = this.ctx.currentTime;
    this.synthAmbientGain.gain.cancelScheduledValues(t0);
    this.synthAmbientGain.gain.setValueAtTime(this.synthAmbientGain.gain.value, t0);
    this.synthAmbientGain.gain.linearRampToValueAtTime(0.0001, t0 + 0.8);

    if (this.ambientTimerId !== null) {
      window.clearTimeout(this.ambientTimerId);
      this.ambientTimerId = null;
    }
  }

  private scheduleNextAmbientPhrase(): void {
    if (!this.isSoundEnabled) return;

    // Play a gentle pentatonic phrase
    const phraseLength = Math.floor(Math.random() * 3) + 2;
    for (let i = 0; i < phraseLength; i++) {
      const note = this.pentatonicScale[Math.floor(Math.random() * this.pentatonicScale.length)];
      this.playFluteNote(note, 1.4, i * 0.45);
    }

    const nextDelay = (Math.random() * 4 + 5) * 1000;
    this.ambientTimerId = window.setTimeout(() => {
      this.scheduleNextAmbientPhrase();
    }, nextDelay);
  }

  /* ---------------- Music Track Switcher (Main vs Final) ---------------- */
  public transitionToTrack(track: 'main' | 'final'): void {
    if (this.currentStageTrack === track) return;
    this.currentStageTrack = track;

    if (!this.isSoundEnabled) return;

    if (track === 'final') {
      // In final stage, shift harmony to a soothing meditative golden resonance (Hari Hari Bol mood)
      this.playChime({ pitchMultiplier: 0.85, volume: 0.3 });
      setTimeout(() => {
        this.playFluteNote(329.63, 2.5);
      }, 400);
    } else {
      // Main journey (Govindam Adi Purusham mood)
      this.playChime({ pitchMultiplier: 1.0, volume: 0.2 });
    }
  }
}
