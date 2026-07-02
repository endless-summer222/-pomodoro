import { useState, useEffect, useCallback } from "react";
import { getCurrentWindow, PhysicalPosition, PhysicalSize } from "@tauri-apps/api/window";
import { AnimatePresence } from "framer-motion";
import TomatoPet from "./components/TomatoPet";
import TomatoTimer from "./components/TomatoTimer";

const PET_SIZE = { width: 380, height: 220 };
const TIMER_SIZE = { width: 400, height: 520 };

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
  const [isExpanded, setIsExpanded] = useState(false);
  const [initialized, setInitialized] = useState(false);

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
          } catch {
            // Position set failed, continue with default
          }
        }

        // Set initial pet size
        try {
          await win.setSize(new PhysicalSize(PET_SIZE.width, PET_SIZE.height));
        } catch {
          // Size set failed, continue
        }
      } catch (err) {
        console.error("Window init error:", err);
      }

      if (!cancelled) {
        setInitialized(true);
      }
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
      } catch (err) {
        console.error("onMoved error:", err);
      }
    }
    setup();

    return () => {
      if (unlisten) unlisten();
    };
  }, []);

  // Collapse on losing focus
  useEffect(() => {
    if (!isExpanded) return;

    const win = getCurrentWindow();
    let unlisten: (() => void) | undefined;

    async function setup() {
      try {
        unlisten = await win.onFocusChanged((event) => {
          if (!event.payload) {
            setIsExpanded(false);
          }
        });
      } catch (err) {
        console.error("onFocusChanged error:", err);
      }
    }
    setup();

    return () => {
      if (unlisten) unlisten();
    };
  }, [isExpanded]);

  // Resize window when expanding/collapsing
  const handleExpand = useCallback(async () => {
    try {
      const win = getCurrentWindow();
      await win.setSize(new PhysicalSize(TIMER_SIZE.width, TIMER_SIZE.height));
    } catch (err) {
      console.error("Expand resize error:", err);
    }
    setIsExpanded(true);
  }, []);

  const handleCollapse = useCallback(async () => {
    setIsExpanded(false);
    setTimeout(async () => {
      try {
        const win = getCurrentWindow();
        await win.setSize(new PhysicalSize(PET_SIZE.width, PET_SIZE.height));
      } catch (err) {
        console.error("Collapse resize error:", err);
      }
    }, 150);
  }, []);

  if (!initialized) {
    // Show a minimal loading indicator instead of nothing
    return (
      <div className="w-full h-full flex items-center justify-center bg-transparent rounded-2xl">
        <div className="text-2xl">🍅</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-transparent rounded-2xl">
      <AnimatePresence mode="wait">
        {isExpanded ? (
          <TomatoTimer key="timer" onCollapse={handleCollapse} />
        ) : (
          <TomatoPet key="pet" onClick={handleExpand} />
        )}
      </AnimatePresence>
    </div>
  );
}
