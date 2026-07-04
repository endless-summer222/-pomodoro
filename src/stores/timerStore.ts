import { create } from "zustand";

export type TimerPhase = "idle" | "focus" | "short_break" | "long_break";

export interface TimerState {
  phase: TimerPhase;
  timeRemaining: number; // seconds
  totalDuration: number; // seconds - current phase total
  isRunning: boolean;
  completedPomodoros: number;
  currentTaskId: number | null;

  // Settings
  focusDuration: number; // minutes
  shortBreakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number; // after N pomodoros

  // Actions
  setPhase: (phase: TimerPhase, keepRunning?: boolean) => void;
  setTimeRemaining: (seconds: number) => void;
  setTotalDuration: (seconds: number) => void;
  setIsRunning: (running: boolean) => void;
  tick: () => void;
  completePomodoro: () => void;
  reset: () => void;
  skipPhase: () => void;
  setTask: (taskId: number | null) => void;

  // Settings actions
  updateSettings: (settings: Partial<Pick<TimerState, "focusDuration" | "shortBreakDuration" | "longBreakDuration" | "longBreakInterval">>) => void;
}

const DEFAULT_FOCUS = 25; // minutes
const DEFAULT_SHORT_BREAK = 5;
const DEFAULT_LONG_BREAK = 20;
const DEFAULT_LONG_INTERVAL = 4;

function getPhaseDuration(phase: TimerPhase, state: TimerState): number {
  switch (phase) {
    case "focus":
      return state.focusDuration * 60;
    case "short_break":
      return state.shortBreakDuration * 60;
    case "long_break":
      return state.longBreakDuration * 60;
    case "idle":
      return 0;
  }
}

export const useTimerStore = create<TimerState>((set, get) => ({
  phase: "idle",
  timeRemaining: DEFAULT_FOCUS * 60,
  totalDuration: DEFAULT_FOCUS * 60,
  isRunning: false,
  completedPomodoros: 0,
  currentTaskId: null,

  focusDuration: DEFAULT_FOCUS,
  shortBreakDuration: DEFAULT_SHORT_BREAK,
  longBreakDuration: DEFAULT_LONG_BREAK,
  longBreakInterval: DEFAULT_LONG_INTERVAL,

  setPhase: (phase, keepRunning = false) => {
    const state = get();
    const duration = getPhaseDuration(phase, state);
    set({
      phase,
      timeRemaining: duration,
      totalDuration: duration,
      ...(keepRunning ? {} : { isRunning: false }),
    });
  },

  setTimeRemaining: (seconds) => set({ timeRemaining: seconds }),
  setTotalDuration: (seconds) => set({ totalDuration: seconds }),
  setIsRunning: (running) => set({ isRunning: running }),

  tick: () => {
    const { timeRemaining, isRunning } = get();
    if (!isRunning) return;
    if (timeRemaining <= 0) return;
    set({ timeRemaining: timeRemaining - 1 });
  },

  completePomodoro: () => {
    const state = get();
    if (state.phase !== "focus") return;

    const newCount = state.completedPomodoros + 1;
    const isLongBreak = newCount % state.longBreakInterval === 0;
    const nextPhase = isLongBreak ? "long_break" : "short_break";
    const duration = getPhaseDuration(nextPhase, state);

    // Single atomic set — avoid intermediate state where phase changed
    // but isRunning is still true and timeRemaining is still 0,
    // which would trigger the completion effect's else-branch prematurely.
    set({
      completedPomodoros: newCount,
      phase: nextPhase,
      timeRemaining: duration,
      totalDuration: duration,
      isRunning: false,
    });
  },

  reset: () => {
    const { focusDuration } = get();
    set({
      phase: "idle",
      timeRemaining: focusDuration * 60,
      totalDuration: focusDuration * 60,
      isRunning: false,
      currentTaskId: null,
    });
  },

  skipPhase: () => {
    const { phase, focusDuration } = get();
    if (phase === "focus") {
      set({
        phase: "idle",
        timeRemaining: focusDuration * 60,
        totalDuration: focusDuration * 60,
        isRunning: false,
        currentTaskId: null,
      });
    } else {
      // Skip break
      set({
        phase: "idle",
        timeRemaining: focusDuration * 60,
        totalDuration: focusDuration * 60,
        isRunning: false,
      });
    }
  },

  setTask: (taskId) => set({ currentTaskId: taskId }),

  updateSettings: (settings) => set(settings),
}));
