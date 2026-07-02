let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

/**
 * Play a simple "ding" sound using Web Audio API.
 * No external file needed — pure synthesis.
 */
export function playEndSound(): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Two-note chime: C6 → E6
    const frequencies = [1046.5, 1318.5];
    const startTimes = [now, now + 0.12];

    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.value = freq;

      gain.gain.setValueAtTime(0.3, startTimes[i]);
      gain.gain.exponentialRampToValueAtTime(0.001, startTimes[i] + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTimes[i]);
      osc.stop(startTimes[i] + 0.5);
    });
  } catch {
    // Silently fail
  }
}

/**
 * Play a short click/start sound.
 */
export function playStartSound(): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.2);
  } catch {
    // Silently fail
  }
}
