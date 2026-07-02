import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useTimerStore } from "../stores/timerStore";
import { useSettingsStore } from "../stores/settingsStore";

interface TomatoPetProps {
  onStartFocus: () => void;
  onOpenSettings: () => void;
  onOpenPersonalization: () => void;
}

export default function TomatoPet({ onStartFocus, onOpenSettings, onOpenPersonalization }: TomatoPetProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { phase, completedPomodoros } = useTimerStore();
  const { tomatoColor, tomatoSize } = useSettingsStore();
  const isWorking = phase === "focus";

  const handleTomatoClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleQuit = async () => {
    const win = getCurrentWindow();
    await win.close();
  };

  return (
    <motion.div
      className="drag-region relative flex flex-col items-center justify-center w-full h-full cursor-pointer gap-1"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Tomato SVG */}
      <motion.div
        onClick={handleTomatoClick}
        className={isWorking ? "animate-pulse-ring rounded-full" : "animate-breathe"}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          width={tomatoSize} height={tomatoSize * 1.1}
          viewBox="0 0 100 108"
          fill="none" xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          {/* Shadow */}
          <ellipse cx="50" cy="102" rx="32" ry="4" fill="#00000020" />
          {/* Body */}
          <motion.ellipse
            cx="50" cy="56" rx="42" ry="40"
            fill={isWorking ? "#EF4444" : tomatoColor}
            animate={isWorking ? { fill: "#EF4444" } : { fill: tomatoColor }}
          />
          {/* Lighter belly */}
          <ellipse cx="38" cy="62" rx="16" ry="14" fill="#FF888850" />
          {/* Highlight */}
          <ellipse cx="32" cy="42" rx="14" ry="9" fill="#FF909060" />
          {/* Stem */}
          <path d="M50 18 Q47 10 54 6" stroke="#4CAF50" strokeWidth="5" fill="none" strokeLinecap="round" />
          {/* Leaf left */}
          <ellipse cx="60" cy="14" rx="12" ry="5" fill="#66BB6A" transform="rotate(-25 60 14)" />
          {/* Leaf right */}
          <ellipse cx="44" cy="14" rx="10" ry="4" fill="#81C784" transform="rotate(15 44 14)" />
          {/* Eyes */}
          {isWorking ? (
            <>
              <ellipse cx="38" cy="52" rx="4" ry="3" fill="#333" />
              <ellipse cx="62" cy="52" rx="4" ry="3" fill="#333" />
              <line x1="32" y1="46" x2="42" y2="48" stroke="#333" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="68" y1="46" x2="58" y2="48" stroke="#333" strokeWidth="2.5" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="38" cy="52" r="4" fill="#333" />
              <circle cx="62" cy="52" r="4" fill="#333" />
              <circle cx="39.5" cy="50.5" r="1.5" fill="white" />
              <circle cx="63.5" cy="50.5" r="1.5" fill="white" />
            </>
          )}
          {/* Mouth */}
          {isWorking ? (
            <line x1="46" y1="66" x2="54" y2="66" stroke="#333" strokeWidth="2.5" strokeLinecap="round" />
          ) : (
            <path d="M42 62 Q50 71 58 62" stroke="#333" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          )}
          {/* Cheeks */}
          <circle cx="26" cy="58" r="5" fill="#FF6B6B40" />
          <circle cx="74" cy="58" r="5" fill="#FF6B6B40" />
        </svg>
      </motion.div>

      {/* Tomato count badge */}
      {completedPomodoros > 0 && (
        <motion.div
          className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          {completedPomodoros}
        </motion.div>
      )}

      {/* Menu buttons */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="flex flex-row gap-1.5 no-drag"
            initial={{ opacity: 0, y: -8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <button
              onClick={(e) => { e.stopPropagation(); onStartFocus(); setMenuOpen(false); }}
              className="px-4 py-1.5 text-xs font-medium text-white bg-red-400 rounded-full hover:bg-red-500 transition-colors shadow-md whitespace-nowrap"
            >
              开始专注
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onOpenSettings(); setMenuOpen(false); }}
              className="px-4 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-200 bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-sm whitespace-nowrap"
            >
              设置
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onOpenPersonalization(); setMenuOpen(false); }}
              className="px-4 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-200 bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-sm whitespace-nowrap"
            >
              个性化
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleQuit(); }}
              className="px-4 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-200 bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-full hover:bg-white dark:hover:bg-gray-700 hover:text-red-400 transition-colors shadow-sm whitespace-nowrap"
            >
              退出
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
