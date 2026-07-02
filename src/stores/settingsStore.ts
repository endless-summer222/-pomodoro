import { create } from "zustand";

export interface SettingsState {
  // Timer
  focusDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number;
  autoStartBreak: boolean;
  autoStartFocus: boolean;

  // Notifications
  notificationsEnabled: boolean;
  soundEnabled: boolean;
  soundVolume: number;

  // Behavior
  collapseOnBlur: boolean;
  alwaysOnTop: boolean;
  autoStartWithSystem: boolean;

  // Personalization
  tomatoSize: number; // 60-120
  tomatoColor: string;
  theme: "light" | "dark" | "system";
  tomatoOpacity: number; // 0.3-1.0

  // Actions
  updateSettings: (partial: Partial<SettingsState>) => void;
  resetSettings: () => void;
}

const DEFAULTS: SettingsState = {
  focusDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 20,
  longBreakInterval: 4,
  autoStartBreak: false,
  autoStartFocus: false,

  notificationsEnabled: true,
  soundEnabled: true,
  soundVolume: 50,

  collapseOnBlur: true,
  alwaysOnTop: true,
  autoStartWithSystem: false,

  tomatoSize: 80,
  tomatoColor: "#FF6B6B",
  theme: "light",
  tomatoOpacity: 0.85,

  updateSettings: () => {},
  resetSettings: () => {},
};

function loadSettings(): Partial<SettingsState> {
  try {
    const raw = localStorage.getItem("pomopet-settings");
    if (raw) return JSON.parse(raw);
  } catch {}
  return {};
}

function saveSettings(state: SettingsState): void {
  try {
    const { updateSettings, resetSettings, ...data } = state;
    localStorage.setItem("pomopet-settings", JSON.stringify(data));
  } catch {}
}

const saved = loadSettings();

export const useSettingsStore = create<SettingsState>((set, get) => ({
  ...DEFAULTS,
  ...saved,

  updateSettings: (partial) => {
    set(partial);
    saveSettings(get());
  },

  resetSettings: () => {
    set({ ...DEFAULTS, updateSettings: get().updateSettings, resetSettings: get().resetSettings });
    saveSettings(get());
  },
}));
