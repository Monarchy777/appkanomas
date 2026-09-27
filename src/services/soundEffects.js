// Syar'i & Authentic Islamic Audio Engine for Umrah & Hajj Worship
// Uses authentic recorded recitations (Sheikh Mishary Rashid Alafasy, Imam Haramein, & Authentic Talbiyah)

const AUTHENTIC_AUDIO_MAP = {
  // 1. Talbiyah & Ihram
  'DOA-01': '/assets/audio/talbiyah.mp3',
  'talbiyah': '/assets/audio/talbiyah.mp3',
  'DOA-02': '/assets/audio/doa-niat-umrah.mp3',
  'STEP-UMR-01': '/assets/audio/doa-niat-umrah.mp3',
  'DOA-03': '/assets/audio/doa-niat-haji.mp3',
  'STEP-HAJ-01': '/assets/audio/doa-niat-haji.mp3',

  // 2. Masjid & Thawaf
  'DOA-04': '/assets/audio/doa-masuk-masjid.mp3',
  'DOA-05': '/assets/audio/doa-melihat-kabah.mp3',
  'DOA-06': '/assets/audio/doa-sapujagad.mp3', // Mishary Alafasy Al-Baqarah 201
  'STEP-UMR-02': '/assets/audio/doa-sapujagad.mp3',

  // 3. Zamzam & Sa'i
  'DOA-07': '/assets/audio/doa-sai-safamarwah.mp3', // Mishary Alafasy Al-Baqarah 158
  'STEP-UMR-04': '/assets/audio/doa-sai-safamarwah.mp3',
  'DOA-08': '/assets/audio/doa-minum-zamzam.mp3',
  'STEP-UMR-03': '/assets/audio/doa-minum-zamzam.mp3',
  'STEP-UMR-05': '/assets/audio/doa-tahallul.mp3',
  'DOA-11': '/assets/audio/doa-tahallul.mp3',

  // 4. Manasik Haji (Armuzna)
  'DOA-09': '/assets/audio/doa-wukuf-arafah.mp3',
  'STEP-HAJ-02': '/assets/audio/doa-wukuf-arafah.mp3',
  'STEP-HAJ-03': '/assets/audio/doa-muzdalifah.mp3', // Sheikh Mishary Alafasy Al-Baqarah 198
  'DOA-10': '/assets/audio/doa-takbir-jamarat.mp3',
  'STEP-HAJ-04': '/assets/audio/doa-takbir-jamarat.mp3',
  'STEP-HAJ-05': '/assets/audio/tawaf-round-4.mp3',
  'STEP-HAJ-06': '/assets/audio/doa-takbir-jamarat.mp3',
  'STEP-HAJ-07': '/assets/audio/doa-thawaf-wada.mp3',
  'DOA-12': '/assets/audio/doa-thawaf-wada.mp3',

  // 5. Putaran Tawaf Ka'bah 1 s/d 7
  'counter-thawaf-1': '/assets/audio/tawaf-round-1.mp3',
  'counter-thawaf-2': '/assets/audio/tawaf-round-2.mp3',
  'counter-thawaf-3': '/assets/audio/tawaf-round-3.mp3',
  'counter-thawaf-4': '/assets/audio/tawaf-round-4.mp3',
  'counter-thawaf-5': '/assets/audio/tawaf-round-5.mp3',
  'counter-thawaf-6': '/assets/audio/tawaf-round-6.mp3',
  'counter-thawaf-7': '/assets/audio/tawaf-round-7.mp3',

  // 6. Putaran Sa'i Safa-Marwah 1 s/d 7
  'counter-sai-1': '/assets/audio/sai-round-1.mp3', // Sheikh Mishary Alafasy Al-Baqarah 158
  'counter-sai-2': '/assets/audio/sai-round-2.mp3',
  'counter-sai-3': '/assets/audio/sai-round-3.mp3',
  'counter-sai-4': '/assets/audio/sai-round-4.mp3',
  'counter-sai-5': '/assets/audio/sai-round-5.mp3',
  'counter-sai-6': '/assets/audio/sai-round-6.mp3',
  'counter-sai-7': '/assets/audio/sai-round-7.mp3' // Sheikh Mishary Alafasy Al-Baqarah 127
};

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.currentAudio = null;
    this.currentPlayingId = null;
    this.talbiyahTimer = null;
    this.isPlayingTalbiyah = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Soft haptic click for Tasbih and Tawaf Counter
  playClick() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);

      if (navigator.vibrate) {
        navigator.vibrate(25);
      }
    } catch (e) {
      console.warn('Audio playClick error:', e);
    }
  }

  // Soft bell chime when finishing a round or locking onto Qibla
  playRoundComplete() {
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = this.ctx.currentTime + (idx * 0.15);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.8);
      });

      if (navigator.vibrate) {
        navigator.vibrate([40, 60, 80]);
      }
    } catch (e) {
      console.warn('Audio playRoundComplete error:', e);
    }
  }

  playIntroTone() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
    } catch (e) {}
  }

  // Play Authentic Talbiyah ("Labbaika Allahumma Labbaik...") using real audio recording
  playTalbiyahMelody(onProgress, onEnd) {
    try {
      this.stopAll();
      this.isPlayingTalbiyah = true;
      this.currentPlayingId = 'talbiyah';

      const audio = new Audio('/assets/audio/talbiyah.mp3');
      this.currentAudio = audio;

      const words = [
        { time: 0, text: "لَبَّيْكَ اللّٰهُمَّ لَبَّيْكَ" },
        { time: 3.5, text: "لَبَّيْكَ لَا شَرِيْكَ لَكَ لَبَّيْكَ" },
        { time: 7.2, text: "إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ" },
        { time: 11.5, text: "لَا شَرِيْكَ لَكَ" },
        { time: 14.5, text: "لَبَّيْكَ اللّٰهُمَّ لَبَّيْكَ" }
      ];

      words.forEach(w => {
        setTimeout(() => {
          if (this.isPlayingTalbiyah && onProgress) {
            onProgress(w.text);
          }
        }, w.time * 1000);
      });

      audio.onended = () => {
        this.isPlayingTalbiyah = false;
        this.currentPlayingId = null;
        this.currentAudio = null;
        if (onEnd) onEnd();
      };

      audio.onerror = () => {
        this.isPlayingTalbiyah = false;
        this.currentPlayingId = null;
        this.currentAudio = null;
        if (onEnd) onEnd();
      };

      audio.play().catch(err => {
        console.warn('Talbiyah audio play failed:', err);
        this.isPlayingTalbiyah = false;
        this.currentPlayingId = null;
        if (onEnd) onEnd();
      });

    } catch (e) {
      console.warn('playTalbiyahMelody error:', e);
      this.isPlayingTalbiyah = false;
      this.currentPlayingId = null;
      if (onEnd) onEnd();
    }
  }

  // Recite any Arabic prayer aloud using authentic MP3 audio files used in Islamic apps
  recitePrayer(prayerId, arabicText, onStart, onEnd) {
    try {
      this.stopAll();
      this.currentPlayingId = prayerId;

      // 1. Check if an authentic pre-recorded audio file exists in our bundle
      let audioSrc = AUTHENTIC_AUDIO_MAP[prayerId];

      // 2. If not found in map, generate clean native Arabic audio stream
      if (!audioSrc && arabicText) {
        const cleanText = arabicText.replace(/[^\u0600-\u06FF\s]/g, '').trim();
        audioSrc = `https://translate.google.com/translate_tts?ie=UTF-8&tl=ar&client=tw-ob&q=${encodeURIComponent(cleanText)}`;
      }

      if (audioSrc) {
        const audio = new Audio(audioSrc);
        this.currentAudio = audio;

        audio.onplay = () => {
          if (onStart) onStart();
        };

        audio.onended = () => {
          this.currentPlayingId = null;
          this.currentAudio = null;
          if (onEnd) onEnd();
        };

        audio.onerror = (e) => {
          console.warn('HTML5 Audio error, attempting SpeechSynthesis fallback:', e);
          this.fallbackSpeechSynthesis(arabicText, onStart, onEnd);
        };

        audio.play().catch(err => {
          console.warn('Audio play() failed (autoplay policy or network):', err);
          this.fallbackSpeechSynthesis(arabicText, onStart, onEnd);
        });
      } else {
        this.fallbackSpeechSynthesis(arabicText, onStart, onEnd);
      }
    } catch (e) {
      console.warn('recitePrayer error:', e);
      if (onEnd) onEnd();
    }
  }

  // Fallback speech synthesis if browser blocks network audio
  fallbackSpeechSynthesis(arabicText, onStart, onEnd) {
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(arabicText);
        utterance.lang = 'ar-SA';
        utterance.rate = 0.85;

        utterance.onstart = () => {
          if (onStart) onStart();
        };
        utterance.onend = () => {
          this.currentPlayingId = null;
          if (onEnd) onEnd();
        };
        utterance.onerror = () => {
          this.currentPlayingId = null;
          if (onEnd) onEnd();
        };

        this.playIntroTone();
        window.speechSynthesis.speak(utterance);
      } else {
        if (onEnd) onEnd();
      }
    } catch (err) {
      if (onEnd) onEnd();
    }
  }

  stopAll() {
    this.isPlayingTalbiyah = false;
    this.currentPlayingId = null;

    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch (e) {}
      this.currentAudio = null;
    }

    if (this.talbiyahTimer) {
      clearTimeout(this.talbiyahTimer);
      this.talbiyahTimer = null;
    }

    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
  }

  stopTalbiyah() {
    this.stopAll();
  }

  isPrayerPlaying(prayerId) {
    return this.currentPlayingId === prayerId;
  }
}

export const sounds = new SoundEngine();
