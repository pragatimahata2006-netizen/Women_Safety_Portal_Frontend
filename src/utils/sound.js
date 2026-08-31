/**
 * Web Audio API Emergency Siren & Phone Ringtone Synthesizers
 */

class SoundController {
  constructor() {
    this.audioCtx = null;
    this.sirenOsc1 = null;
    this.sirenOsc2 = null;
    this.sirenGain = null;
    this.sirenInterval = null;
    this.isSirenPlaying = false;

    this.ringtoneInterval = null;
    this.isRingtonePlaying = false;
  }

  initContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  /**
   * Start Loud High-Low Emergency Siren
   */
  startEmergencySiren() {
    if (this.isSirenPlaying) return;
    try {
      this.initContext();
      if (!this.audioCtx) return;

      this.isSirenPlaying = true;
      const ctx = this.audioCtx;

      this.sirenGain = ctx.createGain();
      this.sirenGain.gain.setValueAtTime(0.3, ctx.currentTime);
      this.sirenGain.connect(ctx.destination);

      this.sirenOsc1 = ctx.createOscillator();
      this.sirenOsc1.type = 'sawtooth';
      this.sirenOsc1.frequency.setValueAtTime(750, ctx.currentTime);
      this.sirenOsc1.connect(this.sirenGain);
      this.sirenOsc1.start();

      let toggle = false;
      this.sirenInterval = setInterval(() => {
        if (!this.isSirenPlaying || !this.sirenOsc1) return;
        toggle = !toggle;
        const targetFreq = toggle ? 1200 : 700;
        this.sirenOsc1.frequency.exponentialRampToValueAtTime(
          targetFreq,
          ctx.currentTime + 0.35
        );
      }, 400);
    } catch (e) {
      console.warn("Audio Context error:", e);
    }
  }

  /**
   * Stop Emergency Siren
   */
  stopEmergencySiren() {
    this.isSirenPlaying = false;
    if (this.sirenInterval) {
      clearInterval(this.sirenInterval);
      this.sirenInterval = null;
    }
    if (this.sirenOsc1) {
      try {
        this.sirenOsc1.stop();
        this.sirenOsc1.disconnect();
      } catch (e) {}
      this.sirenOsc1 = null;
    }
    if (this.sirenGain) {
      try {
        this.sirenGain.disconnect();
      } catch (e) {}
      this.sirenGain = null;
    }
  }

  /**
   * Start Realistic Phone Ringtone Synthesizer
   */
  startPhoneRingtone() {
    if (this.isRingtonePlaying) return;
    try {
      this.initContext();
      if (!this.audioCtx) return;

      this.isRingtonePlaying = true;
      const ctx = this.audioCtx;

      const playRingBurst = () => {
        if (!this.isRingtonePlaying) return;
        const now = ctx.currentTime;
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sine';
        osc2.type = 'sine';
        osc1.frequency.setValueAtTime(440, now);
        osc2.frequency.setValueAtTime(480, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.2, now + 0.05);
        gain.gain.setValueAtTime(0.2, now + 1.6);
        gain.gain.linearRampToValueAtTime(0, now + 1.8);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 1.8);
        osc2.stop(now + 1.8);
      };

      playRingBurst();
      this.ringtoneInterval = setInterval(() => {
        if (this.isRingtonePlaying) {
          playRingBurst();
        }
      }, 3500);
    } catch (e) {
      console.warn("Ringtone error:", e);
    }
  }

  /**
   * Stop Phone Ringtone
   */
  stopPhoneRingtone() {
    this.isRingtonePlaying = false;
    if (this.ringtoneInterval) {
      clearInterval(this.ringtoneInterval);
      this.ringtoneInterval = null;
    }
  }

  /**
   * Play single short countdown beep
   */
  playBeep(freq = 600, duration = 0.15) {
    try {
      this.initContext();
      if (!this.audioCtx) return;
      const ctx = this.audioCtx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  }
}

export const soundManager = new SoundController();
