import { useState, useEffect, useCallback } from "react";
import { getCurrentWindow, PhysicalPosition, PhysicalSize } from "@tauri-apps/api/window";
import { AnimatePresence } from "framer-motion";
import TomatoPet from "./components/TomatoPet";
import TomatoTimer from "./components/TomatoTimer";
import SettingsPanel from "./components/SettingsPanel";
import { useSettingsStore } from "./stores/settingsStore";
import { useTimer } from "./hooks/useTimer";

function applyTheme(theme: "light" | "dark" | "system") {
  const root = document.documentElement;
  const isDark =
    theme === "dark" ||
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  if (isDark) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

const PANEL_SIZE = { width: 400, height: 520 };

function getPetSize(tomatoSize: number) {
  const svgHeight = tomatoSize * 1.1;
  const w = Math.max(tomatoSize + 300, 370);
  const h = svgHeight + 120;
  return { width: w, height: h };
}

type ViewState = "pet" | "timer" | "settings" | "personalization";

function loadPosition(): { x: number; y: number } | null {
  try {
    const raw = localStorage.getItem("pomopet-position");
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function savePosition(x: number, y: number): void {
  try {
    localStorage.setItem("pomopet-position", JSON.stringify({ x, y }));
  } catch {}
}

export default function App() {
  const [view, setView] = useState<ViewState>("pet");
  const [initialized, setInitialized] = useState(false);
  const tomatoSize = useSettingsStore((s) => s.tomatoSize);
  const timerActions = useTimer(); // Keep timer alive regardless of view

  // Initialize window on startup
  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const win = getCurrentWindow();
        const saved = loadPosition();
        if (saved) {
          try {
            await win.setPosition(new PhysicalPosition(saved.x, saved.y));
          } catch {}
        }
        const petSize = getPetSize(tomatoSize);
        try {
          await win.setSize(new PhysicalSize(petSize.width, petSize.height));
        } catch {}
      } catch (err) {
        console.error("Window init error:", err);
      }
      if (!cancelled) setInitialized(true);
    }

    init();
    return () => { cancelled = true; };
  }, []);

  // Save position when window moves
  useEffect(() => {
    const win = getCurrentWindow();
    let unlisten: (() => void) | undefined;
    async function setup() {
      try {
        unlisten = await win.onMoved((event) => {
          savePosition(event.payload.x, event.payload.y);
        });
      } catch {}
    }
    setup();
    return () => { if (unlisten) unlisten(); };
  }, []);

  // Collapse on losing focus (only when in timer view and collapseOnBlur enabled)
  const collapseOnBlur = useSettingsStore((s) => s.collapseOnBlur);
  useEffect(() => {
    if (view !== "timer" || !collapseOnBlur) return;
    const win = getCurrentWindow();
    let unlisten: (() => void) | undefined;
    async function setup() {
      try {
        unlisten = await win.onFocusChanged(async (event) => {
          if (!event.payload) {
            const petSize = getPetSize(tomatoSize);
            await win.setSize(new PhysicalSize(petSize.width, petSize.height));
            setView("pet");
          }
        });
      } catch {}
    }
    setup();
    return () => { if (unlisten) unlisten(); };
  }, [view, tomatoSize, collapseOnBlur]);

  // Keep window always on top
  const alwaysOnTop = useSettingsStore((s) => s.alwaysOnTop);
  useEffect(() => {
    const win = getCurrentWindow();
    try {
      win.setAlwaysOnTop(alwaysOnTop);
    } catch {}
  }, [alwaysOnTop]);

  // Switch views — resize window first, then change view
  const switchToPanel = useCallback(async (v: ViewState) => {
    try {
      const win = getCurrentWindow();
      await win.setSize(new PhysicalSize(PANEL_SIZE.width, PANEL_SIZE.height));
    } catch {}
    setView(v);
  }, []);

  const switchToTimer = useCallback(async () => {
    try {
      const win = getCurrentWindow();
      await win.setSize(new PhysicalSize(PANEL_SIZE.width, PANEL_SIZE.height));
    } catch {}
    setView("timer");
  }, []);

  const switchToPet = useCallback(async () => {
    try {
      const win = getCurrentWindow();
      const petSize = getPetSize(tomatoSize);
      await win.setSize(new PhysicalSize(petSize.width, petSize.height));
    } catch {}
    setView("pet");
  }, [tomatoSize]);

  // Apply theme
  const theme = useSettingsStore((s) => s.theme);
  useEffect(() => {
    applyTheme(theme);
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme(theme);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  const handleClosePanel = useCallback(() => switchToPet(), [switchToPet]);

  if (!initialized) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-transparent rounded-2xl">
        <div className="text-2xl">🍅</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-transparent rounded-2xl">
      <AnimatePresence mode="wait">
        {view === "settings" || view === "personalization" ? (
          <SettingsPanel
            key="settings"
            onClose={handleClosePanel}
            initialTab={view === "settings" ? "settings" : "personalization"}
          />
        ) : view === "timer" ? (
          <TomatoTimer key="timer" onCollapse={switchToPet} timerActions={timerActions} />
        ) : (
          <TomatoPet
            key="pet"
            onStartFocus={switchToTimer}
            onOpenSettings={() => switchToPanel("settings")}
            onOpenPersonalization={() => switchToPanel("personalization")}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
