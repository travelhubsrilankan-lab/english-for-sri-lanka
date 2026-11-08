// Web Audio API procedural sound engine & SpeechSynthesis manager

class AudioEngine {
  private ctx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private ambientSourceNodes: AudioNode[] = [];
  private currentAmbientTheme: string | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Realistic paper page flip sound
  playPageFlip() {
    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;

      // Noise buffer for paper friction
      const bufferSize = ctx.sampleRate * 0.28; // 280ms
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      // Bandpass filter to sculpt paper rustle
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(900, now);
      filter.frequency.exponentialRampToValueAtTime(320, now + 0.25);
      filter.Q.setValueAtTime(3.0, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.25, now + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start(now);
      whiteNoise.stop(now + 0.28);

      // Low frequency whoosh thump
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.2);

      oscGain.gain.setValueAtTime(0.12, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } catch {
      // Audio context might fail on un-interacted policy, ignore gracefully
    }
  }

  // Soft musical bell chime for chapter completion
  playCompletionChime() {
    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;
      const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 arpeggio

      freqs.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + index * 0.08);

        gain.gain.setValueAtTime(0.001, now + index * 0.08);
        gain.gain.linearRampToValueAtTime(0.12, now + index * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.08 + 0.9);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + index * 0.08);
        osc.stop(now + index * 0.08 + 0.95);
      });
    } catch {
      // Audio fallback
    }
  }

  // Soft click for UI buttons
  playClick() {
    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.04);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // ignore
    }
  }

  // Gentle tone when tapping a word for Sinhala meaning
  playWordTap() {
    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now); // A5
      osc.frequency.exponentialRampToValueAtTime(1174.66, now + 0.08); // D6

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } catch {
      // ignore
    }
  }

  // Procedural ambient background soundscape
  startAmbient(theme: string) {
    if (this.currentAmbientTheme === theme && this.ambientGain) return;
    this.stopAmbient();

    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;
      this.ambientGain = ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.001, now);
      this.ambientGain.gain.linearRampToValueAtTime(0.05, now + 1.0);
      this.ambientGain.connect(ctx.destination);

      if (theme === 'nature') {
        // Wind + soft rustle
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

        const noise = ctx.createBufferSource();
        noise.buffer = noiseBuffer;
        noise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(450, now);
        filter.Q.setValueAtTime(1.5, now);

        noise.connect(filter);
        filter.connect(this.ambientGain);
        noise.start();
        this.ambientSourceNodes.push(noise);
      } else if (theme === 'mystic') {
        // Soft sine hum chord
        [220, 329.63, 440].forEach((freq) => {
          const osc = ctx.createOscillator();
          osc.type = 'sine';
          osc.frequency.value = freq;
          const oscGain = ctx.createGain();
          oscGain.gain.value = 0.02;
          osc.connect(oscGain);
          if (this.ambientGain) oscGain.connect(this.ambientGain);
          osc.start();
          this.ambientSourceNodes.push(osc);
        });
      } else if (theme === 'maritime') {
        // Ocean wave simulation using pink noise
        const bufferSize = ctx.sampleRate * 3;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          data[i] = (b0 + b1 + b2) * 0.3;
        }

        const wave = ctx.createBufferSource();
        wave.buffer = noiseBuffer;
        wave.loop = true;

        const lpf = ctx.createBiquadFilter();
        lpf.type = 'lowpass';
        lpf.frequency.setValueAtTime(300, now);

        // LFO to swell wave
        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.2, now); // swell every 5s
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(150, now);
        lfo.connect(lfoGain);
        lfoGain.connect(lpf.frequency);
        lfo.start();

        wave.connect(lpf);
        if (this.ambientGain) lpf.connect(this.ambientGain);
        wave.start();
        this.ambientSourceNodes.push(wave, lfo);
      }

      this.currentAmbientTheme = theme;
    } catch {
      // audio error ignore
    }
  }

  stopAmbient() {
    if (this.ambientGain && this.ctx) {
      try {
        const now = this.ctx.currentTime;
        this.ambientGain.gain.linearRampToValueAtTime(0.0001, now + 0.4);
      } catch {
        // ignore
      }
    }
    setTimeout(() => {
      this.ambientSourceNodes.forEach((node) => {
        try {
          if ('stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
            (node as AudioScheduledSourceNode).stop();
          }
          node.disconnect();
        } catch {
          // ignore
        }
      });
      this.ambientSourceNodes = [];
      this.ambientGain = null;
      this.currentAmbientTheme = null;
    }, 450);
  }
}

export const soundEffects = new AudioEngine();

// Speech Synthesis Manager for reading English stories aloud
export interface SpeechCallbacks {
  onSentenceStart?: (sentenceIndex: number) => void;
  onSentenceEnd?: (sentenceIndex: number) => void;
  onWord?: (cleanWord: string, charIndex: number) => void;
  onComplete?: () => void;
  onError?: (err: unknown) => void;
}

export class SpeechNarrator {
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeaking: boolean = false;
  private selectedVoice: SpeechSynthesisVoice | null = null;
  public rate: number = 0.88; // Slightly slower, clean cadence for English learners

  constructor() {
    this.pickVoice();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        this.pickVoice();
      };
    }
  }

  private pickVoice() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    // Prioritize natural English voices
    const enVoices = voices.filter((v) => v.lang.startsWith('en'));
    const preferred = enVoices.find((v) => 
      v.name.includes('Natural') || 
      v.name.includes('Google') || 
      v.name.includes('Samantha') || 
      v.name.includes('Daniel') ||
      v.name.includes('Serena') ||
      v.name.includes('Karen')
    );
    this.selectedVoice = preferred || enVoices[0] || voices[0] || null;
  }

  speakText(text: string, callbacks: { onWord?: (charIndex: number) => void; onEnd?: () => void }): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      callbacks.onEnd?.();
      return;
    }

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    if (this.selectedVoice) utterance.voice = this.selectedVoice;
    utterance.rate = this.rate;
    utterance.pitch = 1.05;
    utterance.lang = 'en-US';

    utterance.onboundary = (e) => {
      if (e.name === 'word') {
        callbacks.onWord?.(e.charIndex);
      }
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      callbacks.onEnd?.();
    };

    utterance.onerror = (e) => {
      // Cancelled speech emits error; ignore
      this.isSpeaking = false;
      this.currentUtterance = null;
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        callbacks.onEnd?.();
      }
    };

    this.currentUtterance = utterance;
    this.isSpeaking = true;
    window.speechSynthesis.speak(utterance);
  }

  speakWord(word: string) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(word);
    if (this.selectedVoice) utt.voice = this.selectedVoice;
    utt.rate = 0.82;
    utt.pitch = 1.0;
    utt.lang = 'en-US';
    window.speechSynthesis.speak(utt);
  }

  stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
    this.currentUtterance = null;
  }

  getSpeakingStatus() {
    return this.isSpeaking;
  }
}

export const speechNarrator = new SpeechNarrator();
